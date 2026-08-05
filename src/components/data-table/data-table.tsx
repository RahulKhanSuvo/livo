'use client';
import { tableFeatures, useTable } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';

// 1. Define the shape of your data
type Person = {
  firstName: string;
  lastName: string;
  age: number;
};

// 2. Give your data a stable reference (module scope, useState, useQuery, etc.)
const data: Array<Person> = [
  { firstName: 'tanner', lastName: 'linsley', age: 24 },
  { firstName: 'tandy', lastName: 'miller', age: 40 },
  { firstName: 'joe', lastName: 'dirte', age: 45 },
];

// 3. New in v9: declare which features this table uses (none yet)
const features = tableFeatures({});

// 4. Define your columns
const columns: Array<ColumnDef<typeof features, Person>> = [
  {
    accessorKey: 'firstName', // accessorKey shorthand
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName, // accessorFn alternative with a custom id
    id: 'lastName',
    header: () => <span>Last Name</span>,
    cell: (info) => <i>{info.getValue<string>()}</i>,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
  },
];

export function PersonTable() {
  // 5. Create the table instance
  const table = useTable({
    key: 'person-table', // needed for devtools, omit if you don't want to use the devtools
    features,
    columns,
    data,
  });

  // 6. Render markup from the table instance APIs
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : <table.FlexRender header={header} />}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableHead key={cell.id}>
                <table.FlexRender cell={cell} />
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
