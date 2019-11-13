import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext }  from "components/CartContext";

const Product = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const handleClick = (op) => {
    let localData = localStorage.getItem('cartItems');
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;
    
    for(let i = 0; i < cartItems.length && !found; ++i){
      item = cartItems[i];
      if(item.name === product.name){
        if(op === "-"){
          items[i].quantity -= 1;
          if(items[i].quantity === 0){
            items.splice(i, 1);
          }
        } else {
          items[i].quantity += 1;
        }
        found = true;
        setCartItems(items);
        localStorage.setItem('cartItems',JSON.stringify(items));
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
          <MinusButton onClick={() => handleClick("-")}><FontAwesomeIcon icon={faMinusCircle} /></MinusButton>
          <Text>{product.quantity}</Text>
          <PlusButton onClick={() => handleClick("+")}><FontAwesomeIcon icon={faPlusCircle} /></PlusButton>
        </QuantityWrapper>
      </Details>
    </ProductWrapper>
  );
};

const ProductList = ({ updateTotal }) => {
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    updateTotal();
  });

  return (
    <>
      {cartItems.length ? (
        <ProductListWrapper>
          {cartItems.map(product => (
            <Product
              product={product}
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