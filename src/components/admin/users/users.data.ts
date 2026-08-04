export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  permission: string;
  lastActive: string;
  status: 'Active' | 'Invited' | 'Suspended';
}

export const adminUsers: UserRow[] = [
  { id: 'US-01', name: 'Rahul Sharma', email: 'rahul@livo.com', role: 'Super Admin', permission: 'Full access', lastActive: 'Now', status: 'Active' },
  { id: 'US-02', name: 'Maya Chen', email: 'maya@livo.com', role: 'Admin', permission: 'Catalog + Orders', lastActive: '2h ago', status: 'Active' },
  { id: 'US-03', name: 'Lukas Müller', email: 'lukas@livo.com', role: 'Admin', permission: 'Analytics + Reports', lastActive: '1d ago', status: 'Active' },
  { id: 'US-04', name: 'Fatima Zahra', email: 'fatima@livo.com', role: 'Admin', permission: 'Full access', lastActive: '3d ago', status: 'Invited' },
];

export const staffUsers: UserRow[] = [
  { id: 'US-11', name: 'Noah W.', email: 'noah@livo.com', role: 'Support', permission: 'Orders + Customers', lastActive: '5h ago', status: 'Active' },
  { id: 'US-12', name: 'Élise Martin', email: 'elise@livo.com', role: 'Marketing', permission: 'Content + Promotions', lastActive: '1d ago', status: 'Active' },
  { id: 'US-13', name: 'Tom Berndt', email: 'tom@livo.com', role: 'Warehouse', permission: 'Inventory only', lastActive: '2d ago', status: 'Suspended' },
  { id: 'US-14', name: 'Aya Takahashi', email: 'aya@livo.com', role: 'Support', permission: 'Orders + Customers', lastActive: '4d ago', status: 'Active' },
];