'use client';

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    <div className='flex flex-col'>
      <img src={product.image} />
      <div>{product.id}</div>
      <div>{product.title}</div>
      <div className='flex flex-col'>
        <div>{product.rating.rate}/5</div>
        <div># of reviews: {product.rating.count}</div>
      </div>
      <div>{product.price}</div>
      <div>{product.category}</div>
      <div>{product.description}</div>
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
      variant='ghost'
      onClick={() => setIsDialogOpenAction(false)}
    >Close</Button>
  );
}
