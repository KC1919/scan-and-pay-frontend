import React from 'react';

const Item = (props) => {
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
    >
      <div>
        <img src="" alt="product-image" />
      </div>
      <div id={'name-' + product.id}>{props.name}</div>
      <div id={'price-' + product.id}>{props.price}</div>
      <div id={'qty-' + product.id}>{props.qty}</div>
      <div id={'tprice-' + product.id}>{props.price * props.qty}</div>
    </div>
  );
};

export default Item;
