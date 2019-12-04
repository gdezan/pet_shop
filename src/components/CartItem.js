import React, { useContext } from "react";
import styled from "styled-components";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "components/CartContext";
import { formatters } from "Utils";

const CartItem = ({ product }) => {
  const { setCartItems } = useContext(CartContext);

  const handleClick = op => {
    let localData = localStorage.getItem("cartItems");
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;

    for (let i = 0; i < items.length && !found; ++i) {
      item = items[i];
      if (item.name === product.name) {
        if (op === "-") {
          items[i].quantity -= 1;
          if (items[i].quantity === 0) {
            items.splice(i, 1);
          }
        } else {
          items[i].quantity += 1;
        }
        found = true;
        setCartItems(items);
        localStorage.setItem("cartItems", JSON.stringify(items));
      }
    }
  };

  const { name, price, quantity, discountedPrice, imagePath } = product;
  const path = imagePath && require(`../${imagePath}`);
  const image = path ? path : require("assets/img/profile.png");

  return (
    <Wrapper>
      <Image src={image} alt={`{name} image`} />
      <Info>
        <Name>{name}</Name>
        <CountLine>
          <Price>{formatters.brl(discountedPrice || price)}</Price>
          <QuantityWrapper>
            <MinusButton onClick={() => handleClick("-")}>
              <FontAwesomeIcon icon={faMinusCircle} />
            </MinusButton>
            <Text>{quantity}</Text>
            <PlusButton onClick={() => handleClick("+")}>
              <FontAwesomeIcon icon={faPlusCircle} />
            </PlusButton>
          </QuantityWrapper>
        </CountLine>
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
  padding: 10px 15px;
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
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #555;
`;

const CountLine = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  justify-content: space-between;
  align-items: center;
`;

const QuantityWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
`;

const Text = styled.div`
  font-size: 20px;
  color: black;
  font-weight: bold;
  margin: 8px;
`;

const PlusButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  outline: none;
  height: 20px;
  display: flex;
  align-items: center;
  color: #5cb85c;
`;

const MinusButton = styled(PlusButton)`
  color: #d9534f;
`;
