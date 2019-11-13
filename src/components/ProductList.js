import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Product = ({ product, cartItems, updateCart }) => {
  const decQuant = () => {
    let item;
    
    for(let i = 0; i < cartItems.length; ++i){
      item = cartItems[i];
      if(item.name === product.name){
        updateCart(product.quantity, "-", i);
      }
    }
  };

  const incQuant = () => {
    let item;

    for(let i = 0; i < cartItems.length; ++i){
      item = cartItems[i];
      if(item.name === product.name){
        updateCart(product.quantity, "+", i);
      }
    }
  };

  return (
    <ProductWrapper>
      <Image src={product.img} alt="Pet image" />
      <Details>
        <ProductName>{product.name}</ProductName>
        <Text>Preço: {product.discountedPrice ? product.discountedPrice : product.price}</Text>
        <QuantityWrapper>
          Quantidade: 
          <MinusButton onClick={decQuant}><FontAwesomeIcon icon={faMinusCircle} /></MinusButton>
          <Text>{product.quantity}</Text>
          <PlusButton onClick={incQuant}><FontAwesomeIcon icon={faPlusCircle} /></PlusButton>
        </QuantityWrapper>
      </Details>
    </ProductWrapper>
  );
};

const ProductList = ({ updateTotal }) => {
  let localData = localStorage.getItem('cartItems');
  let cartItems = localData ? JSON.parse(localData) : [];

  const [products,setProducts] = useState(cartItems);

  const updateCart = (quant, op, i) => {
    localData = localStorage.getItem('cartItems');
    cartItems = localData ? JSON.parse(localData) : [];

    if(op === "-"){
      cartItems[i].quantity = quant - 1;
      if(cartItems[i].quantity === 0){
        cartItems.splice(i, 1);
      }
    } else {
      cartItems[i].quantity = quant + 1;
    }
    setProducts(cartItems);
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  };

  useEffect(() => {
    updateTotal();
  });

  return (
    <>
      {products.length ? (
        <ProductListWrapper>
          {products.map(product => (
            <Product
              product={product}
              cartItems={products}
              updateCart={updateCart}
            />
          ))}
        </ProductListWrapper>
      ) : (
        <Text>Seu carrinho está vazio!</Text>
      )}
    </>
  );
};

export default ProductList;

const ProductListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ProductWrapper = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  padding: 20px;
  margin: 0 10px 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
`;

const Details = styled.div`
  margin-left: 30px;
`;

const Image = styled.img`
  width: 20%;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
`;

const ProductName = styled.h2``;
const Text = styled.p`
  text-align: left;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const QuantityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  aligns-items: center;
  margin: 5px 0;
`;

const PlusButton = styled.button`
  cursor: pointer;
  font-size: 10px; 
  margin: 0 3px;
  outline: none;
`;

const MinusButton = styled(PlusButton)`
`;