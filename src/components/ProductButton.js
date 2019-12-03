import React, { useContext } from "react";
import styled, { css } from "styled-components";

import { CartContext } from "components/CartContext";
import { formatters } from "Utils";
import device from "assets/device";

const ProductButton = ({ product }) => {
  const { setCartItems } = useContext(CartContext);

  const handleClick = () => {
    let localData = localStorage.getItem("cartItems");
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;

    for (let i = 0; i < items.length && !found; ++i) {
      item = items[i];
      if (item.name === product.name) {
        items[i].quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems(items);
        found = true;
      }
    }
    if (!found) {
      product.quantity = 1;
      if (product.discounted_price) {
        items.push({
          name: product.name,
          img: product.img,
          price: product.price,
          discounted_price: product.discounted_price,
          quantity: product.quantity,
        });
      } else {
        items.push({
          name: product.name,
          img: product.img,
          price: product.price,
          quantity: product.quantity,
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(items));
      setCartItems(items);
    }
  };

  const { name, price, imagePath, discountedPrice } = product;

  if (discountedPrice) {
    return (
      <Wrapper onClick={() => handleClick()} discounted>
        <Image
          src={imagePath ? require(`../../${imagePath}`) : require("assets/img/profile.png")}
          alt={`${name} image`}
        />
        <Details>
          <Name>{name}</Name>
          <OldPrice>{formatters.brl(price)}</OldPrice>
          <DiscountedPrice>{formatters.brl(discountedPrice)}</DiscountedPrice>
        </Details>
      </Wrapper>
    );
  }

  return (
    <Wrapper onClick={() => handleClick()}>
      <Image
        src={imagePath ? require(`../../${imagePath}`) : require("assets/img/profile.png")}
        alt={`${name} image`}
      />
      <Details>
        <Name>{name}</Name>
        <Price>{formatters.brl(price)}</Price>
      </Details>
    </Wrapper>
  );
};

export default ProductButton;

const Wrapper = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  font-family: "Raleway", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.15s all;
  display: flex;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(1px);

    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.4);
  }

  ${props => !props.discounted && css``}

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media ${device.mobile} {
    width: 100px;
    height: 100px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 10px 20px 20px;
  width: 100%;

  @media ${device.tablet} {
    margin: 15px;
  }
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 23px;
  margin-top: 5px;

  @media ${device.tablet} {
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 20px;
  }
`;

const Price = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 21px;
  text-align: right;
  color: #555;

  @media ${device.tablet} {
    margin-top: 10px;
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 18px;
  }
`;

const DiscountedPrice = styled.div`
  display: inline-block;
  text-align: right;
  font-weight: 600;
  color: red;
  font-size: 23px;

  @media ${device.tablet} {
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 20px;
  }
`;

const OldPrice = styled.div`
  display: inline-block;
  text-align: right;
  font-size: 18px;
  color: gray;
  text-decoration: line-through;

  @media ${device.tablet} {
    margin-top: 10px;
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 15px;
  }
`;
