import React, { useState, useContext } from 'react';
import { Button } from './ui/button';
import { TProduct } from '@/types/productType';
import { AppContext } from './Context/AppContext';

const SearchBar = (props) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const { handleSearching } = useContext(AppContext);

  const handleSearch = async () => {
    try {
      const searchTerm = searchInputValue.toLowerCase();

      if (searchTerm && searchTerm.length > 0) {
        // fetching products from database
        // const response = await (
        //   await fetch(
        //     `http://localhost:3000/api/v1/products/search/${searchTerm}`,
        //     {
        //       method: 'GET',
        //       credentials: 'include',
        //       headers: {
        //         'Content-Type': 'application/json',
        //       },
        //     }
        //   )
        // ).json();

        // const searchProducts = props.data.filter((product: TProduct) => {
        //   return product.name.toLowerCase().match(searchTerm);
        // });

        // console.log(searchProducts);

        const regex = new RegExp(
          searchTerm
            .split('')
            .map((char) => `[${char.toLowerCase()}${char.toUpperCase()}]`)
            .join(''),
          'i'
        );
        let searchResults = props.data.products.filter((product: TProduct) =>
          regex.test(product.name)
        );

        // if (searchResults.length === 0) searchResults = null;

        // props.onSearch(response.content.data);
        props.onSearch(searchResults);
      } else {
        alert('Input something to search!');
      }
    } catch (error) {
      console.log('Failed to search product', error);
      alert('Failed to search product');
    }
  };

  const handleSearchInput = async (e) => {
    const searchInput = e.target.value;
    setSearchInputValue(e.target.value);

    if (searchInput.length > 0) {
      handleSearching(true);
    } else if (searchInput.length === 0) {
      handleSearching(false);
      props.data.setSearchResult(null);
    }
  };

  return (
    <div className="text-center w-100 flex justify-center items-center">
      <div className="text-center w-5/12 m-5 p-2 flex justify-between align-middle">
        <div
          id="search-input-container"
          className="flex justify-center items-center w-4/5 rounded-xl border border-yellow-400"
        >
          <input
            className="w-11/12 p-2 outline-none"
            type="text"
            placeholder="Search..."
            onChange={handleSearchInput}
            required
          />
        </div>

        <div
          id="search-btn-container"
          className="flex justify-center items-center mx-5"
        >
          <Button
            className="bg-yellow-100 text-black hover:bg-yellow-300"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
