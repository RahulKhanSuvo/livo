'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import type { AdminRoomHotspot } from '@/actions/content/room-hotspots/room-hotspots.type';

export function HotspotDot({
  hotspot,
  isSelected,
  isDragging,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onToggle,
}: {
  hotspot: AdminRoomHotspot;
  isSelected: boolean;
  isDragging: boolean;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  onPointerMove: (e: React.PointerEvent, id: string) => void;
  onPointerUp: (e: React.PointerEvent, id: string) => void;
  onToggle: (id: string) => void;
}) {
  return (
    <button
      key={hotspot.id}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle(hotspot.id);
      }}
      onPointerDown={(e) => onPointerDown(e, hotspot.id)}
      onPointerMove={(e) => onPointerMove(e, hotspot.id)}
      onPointerUp={(e) => onPointerUp(e, hotspot.id)}
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
      className={cn(
        'absolute z-20 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md transition-transform',
        isSelected ? 'scale-110 bg-black text-white' : 'bg-white/80 text-black hover:scale-110',
        !hotspot.isActive && 'opacity-50',
        isDragging && 'cursor-grabbing'
      )}
      aria-label={`Hotspot ${hotspot.id}`}
    >
      <span className="absolute -inset-1 animate-ping rounded-full border border-white/60 opacity-30" />
      <span className="size-2.5 rounded-full border-2 border-current bg-transparent" />
    </button>
  );
}
