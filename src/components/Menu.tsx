import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { CategoryRounded } from "@mui/icons-material";
import { Icategory } from '../types/categoryType';
import { AppContext } from './Context/AppContext';
import Product from './Product';
import { useNavigate } from 'react-router';

const fetchCategories = async () => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/category/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  console.log('Resonse:', response);
  return response.content.data;
};

// const fetchProducts = async () => {
//   const response = await (
//     await fetch('http://localhost:3000/api/v1/products/all', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   ).json();

//   console.log('Response fetch products:', response);
//   return response.content.data;
// };

const Menu = () => {
  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useContext(AppContext);

  // use Query hooks
  const {
    isPending: isPendingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10000,
    refetchOnMount: false,
  });

  // const {
  //   isPending: isPendingProducts,
  //   error: errorProducts,
  //   data: products,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: fetchProducts,
  //   staleTime: 10000,
  //   refetchOnMount: false,
  // });

  console.log('Categories:', categories);
  // console.log('Products:', products);

  if (isPendingCategories) return <>Loading</>;
  if (errorCategories) return <>Error</>;

  const handleOrder = (e) => {
    navigate('/user/order');
  };

  return (
    <div>
      {/* {categories.map((cat: Icategory) => {
        return <div> {cat.name}</div>;
      })} */}
      {/* {products.map((product) => {
        return <div> {product.name}</div>;
      })} */}
      <Product />
      <div style={{backgroundColor:'blue'}}>
        <button onClick={handleOrder}>Order</button>
      </div>
    </div>
  );
};

export default Menu;
