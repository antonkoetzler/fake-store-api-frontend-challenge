/**
 * Represents a product.
 *
 * @param id
 * @param title
 * @param price
 * @param description
 * @param category
 * @param image
 * @param rating
 */
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

/**
  * Rating of a [Product].
  *
  * @see Product
  *
  * @param rate
  * @param count
  */
type Rating = {
  rate: number;
  count: number;
};
