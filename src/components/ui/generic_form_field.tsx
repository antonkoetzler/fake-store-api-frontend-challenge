import { Control, ControllerRenderProps } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';

/**
 * Props of of GenericFormField
 *
 * @see GenericFormField
 */
interface GenericFormFieldProps<
  TSchema extends ZodType<any, any, any>,
  TFieldName extends keyof z.infer<TSchema>
> {
  control: Control<z.infer<TSchema>>;
  name: TFieldName;
  label: string;
  builder: (field: ControllerRenderProps<z.infer<TSchema>>) => React.ReactNode;
}

/**
 * Generic component for a field of a Form.
 *
 * @see Form
 */
export function GenericFormField<
  TSchema extends ZodType<any, any, any>,
  TFieldName extends keyof z.infer<TSchema>
>({
  control,
  name,
  label,
  builder,
}: GenericFormFieldProps<TSchema, TFieldName>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>{builder(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
