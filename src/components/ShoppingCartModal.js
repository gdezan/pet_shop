import React from "react";
import styled, { css } from "styled-components";

import CartItem from "components/CartItem";

const ShoppingCartModal = ({ isOpen }) => {
  const localData = localStorage.getItem('cartItems');
  const cartItems = localData ? JSON.parse(localData) : [];

  return (
    <Wrapper isOpen={isOpen}>
      <Title>Carrinho</Title>
      {cartItems.length ? (
        <ItemsWrapper>
          {cartItems.map(product => {
            return(
              <CartItem
                img={product.img}
                name={product.name}
                price={product.price}
                discountedPrice={product.discountedPrice}
                quantity={product.quantity}
              />
            );
          })}
        </ItemsWrapper>
      ) : (
        <P>Seu carrinho está vazio!</P>
      )}
    </Wrapper>
  );
};

export default ShoppingCartModal;

const Wrapper = styled.div`
  position: absolute;
  max-width: 150px;
  max-height: 250px;
  z-index: 2500;
  top: 60px;
  right: 20px;
  background-color: ${props => props.theme.strong};
  padding: 5px 15px 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  transition: 0.15s all;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: hidden;
  overflow-y: auto;
  ${props =>
    !props.isOpen
      ? css`
          transform: translateY(-30%);
        `
      : css`
          visibility: visible;
        `};
`;

const Title = styled.h4`
  color: white;
  text-align: center;
  font-family: "Raleway", sans-serif;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const P = styled.p`
  font-size: 12px;
  text-align: center;
  color: white;
  font-family: "Raleway", sans-serif;
`;