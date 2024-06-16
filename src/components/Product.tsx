import { useQuery } from '@tanstack/react-query';
import { TProduct } from '../types/productType';
// import { CategoryRounded } from "@mui/icons-material";

const Product = (props) => {
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

  return (
    <div id="products-container" className="flex flex-col align-middle">
      <>
        <div
          className="flex flex-row-reverse justify-around align-middle m-5 p-2"
          id={props.data.product.id}
          key={'key-' + props.data.product.id}
        >
          <div className="w-28 flex flex-col justify-center">
            <img
              src="https://nomoneynotime.com.au/imager/uploads/recipes/12569/shutterstock_2042520416-1_461122a663362b265b24d0ffaf0f7f5f.jpeg"
              alt="product-image"
            />
          </div>

          <div
            className="m-2 flex flex-col justify-center"
            id={'name-' + props.data.product.id}
          >
            {props.data.product.name}
          </div>

          <div
            className="m-2 flex flex-col justify-center"
            id={'price-' + props.data.product.id}
          >
            {
              props.data.product.sellingPrice[
                Object.keys(props.data.product.sellingPrice)[0]
              ]
            }
          </div>

          <div className="m-2 w-14 flex flex-col justify-center">
            <button
              className="justify-center cursor-pointer border border-red-600 rounded hover:text-red-600 hover:bg-red-100"
              id={'addBtn-' + props.data.product.id}
              onClick={handleAddToCart}
            >
              Add
            </button>
          </div>

          <div className="m-2 w-24 flex flex-col justify-center">
            <button
              className="justify-center cursor-pointer border border-red-600 rounded hover:text-red-600 hover:bg-red-100"
              id={'remBtn-' + props.data.product.id}
              onClick={handleRemoveFromCart}
            >
              Remove
            </button>
          </div>
        </div>
        <hr />
      </>
    </div>
  );
};

export default Product;
