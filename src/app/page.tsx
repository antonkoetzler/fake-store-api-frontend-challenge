'use client';

import { useEffect, useState } from 'react';
import columns from './products/columns';
import DataTable from './products/data_table';
import { Loader2 } from 'lucide-react';

export default function Home() {
  return (
    <ProductTable />
  );
}

function ProductTable() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data: Product[] = await result.json();
      setProducts(data);
    };
    fetchPosts();
  }, []);

  if (products === undefined) {
    return <Loader2 className='animate-spin' />
  }

  return (
    <DataTable
      columns={columns}
      data={products!}
    />
  );
}
