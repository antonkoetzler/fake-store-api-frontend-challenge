'use client';

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { convertToBrazilianReal } from "@/functions/currency_formatter_functions";
import { Dispatch, SetStateAction } from "react";

/**
 * ProductVisualizationModal props.
 *
 * @see ProductVisualizationModal
 * @param setIsDialogOpenAction
 */
interface ProductVisualizationModalProps {
  product: Product;
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
}

/**
 * Modal where the user may visualize a given Product.
 *
 * @see Product
 * @param ProductVisualizationModalProps
 */
export default function ProductVisualizationModal({
  product,
  setIsDialogOpenAction,
}: ProductVisualizationModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{product.title}</DialogTitle>
      </DialogHeader>
      <ProductVisualization product={product} />
      <CloseButton setIsDialogOpenAction={setIsDialogOpenAction} />
    </DialogContent>
  );
}

/**
 * ProductVisualization props.
 *
 * @see ProductVisualization
 * @param product
 */
interface ProductVisualizationProps {
  product: Product;
}

/**
 * Component that provides the details of the Product.
 *
 * @see Product
 * @param ProductVisualizationProps
 */
function ProductVisualization({
  product,
}: ProductVisualizationProps) {
  return (
    <div className='flex flex-col flex-wrap align-center justify-center gap-4'>
      <div className='flex flex-row gap-4 items-center'>
        <img
          width={130}
          className={'rounded-md aspect-auto object-contain'}
          src={product.image}
          alt={product.title}
        />
        <div className='flex flex-col'>
          <div><strong>ID:</strong> {product.id}</div>
          <div><strong>Title:</strong> {product.title}</div>
          <div><strong>Rating:</strong> {product.rating.rate}/5</div>
          <div><strong># of ratings:</strong> {product.rating.count}</div>
          <div><strong>Price:</strong> {convertToBrazilianReal(product.price.toString())}</div>
          <div><strong>Category:</strong> {product.category}</div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div><strong>Description:</strong></div>
        <div>{product.description}</div>
      </div>
    </div>
  );
}

/**
 * CloseButton props.
 *
 * @see CloseButton
 * @param setIsDialogOpenAction
 */
interface CloseButtonProps {
  setIsDialogOpenAction: Dispatch<SetStateAction<boolean>>;
}

/**
 * Button that closes the modal.
 *
 * @param CloseButtonProps
 */
function CloseButton({
  setIsDialogOpenAction,
}: CloseButtonProps) {
  return (
    <Button
      className='w-full'
      onClick={() => setIsDialogOpenAction(false)}
    >Close</Button>
  );
}
