/**
 * Helper functions to format to certain currencies.
 */
export function convertToBrazilianReal(price: string) {
  const amount = parseFloat(price);
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}
