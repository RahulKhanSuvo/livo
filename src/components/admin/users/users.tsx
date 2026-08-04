import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { Avatar, StatusBadge } from '@/components/admin/ui/badges';
import { initials } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminUsers, staffUsers, type UserRow } from './users.data';

function columnsFor(roleLabel: string): Column<UserRow>[] {
  return [
    {
      key: 'user',
      header: 'User',
      cell: (r) => (
        <div className="flex items-center gap-3">
          <Avatar initials={initials(r.name)} tone="#4b6b56" />
          <div>
            <p className="font-medium">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', cell: (r) => <span className="text-foreground/80">{r.role}</span> },
    { key: 'permission', header: 'Permissions', cell: (r) => <span className="text-foreground/80">{r.permission}</span> },
    { key: 'lastActive', header: 'Last active', cell: (r) => <span className="text-foreground/80">{r.lastActive}</span> },
    { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions',
      header: '',
      headerClassName: 'text-right',
      className: 'text-right',
      cell: (r) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.name}`}>
                <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">Edit access</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Audit log</DropdownMenuItem>
              <DropdownMenuItem variant="destructive" className="cursor-pointer">
                {roleLabel === 'Admin' ? 'Remove admin' : 'Deactivate'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}

export function AdminsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Admins"
        description="Team members with elevated access to manage the store."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Invite admin
          </Button>
        }
      />
      <DataTable columns={columnsFor('Admin')} data={adminUsers} keyField={(r) => r.id} />
    </div>
  );
}

export function StaffPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff"
        description="Support, marketing and warehouse colleagues with scoped access."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Invite staff
          </Button>
        }
      />
      <DataTable columns={columnsFor('Staff')} data={staffUsers} keyField={(r) => r.id} />
    </div>
  );
}