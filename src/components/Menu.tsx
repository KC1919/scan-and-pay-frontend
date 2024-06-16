import React, { EventHandler, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { CategoryRounded } from "@mui/icons-material";
import { Icategory } from '../types/categoryType';
import { AppContext } from './Context/AppContext';
import Product from './Product';
import { useNavigate } from 'react-router';
import { TProduct } from '@/types/productType';

const Menu = () => {
  const [category, setCategory] = useState('');

  const navigate = useNavigate();
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const selectCategory = (e) => {
    try {
      // check if category is already selected
      if (e.target.id === category) {
        unselectCategory(e.target.id);
        return;
      }

      // remove selected category if any
      const catContainerElem = document.getElementById(
        'category-container'
      ) as HTMLDivElement;

      catContainerElem.childNodes.forEach((child) => {
        const category = child.childNodes[0] as HTMLElement;
        category.classList.remove('bg-yellow-300');
      });

      setCategory(e.target.id);
      const categoryElem = document.getElementById(e.target.id);
      categoryElem?.classList.add('bg-yellow-300');
    } catch (error) {
      console.log('Failed to select category');
    }
  };

  const unselectCategory = (categoryId: string) => {
    try {
      const categoryElem = document.getElementById(categoryId);
      categoryElem?.classList.remove('bg-yellow-300');
      setCategory('');
    } catch (error) {
      console.log('Failed to unselect category', error);
    }
  };

  const handleOrder = (e) => {
    navigate('/user/order');
  };

  const fetchCategories = async () => {
    const response = await (
      await fetch('http://localhost:3000/api/v1/category/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    console.log('Response:', response);
    return response.content.data;
  };

  // Category Query hooks
  const {
    isPending: isPendingCategories,
    error: errorCategories,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 6000000, //ms
    refetchOnMount: false,
  });

  // fetch all the products
  const fetchProducts = async () => {
    const response = await (
      await fetch('http://localhost:3000/api/v1/products/all', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();

    console.log('Response fetch products:', response);
    return response.content.data;
  };

  // Product Query hooks
  const {
    isPending: isPendingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 6000000,
    refetchOnMount: false,
  });

  if (isPendingCategories) return <>Loading</>;
  if (errorCategories) return <>Error</>;

  if (isPendingProducts) return <>Loading</>;
  if (errorProducts) return <>Error</>;

  return (
    <div>
      <div id="category-container" className="flex flex-row align-middle">
        {categories.map((cat: Icategory) => {
          return (
            <div className="p-1 m-2" key={cat.id}>
              <button
                id={cat.id}
                className="p-1 border border-yellow-300 rounded cursor-pointer hover:bg-yellow-100"
                onClick={selectCategory}
              >
                {cat.name}
              </button>
            </div>
          );
        })}
      </div>
      <div className="m-1 mb-2">
        <hr />
      </div>

      {products.map((product: TProduct) => {
        if (category.length === 0) return <Product data={{ product }} />;
        else {
          return (
            category === product.categoryId && <Product data={{ product }} />
          );
        }
      })}
    </div>
  );
};

export default Menu;
