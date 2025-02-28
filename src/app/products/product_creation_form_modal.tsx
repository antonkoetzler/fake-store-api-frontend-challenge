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
 * ProductCreationFormModal props.
 *
 * @see ProductCreationFormModal
 * @param setIsDialogOpenActions
 * @param refreshTableAction
 */
interface ProductCreationFormModalProps {
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
  refreshTableAction: () => Promise<void>;
}

/**
 * Form modal that registers Products
 *
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
 * The actual form component.
 *
 * @param ProductCreationFormModalProps
 */
function ProductForm({
  setIsDialogOpenAction,
  refreshTableAction,
}: ProductCreationFormModalProps) {
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
      if (!response.ok) setFormMessage({ type: 'error', message: 'Error creating product!' });
      setFormMessage({ type: 'success', message: 'Product created successfully!' });
      setTimeout(() => {
        refreshTableAction();
        setIsDialogOpenAction(false);
      }, 1000);
    } catch (error) {
      setFormMessage({ type: 'error', message: 'Error creating product!' });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <GenericFormField
          control={form.control}
          name='title'
          label='Title'
          builder={(field) => <Input required={true} {...field} />}
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
                placeholder='R$ 0,00'
                type='text'
              />
            );
          }}
        />
        <GenericFormField
          control={form.control}
          name='description'
          label='Description'
          builder={(field) => <Input {...field} />}
        />
        <GenericFormField
          control={form.control}
          name='category'
          label='Category'
          builder={(field) => <Input {...field} />}
        />
        <GenericFormField
          control={form.control}
          name='image'
          label='Image'
          builder={(field) => <Input {...field} />}
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
