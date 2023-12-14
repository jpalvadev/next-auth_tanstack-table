'use client'; // si usamos funciones como cell por ej, debemos convertir en client component

import { Person } from '@/lib/people';
import { ColumnDef } from '@tanstack/react-table';

import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Person>[] = [
  {
    header: 'Person ID', // Encabezado de la columna
    accessorKey: 'id', // tiene que matchear la estructura del dato a mostrar => data.id
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    accessorKey: 'first_name',
  },
  {
    header: 'Last Name',
    accessorKey: 'last_name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Gender',
    accessorKey: 'gender',
  },
  {
    // estilamos el header
    header: () => <div className="text-right">Date of Birth</div>,
    accessorKey: 'date_of_birth',
    // obtenemos la fila
    cell: ({ row }) => {
      const date_of_birth = row.getValue('date_of_birth'); // obtenemos el value
      const formatted = new Date(date_of_birth as string).toLocaleDateString(); // formateamos el date
      // devolvemos JSX
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    // traemos la fila cada vez que necesitamos los datos
    cell: ({ row }) => {
      const person = row.original; // original trae todos los datos de la persona, de la fila
      const personId = person.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `${person.first_name} ${person.last_name}`
                )
              }
            >
              Copy Name to Clipboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('edit', personId)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log('delete', personId)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
