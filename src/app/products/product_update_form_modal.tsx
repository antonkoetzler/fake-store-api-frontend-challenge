'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { GenericFormField } from '@/components/ui/generic_form_field';
import { Input } from '@/components/ui/input';
import { apiUrl } from '@/constants';
import { convertToBrazilianReal } from '@/functions/currency_formatter_functions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

/**
 * Objects being evaluated and sent by the form.
 */
const schema = z.object({
  title: z.string().min(1, 'Required.').max(30, 'Cannot be more than 30 characters long.'),
  price: z.number().min(0, 'Should be a valid non-negative price.'),
  description: z.string(),
  category: z.string(),
  image: z.string(),
});

/**
 * ProductUpdateFormModal props.
 *
 * @see ProductUpdateFormModal
 * @param setIsDialogOpenActions
 * @param refreshTableAction
 */
interface ProductUpdateFormModalProps {
  product: Product;
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
  refreshTableAction: () => Promise<void>;
}

/**
 * Form modal that updates a Product
 *
 * @see Product
 * @param ProductUpdateFormModalProps
 */
export default function ProductUpdateFormModal({
  product,
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductUpdateFormModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Update {product.title}</DialogTitle>
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
}: ProductUpdateFormModalProps) {
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
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = await fetch(`${apiUrl}/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) setFormMessage({ type: 'error', message: 'Error updating product!' });
      setFormMessage({ type: 'success', message: 'Product updated successfully!' });
      setTimeout(() => {
        refreshTableAction();
        setIsDialogOpenAction(false);
      }, 1000);
    } catch (error) {
      setFormMessage({ type: 'error', message: 'Error updating product!' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <GenericFormField
          control={form.control}
          name='title'
          label='Title'
          builder={(field) => <Input placeholder={product.title} {...field} />}
        />
        <GenericFormField
          control={form.control}
          name='price'
          label='Price'
          builder={(field) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              const numericValue = Number(rawValue) / 100;
              field.onChange(numericValue);
            };
            return (
              <Input
                value={convertToBrazilianReal(field.value.toString())}
                onChange={handleChange}
                placeholder={`R$ ${convertToBrazilianReal(product.price.toString())}`}
                type='text'
              />
            );
          }}
        />
        <GenericFormField
          control={form.control}
          name='description'
          label='Description'
          builder={(field) => <Input placeholder={product.description} {...field} />}
        />
        <GenericFormField
          control={form.control}
          name='category'
          label='Category'
          builder={(field) => <Input placeholder={product.category} {...field} />}
        />
        <GenericFormField
          control={form.control}
          name='image'
          label='Image'
          builder={(field) => <Input placeholder={product.image} {...field} />}
        />
        {
          formMessage.message !== undefined
          &&
          <div
            className={`p-4 ${formMessage.type == 'success' ? 'bg-green-600' : 'bg-red-500'} rounded-xl w-full text-center`}
          >{formMessage.message}</div>
        }
        <Button className='w-full' type='submit'>Criar</Button>
      </form>
    </Form>
  );
}
