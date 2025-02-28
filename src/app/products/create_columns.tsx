'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { convertToBrazilianReal } from '@/functions/currency_formatter_functions';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Edit, Trash, View } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import ProductUpdateFormModal from './product_update_form_modal';
import ProductDeletionFormModal from './product_deletion_form_modal';
import ProductVisualizationModal from './product_visualization_modal';

/**
 * [Product] columns for creating a data table.
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
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Price
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => <div className='font-medium text-center'>{convertToBrazilianReal(row.getValue('price'))}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'category',
      header: () => {
        return <div className='text-center'>Category</div>
      },
      cell: ({ row }) => {
        const category: string = row.getValue<string>('category');
        return (
          <div className='w-[200px] flex flex-col justify-center truncate line-clamp-3'>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        );
      },
    },
    {
      accessorKey: 'rating',
      header: () => {
        return <div className='text-center'>Rating</div>
      },
      cell: ({ row }) => {
        const rating: Rating = row.getValue('rating');
        return (
          <div className={'w-[130px] flex flex-col justify-center items-center'}>
            <div>{rating.rate}/5</div>
            <div># of rating: {rating.count}</div>
          </div>
        );
      },
    },
    {
      id: 'actions',
      header: () => {
        return <div className='text-center'>Actions</div>
      },
      cell: ({ row }) => {
        const [isVisualizationFormDialogOpen, setIsVisualizationFormDialogOpen] = useState(false);
        const [isUpdateFormDialogOpen, setIsUpdateFormDialogOpen] = useState(false);
        const [isDeletionFormDialogOpen, setIsDeletionFormDialogOpen] = useState(false);

        return (
          <div className='flex space-x-2'>
            <ActionButton
              isDialogOpen={isVisualizationFormDialogOpen}
              setIsDialogOpen={setIsVisualizationFormDialogOpen}
              icon={<View className='h-16 w-16' />}
              dialog={(
                <ProductVisualizationModal
                  product={row.original}
                  setIsDialogOpenAction={setIsUpdateFormDialogOpen}
                />
              )}
            />
            <ActionButton
              isDialogOpen={isUpdateFormDialogOpen}
              setIsDialogOpen={setIsUpdateFormDialogOpen}
              icon={<Edit className='h-16 w-16' />}
              dialog={(
                <ProductUpdateFormModal
                  product={row.original}
                  setIsDialogOpenAction={setIsUpdateFormDialogOpen}
                  refreshTableAction={refreshTableAction}
                />
              )}
            />
            <ActionButton
              isDialogOpen={isDeletionFormDialogOpen}
              setIsDialogOpen={setIsDeletionFormDialogOpen}
              icon={<Trash className='h-16 w-16' />}
              dialog={(
                <ProductDeletionFormModal
                  product={row.original}
                  setIsDialogOpenAction={setIsDeletionFormDialogOpen}
                  refreshTableAction={refreshTableAction}
                />
              )}
            />
          </div>
        );
      },
    },
  ];
}

/**
 * Props of ActionButton.
 *
 * @see ActionButton
 */
interface ActionButtonProps {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  icon: ReactNode;
  dialog: ReactNode;
}

/**
 * Action button (i.e. editing, deleting, & viewing).
 *
 * @param ActionButtonProps
 */
function ActionButton({
  isDialogOpen,
  setIsDialogOpen,
  icon,
  dialog,
}: ActionButtonProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost'>{icon}</Button>
      </DialogTrigger>
      {dialog}
    </Dialog>
  );
}
