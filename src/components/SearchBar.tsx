import React, { useState } from 'react';
import { Button } from './ui/button';

const SearchBar = (props) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleSearch = async () => {
    try {
      const searchTerm = searchInputValue.toLowerCase();

      if (searchTerm && searchTerm.length > 0) {
        const response = await (
          await fetch(
            `http://localhost:3000/api/v1/products/search/${searchTerm}`,
            {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
        ).json();
        props.onSearch(response.content.data);
      } else {
        alert('Input something to search!');
      }
    } catch (error) {
      console.log('Failed to search product', error);
      alert('Failed to search product');
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
            onChange={(e) => {
              setSearchInputValue(e.target.value);
            }}
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
