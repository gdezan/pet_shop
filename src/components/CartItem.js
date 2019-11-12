import React from "react";
import styled from "styled-components";

import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartItem = ({ name, price, discountedPrice, img, quantity, ...props }) => {
  if (discountedPrice) {
    return (
      <Wrapper discounted>
        <Image src={img} alt={`{name} image`} />
        <Info>
          <Name>{name}</Name>
          <OldPrice>{price}</OldPrice>
          <DiscountedPrice>{discountedPrice}</DiscountedPrice>
          <QuantityWrapper>
            <MinusButton><FontAwesomeIcon icon={faMinus} /></MinusButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <PlusButton><FontAwesomeIcon icon={faPlus} /></PlusButton>
          </QuantityWrapper>
        </Info>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Image src={img} alt={`{name} image`} />
      <Info>
        <Name>{name}</Name>
        <Price>{price}</Price>
        <QuantityWrapper>
          <MinusButton><FontAwesomeIcon icon={faMinus} /></MinusButton>
          <QuantityDisplay>{quantity}</QuantityDisplay>
          <PlusButton><FontAwesomeIcon icon={faPlus} /></PlusButton>
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

const QuantityDisplay = styled.div`
  font-size: 10px;
  color: black;
  font-weight: bold;
  margin: 3px;
`;

const PlusButton = styled.button`
  cursor: pointer;
  font-size: 10px;  
`;

const MinusButton = styled(PlusButton)``;
