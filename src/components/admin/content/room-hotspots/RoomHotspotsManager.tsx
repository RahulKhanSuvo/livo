'use client';

import * as React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import { Upload01Icon, Cursor01Icon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';

import {
  getRoomSceneAction,
  getAdminRoomHotspotsAction,
  upsertRoomHotspotAction,
  deleteRoomHotspotAction,
  uploadRoomSceneImageAction,
} from '@/actions/content/room-hotspots';
import type {
  AdminRoomHotspot,
  CardPosition,
} from '@/actions/content/room-hotspots/room-hotspots.type';
import type { UpsertRoomHotspotInput } from '@/actions/content/room-hotspots/room-hotspots.validation';

import roomImage from '@/assets/background/Shoptheroom.webp';
import { HotspotDot } from './HotspotDot';
import { HotspotTooltip } from './HotspotTooltip';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const HOTSPOTS_KEY = ['admin-room-hotspots'] as const;

export function RoomHotspotsManager() {
  const queryClient = useQueryClient();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const dragPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [creating, setCreating] = React.useState<{ id: string; x: number; y: number } | null>(null);
  const creatingIdRef = React.useRef<string | null>(null);
  const pendingPatchRef = React.useRef<{
    productId: string | null;
    cardPosition: CardPosition | null;
    isActive: boolean;
  } | null>(null);
  const movedRef = React.useRef(false);
  const dragStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const sceneQuery = useQuery({
    queryKey: ['room-scene'],
    queryFn: getRoomSceneAction,
  });
  const hotspotsQuery = useQuery({
    queryKey: HOTSPOTS_KEY,
    queryFn: getAdminRoomHotspotsAction,
  });

  const hotspots = hotspotsQuery.data ?? [];

  const upsertMutation = useMutation({
    mutationFn: (input: UpsertRoomHotspotInput) => upsertRoomHotspotAction(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOTSPOTS_KEY });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRoomHotspotAction({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HOTSPOTS_KEY });
    },
  });
  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const fd = new FormData();
      fd.append('file', file);
      return uploadRoomSceneImageAction(fd);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['room-scene'], data.url);
    },
  });

  const patchCache = (id: string, patch: Partial<AdminRoomHotspot>) =>
    queryClient.setQueryData<AdminRoomHotspot[]>(HOTSPOTS_KEY, (old) =>
      (old ?? []).map((h) => (h.id === id ? { ...h, ...patch } : h))
    );

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    if (creatingIdRef.current === id) return; // don't drag a not-yet-created dot
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDraggingId(id);
    movedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e: React.PointerEvent, id: string) => {
    if (draggingId !== id) return;
    const start = dragStartRef.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 4) {
      movedRef.current = true;
    }
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clamp(((e.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((e.clientY - rect.top) / rect.height) * 100, 0, 100);
    dragPosRef.current = { x, y };
    patchCache(id, { x, y });
  };

  const onPointerUp = (e: React.PointerEvent, id: string) => {
    if (draggingId !== id) return;
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture?.(e.pointerId)) target.releasePointerCapture(e.pointerId);
    setDraggingId(null);
    const current = hotspots.find((h) => h.id === id);
    if (!current) return;
    if (movedRef.current) {
      // It was a drag: persist the new position and keep the tooltip open.
      upsertMutation.mutate({
        id,
        x: dragPosRef.current?.x ?? current.x,
        y: dragPosRef.current?.y ?? current.y,
        cardPosition: current.cardPosition,
        productId: current.productId,
        isActive: current.isActive,
      });
      setSelectedId(id);
    }
    dragPosRef.current = null;
  };

  // First click opens, second click closes (a drag is handled separately).
  const toggleHotspot = (id: string) => {
    if (creatingIdRef.current === id) return;
    if (movedRef.current) return; // a drag, not a click
    setSelectedId((cur) => (cur === id ? null : id));
  };

  const removeHotspot = (id: string) => {
    deleteMutation.mutate(id);
    if (selectedId === id) setSelectedId(null);
  };

  const saveHotspot = (
    id: string,
    patch: { productId: string | null; cardPosition: CardPosition | null; isActive: boolean }
  ) => {
    // While the create is still in flight, defer the save until we have the real id.
    if (creatingIdRef.current === id) {
      pendingPatchRef.current = patch;
      return;
    }
    const current = hotspots.find((h) => h.id === id);
    if (!current) return;
    upsertMutation.mutate(
      {
        id,
        x: current.x,
        y: current.y,
        cardPosition: patch.cardPosition,
        productId: patch.productId,
        isActive: patch.isActive,
      },
      { onSuccess: () => setSelectedId(null) }
    );
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
    e.target.value = '';
  };

  const createHotspotAt = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((clientY - rect.top) / rect.height) * 100, 0, 100);
    const tempId = crypto.randomUUID();

    // Optimistic: show the dot + open the tooltip instantly.
    queryClient.setQueryData<AdminRoomHotspot[]>(HOTSPOTS_KEY, (old) => [
      ...(old ?? []),
      { id: tempId, x, y, cardPosition: 'top', productId: null, isActive: true, product: null },
    ]);
    setCreating({ id: tempId, x, y });
    creatingIdRef.current = tempId;
    setSelectedId(tempId);

    upsertMutation.mutate(
      { x, y, cardPosition: 'top', productId: null, isActive: true },
      {
        onSuccess: (res) => {
          const newId = res.data?.id;
          if (newId) {
            queryClient.setQueryData<AdminRoomHotspot[]>(HOTSPOTS_KEY, (old) =>
              (old ?? []).map((h) => (h.id === tempId ? { ...h, id: newId } : h))
            );
            if (selectedId === tempId) setSelectedId(newId);
            if (pendingPatchRef.current) {
              const patch = pendingPatchRef.current;
              pendingPatchRef.current = null;
              upsertMutation.mutate({
                id: newId,
                x,
                y,
                cardPosition: patch.cardPosition,
                productId: patch.productId,
                isActive: patch.isActive,
              });
            }
          }
          setCreating(null);
          creatingIdRef.current = null;
          queryClient.invalidateQueries({ queryKey: HOTSPOTS_KEY });
        },
        onError: () => {
          // Roll back the optimistic dot if creation failed.
          queryClient.setQueryData<AdminRoomHotspot[]>(HOTSPOTS_KEY, (old) =>
            (old ?? []).filter((h) => h.id !== tempId)
          );
          if (selectedId === tempId) setSelectedId(null);
          setCreating(null);
          creatingIdRef.current = null;
        },
      }
    );
  };

  const onCanvasClick = (e: React.MouseEvent) => {
    // Ignore clicks that land on an existing hotspot dot (or its inner span)
    // so we never accidentally spawn a duplicate spot when selecting one.
    const target = e.target as HTMLElement;
    if (target.closest('button[aria-label^="Hotspot"]')) return;
    createHotspotAt(e.clientX, e.clientY);
  };

  const selected =
    hotspots.find((h) => h.id === selectedId) ??
    (creating && creating.id === selectedId
      ? {
          id: creating.id,
          x: creating.x,
          y: creating.y,
          cardPosition: 'top' as CardPosition,
          productId: null,
          isActive: true,
          product: null,
        }
      : null);
  const previewSrc = sceneQuery.data ?? roomImage.src;
  const hasImage = Boolean(sceneQuery.data);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shop the Room"
        description="Upload the room scene and drop unlimited product hotspots. Click the image to add a point, then assign a product from the tooltip."
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          onClick={onCanvasClick}
          className="relative h-[80vh] w-full touch-none select-none overflow-hidden bg-neutral-100"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt="Shop the Room scene"
            draggable={false}
            className="pointer-events-none block h-full w-full select-none object-cover"
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileRef.current?.click();
            }}
            disabled={uploadMutation.isPending}
            className="absolute right-3 top-3 z-30 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-ink shadow-sm backdrop-blur hover:bg-white disabled:opacity-60"
          >
            <HugeiconsIcon icon={Upload01Icon} size={14} />
            {hasImage ? 'Update image' : 'Upload image'}
          </button>

          {!hasImage && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <p className="rounded-sm bg-white/80 px-4 py-2 text-sm text-muted-foreground">
                Upload a background image to start adding hotspots.
              </p>
            </div>
          )}

          {hotspots.map((h) => (
            <HotspotDot
              key={h.id}
              hotspot={h}
              isSelected={h.id === selectedId}
              isDragging={draggingId === h.id}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onToggle={toggleHotspot}
            />
          ))}

          {selected && draggingId === null && (
            <HotspotTooltip
              key={selected.id}
              hotspot={selected}
              creating={Boolean(creating)}
              saving={upsertMutation.isPending}
              onClose={() => setSelectedId(null)}
              onDelete={removeHotspot}
              onSave={saveHotspot}
              deleting={deleteMutation.isPending}
            />
          )}
        </div>
        <p className="flex items-center gap-1.5 border-t border-black/5 px-4 py-3 text-xs text-muted-foreground">
          <HugeiconsIcon icon={Cursor01Icon} size={14} />
          Click anywhere on the image to drop a hotspot, then search and pick a product. Drag a dot
          to reposition it.
        </p>
      </div>
    </div>
  );
}

export default RoomHotspotsManager;
