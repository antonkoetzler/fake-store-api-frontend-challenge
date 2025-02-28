'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { convertToBrazilianReal } from '@/functions/currency_formatter_functions';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import ProductUpdateFormModal from './product_update_form_modal';
import ProductDeletionFormModal from './product_deletion_form_modal';

/**
 * [Product] columns for creating tables.
 *
 * @see Product
 */
export default function createColumns({
  refreshTableAction,
}: {
  refreshTableAction: () => Promise<void>,
}): ColumnDef<Product>[] {
  return [
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
      cell: ({ row }) => {
        const [isUpdateFormDialogOpen, setIsUpdateFormDialogOpen] = useState(false);
        const [isDeletionFormDialogOpen, setIsDeletionFormDialogOpen] = useState(false);

        return (
          <div className='flex space-x-2'>
            <Dialog open={isUpdateFormDialogOpen} onOpenChange={setIsUpdateFormDialogOpen}>
              <DialogTrigger asChild>
                <Button variant='ghost'>
                  <Edit className='h-10 w-10' />
                </Button>
              </DialogTrigger>
              <ProductUpdateFormModal
                product={row.original}
                setIsDialogOpenAction={setIsUpdateFormDialogOpen}
                refreshTableAction={refreshTableAction}
              />
            </Dialog>
            <Dialog open={isDeletionFormDialogOpen} onOpenChange={setIsDeletionFormDialogOpen}>
              <DialogTrigger asChild>
                <Button variant='ghost'>
                  <Trash className='h-10 w-10' />
                </Button>
              </DialogTrigger>
              <ProductDeletionFormModal
                product={row.original}
                setIsDialogOpenAction={setIsDeletionFormDialogOpen}
                refreshTableAction={refreshTableAction}
              />
            </Dialog>
          </div>
        );
      },
    },
  ];
}
