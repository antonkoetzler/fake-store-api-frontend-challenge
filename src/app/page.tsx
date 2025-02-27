import DataTable from './products/data_table';
import productTableColumns from './products/product_table_columns';

export default function Home() {
  const data: Product[] = [
    {
      id: 0,
      title: 'Title',
      price: 123.45,
      description: 'Description',
      category: 'Category',
      image: 'Image',
      rating: {
        rate: 123.4567,
        count: 123,
      },
    },
  ];

  return (
    <DataTable
      columns={productTableColumns}
      data={data}
    />
  );
}
