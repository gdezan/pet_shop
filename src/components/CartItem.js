import React, { useContext } from "react";
import styled from "styled-components";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "components/CartContext";

const CartItem = ({ product }) => {
  const { setCartItems } = useContext(CartContext);

  const handleClick = (op) => {
    let localData = localStorage.getItem('cartItems');
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;
    
    for(let i = 0; i < items.length && !found; ++i){
      item = items[i];
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

  if (product.discountedPrice) {
    return (
      <Wrapper discounted>
        <Image src={product.img} alt={`{name} image`} />
        <Info>
          <Name>{product.name}</Name>
          <OldPrice>{product.price}</OldPrice>
          <DiscountedPrice>{product.discountedPrice}</DiscountedPrice>
          <QuantityWrapper>
            <MinusButton onClick={() => handleClick("-")}><FontAwesomeIcon icon={faMinusCircle} /></MinusButton>
            <Text>{product.quantity}</Text>
            <PlusButton onClick={() => handleClick("+")}><FontAwesomeIcon icon={faPlusCircle} /></PlusButton>
          </QuantityWrapper>
        </Info>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image src={product.img} alt={`{name} image`} />
      <Info>
        <Name>{product.name}</Name>
        <Price>{product.price}</Price>
        <QuantityWrapper>
          <MinusButton onClick={() => handleClick("-")}><FontAwesomeIcon icon={faMinusCircle} /></MinusButton>
          <Text>{product.quantity}</Text>
          <PlusButton onClick={() => handleClick("+")}><FontAwesomeIcon icon={faPlusCircle} /></PlusButton>
        </QuantityWrapper>
      </Info>
    </Wrapper>
  );
};

export default CartItem;

const Wrapper = styled.div`
  background-color: white;
  margin: 5px;
  border-radius: 8px;
  width: 100%;
  font-family: "Raleway", sans-serif;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Image = styled.img`
  width: 50%;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 10px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 11px;
  color: #555;
`;

const DiscountedPrice = styled.div`
  font-weight: 600;
  color: red;
  font-size: 11px;
`;

const OldPrice = styled.div`
  font-size: 8px;
  color: gray;
  text-decoration: line-through;
`;

const QuantityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  aligns-items: space-between;
`;

const Text = styled.div`
  font-size: 10px;
  color: black;
  font-weight: bold;
  margin: 3px;
`;

const PlusButton = styled.button`
  cursor: pointer;
  font-size: 10px;
  outline: none;
`;

const MinusButton = styled(PlusButton)``;
