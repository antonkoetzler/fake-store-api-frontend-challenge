'use client';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
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
 * ProductCreationFormModal props.
 * @see ProductCreationFormModal
 * @param ProductCreationFormModalProps
 */
interface ProductCreationFormModalProps {
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
  refreshTableAction: () => Promise<void>;
}

/**
 * Modal that registers Products
 * @see Products
 * @param ProductCreationFormModalProps
 */
export default function ProductCreationFormModal({
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductCreationFormModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cadastre um produto</DialogTitle>
      </DialogHeader>
      <ProductForm
        setIsDialogOpenAction={setIsDialogOpenAction}
        refreshTableAction={refreshTableAction}
      />
    </DialogContent>
  );
}

/**
 * The actual form component.
 * @param ProductCreationFormModalProps
 */
function ProductForm({
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductCreationFormModalProps) {
  const [showingSuccessMessage, setShowingSuccessMessage] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to create product');
      setShowingSuccessMessage(true);
      refreshTableAction();
      setTimeout(() => setIsDialogOpenAction(false), 1000);
    } catch (error) {
      console.log(`Error creating product: ${error}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => {
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              const numericValue = Number(rawValue) / 100;
              field.onChange(numericValue);
            };
            return (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    value={convertToBrazilianReal(field.value.toString())}
                    onChange={handleChange}
                    placeholder='R$ 0,00'
                    type='text'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          showingSuccessMessage
          &&
          <div className='p-4 bg-green-600 rounded-xl w-full text-center'>Product created!</div>
        }
        <Button className='w-full' type='submit'>Criar</Button>
      </form>
    </Form>
  );
}

