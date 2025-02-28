'use client';

import { useEffect, useState } from 'react';
import DataTable from './products/data_table';
import { Loader2 } from 'lucide-react';
import { apiUrl } from '@/constants';
import createColumns from './products/create_columns';

export default function Home() {
  return (
    <>
      <Title />
      <Divider />
      <ProductTable />
    </>
  );
}

function Title() {
  return (
    <div className='text-center text-3xl font-bold p-4 text-gray-300'>FakeStoreAPI Product CRUD</div>
  );
}

function Divider() {
  return (
    <div role='separator' className='w-full h-[1] bg-muted' />
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
    return (
      <div className='flex align-center justify-center p-4'>
        <Loader2 role='status' className='animate-spin' />
      </div>
    );
  }

  return (
    <div role='table' className='px-4 items-center'>
      <DataTable<Product, unknown>
        columns={createColumns({ refreshTableAction: fetchPosts })}
        data={products!}
        refreshTableAction={fetchPosts}
      />
    </div>
  );
}
