'use server';

import prisma from '@/lib/prisma';

export async function getRoomSceneAction(): Promise<string | null> {
  const scene = await prisma.roomScene.findUnique({ where: { id: 'global' } });
  return scene?.imageUrl ?? null;
}
