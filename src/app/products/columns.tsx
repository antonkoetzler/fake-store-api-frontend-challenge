'use client';

import { Button } from '@/components/ui/button';
import { convertToBrazilianReal } from '@/functions/currency_formatter_functions';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';

/**
 * [Product] columns for creating tables.]
 *
 * @see Product
 */
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <img
          width={50}
          className={'rounded-md aspect-auto object-contain'}
          src={row.getValue('image')}
          alt={row.getValue('title')}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className='font-medium'>{convertToBrazilianReal(row.getValue('price'))}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const category: string = row.getValue<string>('category');
      return (
        <div className={'w-[130px] flex flex-col justify-center'}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => {
      const rating: Rating = row.getValue('rating');
      return (
        <div className={'w-[130px] flex flex-col justify-center items-center'}>
          <div>{rating.rate}/5</div>
          <div># of reviews: {rating.count}</div>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className='flex space-x-2'>
        <Button variant='ghost'>
          <Edit className='h-10 w-10' />
        </Button>
        <Button variant='ghost'>
          <Trash className='h-10 w-10' />
        </Button>
      </div>
    ),
  },
];

export default columns;
