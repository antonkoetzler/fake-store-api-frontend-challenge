import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dispatch, SetStateAction, useState } from 'react';
import { apiUrl } from "@/constants";

/**
 * ProductDeletionFormModal props.
 *
 * @see ProductDeletionFormModal
 */
interface ProductDeletionFormModalProps {
  product: Product;
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
  refreshTableAction: () => Promise<void>;
}

/**
 * Form modal that deletes a Product
 *
 * @see Product
 * @param ProductDeletionFormModalProps
 */
export default function ProductDeletionFormModal({
  product,
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductDeletionFormModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {product.title}</DialogTitle>
      </DialogHeader>
      <ProductForm
        product={product}
        setIsDialogOpenAction={setIsDialogOpenAction}
        refreshTableAction={refreshTableAction}
      />
    </DialogContent>
  );
}
/**
 * The actual form component.
 *
 * @param ProductCreationFormModalProps
 */
function ProductForm({
  product,
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductDeletionFormModalProps) {
  const [formMessage, setFormMessage] = useState<
    {
      type: 'success' | 'error',
      message: string | undefined,
    }
  >(
    {
      type: 'success',
      message: undefined,
    },
  );

  async function onConfirm() {
    try {
      const response = await fetch(`${apiUrl}/products/${product.id}`, { method: 'DELETE' });
      if (!response.ok) setFormMessage({ type: 'error', message: 'Error deleting product!' });
      setFormMessage({ type: 'success', message: 'Product deleted successfully!' });
      setTimeout(() => {
        refreshTableAction();
        setIsDialogOpenAction(false);
      }, 1000);
    } catch (error) {
      setFormMessage({ type: 'error', message: 'Error deleting product!' });
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-xl'>Are you sure you want to delete {product.title}?</div>
      {
        formMessage.message !== undefined
        &&
        <div
          className={`p-4 ${formMessage.type == 'success' ? 'bg-green-600' : 'bg-red-500'} rounded-xl w-full text-center`}
        >{formMessage.message}</div>
      }
      <div className='flex flex-row gap-4'>
        <Button
          className='p-4 rounded-xl w-full text-center'
          onClick={() => setIsDialogOpenAction(false)}
        >Cancel</Button>
        <Button
          className='p-4 rounded-xl w-full text-center'
          onClick={onConfirm}
        >Confirm</Button>
      </div>
    </div>
  );
}
