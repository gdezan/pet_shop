import React, { useEffect, useContext } from "react";
import styled from "styled-components";

import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "components/CartContext";
import { formatters } from "Utils";
import device from "assets/device";

const Product = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { name, price, imagePath, discountedPrice } = product;
  const image = imagePath && require(`../${imagePath}`);

  const handleClick = op => {
    let localData = localStorage.getItem("cartItems");
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;

    for (let i = 0; i < cartItems.length && !found; ++i) {
      item = cartItems[i];
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

  return (
    <ProductWrapper>
      <Image src={image} alt="Product image" />
      <Details>
        <ProductName>{name}</ProductName>
        <Text>Preço: {formatters.brl(discountedPrice || price)}</Text>
        <QuantityWrapper>
          <Text>Quantidade:</Text>
          <MinusButton onClick={() => handleClick("-")}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </MinusButton>
          <Text>{product.quantity}</Text>
          <PlusButton onClick={() => handleClick("+")}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </PlusButton>
        </QuantityWrapper>
      </Details>
    </ProductWrapper>
  );
};

const CartList = ({ updateTotal }) => {
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    updateTotal();
  });

  return (
    <>
      {cartItems.length ? (
        <CartListWrapper>
          {cartItems.map(product => (
            <Product key={product._id} product={product} />
          ))}
        </CartListWrapper>
      ) : (
        <Text>Seu carrinho está vazio!</Text>
      )}
    </>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 10px;
`;

const ProductWrapper = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  padding: 20px;
  margin: 0 10px 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  align-items: center;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const Details = styled.div`
  margin-left: 30px;
  @media ${device.tablet} {
    margin: 0;
  }
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }

  @media ${device.mobile} {
    width: 80px;
    height: 80px;
  }
`;

const ProductName = styled.h3` @media {device.tablet} {
  font-size: 15px;
}`;
const Text = styled.p`
  text-align: left;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 18px;

  @media ${device.tablet} {
    font-size: 15px;
  }
`;

const QuantityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px 0;
`;

const PlusButton = styled.button`
  cursor: pointer;
  font-size: 12px;
  outline: none;
  height: 18px;
  display: flex;
  align-items: center;
  color: #5cb85c;
  margin-left: 10px;
`;

const MinusButton = styled(PlusButton)`
  color: #d9534f;
  margin-right: 10px;
`;
