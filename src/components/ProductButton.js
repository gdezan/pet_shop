import React, { useState } from "react";
import styled, { css } from "styled-components";

const ProductButton = ({ name, price, discountedPrice, img, cartItems, ...props }) => {
  const [quantity, setQuantity] = useState(0);

  const handleClick = () => {
    let included = false;
    let item;
    setQuantity(quantity + 1);
    for(let i = 0; i < cartItems.length && !included; ++i){
      item = cartItems[i];
      if(item.name === name){
        item.quantity = quantity + 1;
        included = true;
      }
    }
    if(!included){
      item = {name, price, discountedPrice, img, quantity};
      item.quantity = quantity + 1;
      cartItems.push(item);
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems));
  };
  
  if (discountedPrice) {
    return (
      <Wrapper onClick={handleClick} discounted>
        <Image src={img} alt={`{name} image`} />
        <Name>{name}</Name>
        <OldPrice>{price}</OldPrice>
        <DiscountedPrice>{discountedPrice}</DiscountedPrice>
      </Wrapper>
    );
  }

  return (
    <Wrapper onClick={handleClick}>
      <Image src={img} alt={`{name} image`} />
      <Name>{name}</Name>
      <Price>{price}</Price>
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
