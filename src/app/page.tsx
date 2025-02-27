'use client';

import { useEffect, useState } from 'react';
import columns from './products/columns';
import DataTable from './products/data_table';
import { Loader2 } from 'lucide-react';
import { apiUrl } from '@/constants';

export default function Home() {
  return (
    <ProductTable />
  );
}

function ProductTable() {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = await fetch(`${apiUrl}/products`);
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
