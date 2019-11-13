import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { CartContext } from "components/CartContext";

const ProductButton = ({ product }) => {
  const { setCartItems } = useContext(CartContext);

  const handleClick = () => {
    let localData = localStorage.getItem('cartItems');
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;
    
    for(let i = 0; i < items.length && !found; ++i){
      item = items[i];
      if(item.name === product.name){
        items[i].quantity += 1;
        localStorage.setItem('cartItems',JSON.stringify(items));
        setCartItems(items);
        found = true;
      }
    }
    if(!found) {
      product.quantity = 1;
      if(product.discountedPrice){
        items.push({ 
          name: product.name,
          img: product.img,
          price: product.price,
          discountedPrice: product.discountedPrice,
          quantity: product.quantity,
        });
      }else {
        items.push({ 
          name: product.name,
          img: product.img,
          price: product.price,
          quantity: product.quantity,
        });
      }
      localStorage.setItem('cartItems',JSON.stringify(items));
      setCartItems(items);
    }
  };
  
  if (product.discountedPrice) {
    return (
      <Wrapper onClick={() => handleClick()} discounted>
        <Image src={product.img} alt={`{name} image`} />
        <Name>{product.name}</Name>
        <OldPrice>{product.price}</OldPrice>
        <DiscountedPrice>{product.discountedPrice}</DiscountedPrice>
      </Wrapper>
    );
  }

  return (
    <Wrapper onClick={() => handleClick()}>
      <Image src={product.img} alt={`{name} image`} />
      <Name>{product.name}</Name>
      <Price>{product.price}</Price>
    </Wrapper>
  );
};

export default ProductButton;

const Wrapper = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  max-width: 180px;
  font-family: "Raleway", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.15s all;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
  }

  ${props =>
    !props.discounted &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `}
`;

const Image = styled.img`
  width: 100%;
`;

const Name = styled.div`
  margin: 30px 0 10px;
  font-weight: 600;
  font-size: 20px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 21px;
  color: #555;
`;

const DiscountedPrice = styled.div`
  font-weight: 600;
  color: red;
  font-size: 23px;
`;

const OldPrice = styled.div`
  font-size: 18px;
  color: gray;
  text-decoration: line-through;
`;
