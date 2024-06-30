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
  const [productsData, setProductsData] = useState(Array<TProduct>);
  const [vegTag, setVegTag] = useState(null);
  const [nonVegTag, setNonVegTag] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const { isSearching } = useContext(AppContext);

  const navigate = useNavigate();

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

  const renderProducts = (products: Array<TProduct>) => {
    try {
      const filterResult = products
        .filter((product) => !product.disabled)
        .filter((product) => {
          if (!category) return true;
          return product.categoryId === category;
        })
        .filter((product) => {
          if (vegTag === true) return product.vegTag === true;
          if (nonVegTag === true) return product.vegTag === false;
          return true;
        })
        .map((product) => <Item key={product.id} data={{ product }} />);

      if (filterResult.length === 0)
        return <div className="text-center p-1">Not found!</div>;
      return filterResult;
    } catch (error) {
      console.log('Failed to render products', error);
      alert('Failed to render products');
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
    staleTime: 600000,
    refetchOnMount: false,
  });

  // Update productsData when the query data changes
  useEffect(() => {
    if (products) {
      setProductsData(products);
    }
  }, [products, category]);

  const handleSearch = (searchResults: TProduct[]) => {
    setSearchResult(searchResults);
  };

  if (isPendingCategories) return <>Loading</>;
  if (errorCategories) return <>Error</>;

  if (isPendingProducts) return <>Loading</>;
  if (errorProducts) return <>Error</>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} data={{ products, setSearchResult }} />
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
              className={`w-10 p-1 border border-yellow-300 rounded cursor-pointer hover:bg-yellow-100 text-sm ${
                vegTag ? 'bg-yellow-300' : null
              }`}
              onClick={handleVegTag}
            >
              Veg
            </button>
          </div>
          <div id="non-veg-tag-btn-div" className="m-2">
            <button
              id="non-veg-tag-btn"
              className={`w-auto p-1 border border-yellow-300 rounded cursor-pointer hover:bg-yellow-100 text-sm ${
                nonVegTag ? 'bg-yellow-300' : null
              }`}
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

      {isSearching === true ? (
        !searchResult ? (
          <div className="text-center">
            Please click the search button to perform the search....
          </div>
        ) : (
          renderProducts(searchResult)
        )
      ) : (
        renderProducts(productsData)
      )}
    </div>
  );
};

export default Menu;
