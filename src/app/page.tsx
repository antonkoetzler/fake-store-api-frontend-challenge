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

  const fetchPosts = async () => {
    if (products !== undefined) setProducts(undefined);
    const result = await fetch(`${apiUrl}/products`);
    const data: Product[] = await result.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (products === undefined) {
    return <Loader2 className='animate-spin' />
  }

  return (
    <div className='px-4'>
      <DataTable<Product, unknown>
        columns={columns}
        data={products!}
        refreshTableAction={fetchPosts}
      />
    </div>
  );
}
