import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { TProduct } from '@/types/productType';

import Item from './Item';
import SearchBar from './SearchBar';

const Products = () => {
  const isAdmin = localStorage.getItem('isAdmin');

  const [productsData, setProductsData] = useState<TProduct[] | null>(null);

  // function to fetch product data
  const fetchProducts = async () => {
    try {
      const response = await (
        await fetch('http://localhost:3000/api/v1/products/all', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      console.log('Admin products: ', response.content.data);
      return response.content.data;
    } catch (error) {
      console.log('AdminProducts: Failed to fetch Products', error);
      throw new Error('Failed to fetch products');
    }
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 6000000, //ms
    refetchOnMount: true,
  });

  // Update productsData when the query data changes
  useEffect(() => {
    if (data) {
      setProductsData(data);
    }
  }, [data]);

  const handleSearch = (searchResults: TProduct[]) => {
    setProductsData(searchResults);
  };

  // if its not admin, then do not render this page
  if (isAdmin === 'false') {
    return (
      <div className="text-center p-1 m-2">
        <h1>Unauthorized!</h1>
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div className="text-center">
      <SearchBar onSearch={handleSearch} />
      <div>Products</div>
      {productsData &&
        productsData.map((product: TProduct) => (
          <Item key={product.id} data={{ product }} />
        ))}
    </div>
  );
};

export default Products;
