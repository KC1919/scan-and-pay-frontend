/*
{ 
    Order number 
    status
    Items:{
        item_name,
        qty,
        item_price,
    },
    total
}
*/

import React, { useContext } from 'react';
import { AppContext } from './Context/AppContext';
import Item from './Item';

const Order = () => {
  const { cartProducts } = useContext(AppContext);
  console.log('Order products:', cartProducts);
  
  return (
    <div>
      {cartProducts.map((product) => {
        return (
          <Item
            name={product.name}
            id={product.id}
            price={product.sellingPrice}
            qty={product.quantity}
          />
        );
      })}
    </div>
  );
};

export default Order;
