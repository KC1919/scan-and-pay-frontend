import React, { useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { CategoryRounded } from "@mui/icons-material";
import { Icategory } from '../types/categoryType';
import { AppContext } from './Context/AppContext';
import Item from './Item';
import { useNavigate } from 'react-router';
import { TProduct } from '@/types/productType';
import SearchBar from './SearchBar';
import { Button } from './ui/button';

const Menu = () => {
  const [category, setCategory] = useState('');
  const [productsData, setProductsData] = useState([]);
  const [vegTag, setVegTag] = useState(null);
  const [nonVegTag, setNonVegTag] = useState(null);

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

  const handleVegTag = (e) => {
    try {
      if (vegTag === null || vegTag === false) {
        setVegTag(true);
        setNonVegTag(false);
      } else if (vegTag === true) {
        setVegTag(false);
      }
    } catch (error) {
      console.log('Failed to filter veg items', error);
      alert('Failed to filter veg items');
    }
  };

  const handleNonVegTag = (e) => {
    try {
      if (nonVegTag === null || nonVegTag === false) {
        setNonVegTag(true);
        setVegTag(false);
      } else {
        setNonVegTag(false);
      }
    } catch (error) {
      console.log('Failed to filter veg items', error);
      alert('Failed to filter veg items');
    }
  };
  // fetch all category data
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

  // fetch all the products data
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
    staleTime: 6000,
    refetchOnMount: false,
  });

  // Update productsData when the query data changes
  useEffect(() => {
    if (products) {
      setProductsData(products);
    }
  }, [products, category]);

  const handleSearch = (searchResults: TProduct[]) => {
    setProductsData(searchResults);
  };

  if (isPendingCategories) return <>Loading</>;
  if (errorCategories) return <>Error</>;

  if (isPendingProducts) return <>Loading</>;
  if (errorProducts) return <>Error</>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div
        id="category-filter-parent-container"
        className="px-5 flex flex-row align-middle justify-between"
      >
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

        <div
          id="vegtag-container"
          className="flex flex-row align-middle justify-center w-1/5"
        >
          <div id="veg-tag-btn-div" className="m-2">
            <button
              id="veg-tag-btn"
              className={`w-10 p-1 border border-yellow-300 rounded cursor-pointer hover:bg-yellow-100 text-sm ${vegTag?'bg-yellow-300':null}`}
              onClick={handleVegTag}
            >
              Veg
            </button>
          </div>
          <div id="non-veg-tag-btn-div" className="m-2">
            <button
              id="non-veg-tag-btn"
              className={`w-auto p-1 border border-yellow-300 rounded cursor-pointer hover:bg-yellow-100 text-sm ${nonVegTag?'bg-yellow-300':null}`}
              onClick={handleNonVegTag}
            >
              Non-veg
            </button>
          </div>
        </div>
      </div>
      <div className="m-1 mb-2">
        <hr />
      </div>

      {productsData.map((product: TProduct) => {
        // filter disabled products
        if (product.disabled === false) {
          if (category.length === 0) {
            if (
              (vegTag === null && nonVegTag === null) ||
              (vegTag === false && nonVegTag === false)
            )
              return <Item data={{ product }} />;
            else if (vegTag === true && product.vegTag === true) {
              return <Item data={{ product }} />;
            } else if (nonVegTag === true && product.vegTag === false) {
              return <Item data={{ product }} />;
            }
          } else if (category.length > 0) {
            if (
              (vegTag === null && nonVegTag === null) ||
              (vegTag === false && nonVegTag === false)
            )
              return (
                category === product.categoryId && <Item data={{ product }} />
              );
            else if (vegTag === true && product.vegTag === true) {
              return (
                category === product.categoryId && <Item data={{ product }} />
              );
            } else if (nonVegTag === true && product.vegTag === false) {
              return (
                category === product.categoryId && <Item data={{ product }} />
              );
            }
          }
        }
      })}
    </div>
  );
};

export default Menu;
