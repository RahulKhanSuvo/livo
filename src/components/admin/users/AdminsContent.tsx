'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  PlusSignIcon,
  UserShield01Icon,
  UserMinusIcon,
  UserAdd01Icon,
  AlertCircleIcon,
  Loading02Icon,
} from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { Avatar, StatusBadge } from '@/components/admin/ui/badges';
import { initials } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getAdminsAction, type AdminRow } from '@/actions/users/getAdminsAction';
import { updateUserRoleAction } from '@/actions/users/updateUserRoleAction';
import { promoteToAdminAction } from '@/actions/users/promoteToAdminAction';

export default function AdminsContent() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isPromoting, setIsPromoting] = useState(false);

  const { data: result, isFetching } = useQuery({
    queryKey: ['admins'],
    queryFn: () => getAdminsAction(),
  });

  const admins = result?.data?.admins ?? [];

  const refresh = () => queryClient.invalidateQueries({ queryKey: ['admins'] });

  const handleRoleChange = async (userId: string, role: 'USER' | 'ADMIN' | 'SUPER_ADMIN') => {
    const res = await updateUserRoleAction({ userId, role });
    if (!res.success) {
      alert(res.message ?? 'Something went wrong.');
      return;
    }
    if (!res.data?.ok) {
      alert(res.data?.message ?? 'Something went wrong.');
      return;
    }
    refresh();
  };

  const handlePromote = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    const value = email.trim();
    if (!value) {
      setEmailError('Enter a user email.');
      return;
    }
    setIsPromoting(true);
    try {
      const res = await promoteToAdminAction({ email: value });
      if (res.success && res.data?.ok) {
        setDialogOpen(false);
        setEmail('');
        refresh();
      } else {
        setEmailError(res.data?.message ?? res.message ?? 'Could not add admin.');
      }
    } finally {
      setIsPromoting(false);
    }
  };

  const columns: Column<AdminRow>[] = [
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
    {
      key: 'role',
      header: 'Role',
      cell: (r) => <span className="text-foreground/80">{r.role}</span>,
    },
    {
      key: 'permission',
      header: 'Permissions',
      cell: (r) => <span className="text-foreground/80">{r.permission}</span>,
    },
    {
      key: 'lastActive',
      header: 'Last active',
      cell: (r) => <span className="text-foreground/80">{r.lastActive}</span>,
    },
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
              {r.isSuperAdmin ? (
                <DropdownMenuItem disabled className="cursor-default">
                  Super admin (protected)
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => handleRoleChange(r.id, 'SUPER_ADMIN')}
                  >
                    <HugeiconsIcon icon={UserShield01Icon} size={15} className="mr-2" />
                    Make super admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onSelect={() => handleRoleChange(r.id, 'USER')}
                  >
                    <HugeiconsIcon icon={UserMinusIcon} size={15} className="mr-2" />
                    Remove admin
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admins"
        description="Team members with elevated access. Super admins can assign or revoke admin roles."
        actions={
          <Button className="gap-1.5" onClick={() => setDialogOpen(true)}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add admin
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={admins}
        keyField={(r) => r.id}
        emptyMessage={isFetching ? 'Loading…' : 'No admins found.'}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={UserAdd01Icon} size={18} className="text-primary" />
              Add admin
            </DialogTitle>
            <DialogDescription>
              Enter the email of an existing user to promote them to admin.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handlePromote} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">User email</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                className="h-10"
                disabled={isPromoting}
              />
              {emailError && (
                <p className="flex items-center gap-1.5 text-xs text-destructive">
                  <HugeiconsIcon icon={AlertCircleIcon} size={14} />
                  {emailError}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:justify-end">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="h-10">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="h-10 gap-1.5" disabled={isPromoting}>
                {isPromoting && (
                  <HugeiconsIcon icon={Loading02Icon} size={15} className="animate-spin" />
                )}
                Add admin
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
