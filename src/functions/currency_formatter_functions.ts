/**
 * Helper functions to format to certain currencies.
 */
export function convertToBrazilianReal(price: string) {
  const amount = parseFloat(price);
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
}
