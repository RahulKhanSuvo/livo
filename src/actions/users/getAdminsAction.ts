'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { Role } from '@/generated/prisma/enums';

export interface AdminRow {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin';
  permission: string;
  lastActive: string;
  status: 'Active' | 'Invited' | 'Suspended';
  isSuperAdmin: boolean;
}

function formatLastActive(date: Date | null): string {
  if (!date) return 'Never';
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const getAdminsAction = createSafeAction(null, async () => {
  const users = await prisma.user.findMany({
    where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN] } },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      sessions: {
        orderBy: { updatedAt: 'desc' },
        take: 1,
        select: { updatedAt: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const admins: AdminRow[] = users.map((u) => {
    const isSuperAdmin = u.role === Role.SUPER_ADMIN;
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      role: isSuperAdmin ? 'Super Admin' : 'Admin',
      permission: isSuperAdmin ? 'Full access' : 'Admin access',
      lastActive: formatLastActive(u.sessions[0]?.updatedAt ?? null),
      status: u.emailVerified ? 'Active' : 'Invited',
      isSuperAdmin,
    };
  });

  return { admins };
});
