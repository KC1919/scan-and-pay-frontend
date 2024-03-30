import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { CategoryRounded } from "@mui/icons-material";
import { AppContext } from './Context/AppContext';

const fetchProducts = async () => {
  const response = await (
    await fetch('http://localhost:3000/api/v1/products/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  console.log('Response fetch products:', response);
  return response.content.data;
};

const Product = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const handleAddToCart = (e) => {
    try {
      let present = false;

      const productId = e.target.id.split('-')[1];
      const productElem = document.getElementById(productId);

      console.log(productId);

      // check if product is already present in the cart
      // if present increment the quantity of the product in the cart
      setCartProducts(
        cartProducts.map((product) => {
          if (product.id === productId) {
            present = true;
            // updating the quantity of the product present in the cart
            return { ...product, quantity: Number(product.quantity) + 1 };
          } else {
            return { ...product };
          }
        })
      );

      // if the product is not present in the cart, add it
      if (!present) {
        let prodName;
        let prodPrice;

        productElem?.childNodes.forEach((element) => {
          if (element['id'].indexOf('name') != -1) {
            prodName = element.textContent;
          } else if (element['id'].indexOf('price') != -1) {
            prodPrice = element.textContent;
          }
        });

        const prodToAdd = {
          id: productId,
          name: prodName,
          price: prodPrice,
          quantity: 1,
        };

        setCartProducts([...cartProducts, prodToAdd]);
      }
    } catch (error) {
      console.log('Failed to add product to cart', error);
    }
  };

  const handleRemoveFromCart = (e) => {
    try {
      const productId = e.target.id.split('-')[1];

      console.log('Product removed from cart: ', productId);

      let lastPiece = false;

      // check if product is already present in the cart
      // if present decrement the quantity of the product in the cart
      setCartProducts(
        cartProducts.map((product) => {
          if (product.id == productId && product.quantity >= 1) {
            // updating the quantity of the product present in the cart
            if (product.quantity == 1) {
              lastPiece = true;
            } else
              return { ...product, quantity: Number(product.quantity) - 1 };
          } else {
            return { ...product };
          }
        })
      );

      // removing the last quantity of an item in the cart
      if (lastPiece) {
        setCartProducts(
          cartProducts.filter((prod) => {
            if (prod.id != productId) return { ...prod };
          })
        );
      }
    } catch (error) {
      console.log('Failed to remove item from the cart', error);
    }
  };

  // use Query hooks
  const {
    isPending: isPendingProducts,
    error: errorProducts,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 10000,
    refetchOnMount: false,
  });

  console.log('Products:', products);

  if (isPendingProducts) return <>Loading</>;
  if (errorProducts) return <>Error</>;
  return (
    <div>
      {products.map((product) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              margin: '10px',
              padding: '20px',
              backgroundColor: 'powderblue',
            }}
            id={product.id}
            key={'key-' + product.id}
          >
            <div>
              <img src="" alt="product-image" />
            </div>
            <div id={'name-' + product.id}>{product.name}</div>
            <div id={'price-' + product.id}>{product.sellingPrice}</div>
            <div>
              <button id={'addBtn-' + product.id} onClick={handleAddToCart}>
                Add
              </button>
            </div>
            <div>
              <button
                id={'remBtn-' + product.id}
                onClick={handleRemoveFromCart}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Product;
