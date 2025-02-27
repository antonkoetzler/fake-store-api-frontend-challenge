'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

/**
 * [Product] columns for creating tables.]
 *
 * @see Product
 */
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'image',
    header: 'Imagem',
    cell: ({ row }) => {
      return (
        <img
          width={50}
          className={'rounded-md aspect-auto object-contain'}
          src={row.getValue('image')}
          alt={'Produto imagem'}
        />
      );
    },
  },
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Titulo',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)
      return <div className='font-medium'>{formatted}</div>
    },
  },
  {
    accessorKey: 'description',
    header: 'Descrição',
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row }) => {
      const category: string = row.getValue<string>('category');
      return <div>{category.charAt(0).toUpperCase() + category.slice(1)}</div>;
    },
  },
  {
    accessorKey: 'rating',
    header: 'Avaliação',
    cell: ({ row }) => {
      const rating: Rating = row.getValue('rating');
      return (
        <div className={'w-[130px] flex flex-col justify-center items-center'}>
          <div>{rating.rate}/5</div>
          <div># de avaliações: {rating.count}</div>
        </div>
      );
    },
  },
];

export default columns;
