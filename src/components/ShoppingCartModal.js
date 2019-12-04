import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "@reach/router";

import CartItem from "components/CartItem";
import { CartContext } from "components/CartContext";

const ShoppingCartModal = ({ toggleCart, isOpen }) => {
  const { cartItems } = useContext(CartContext);

  return (
    <Wrapper isOpen={isOpen}>
      <Title>Carrinho</Title>
      {cartItems.length ? (
        <CartWrapper>
          <ItemsWrapper>
            {cartItems.map((product, i) => {
              return <CartItem key={i} product={product} />;
            })}
          </ItemsWrapper>
          <Button onClick={() => toggleCart()} to="shopping_cart">
            PAGAR
          </Button>
        </CartWrapper>
      ) : (
        <P>Seu carrinho está vazio!</P>
      )}
    </Wrapper>
  );
};

export default ShoppingCartModal;

const Wrapper = styled.div`
  position: fixed;
  width: 40vw;
  max-height: 60vh;
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

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h4`
  color: white;
  text-align: center;
  font-family: "Raleway", sans-serif;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const P = styled.p`
  font-size: 12px;
  text-align: center;
  color: white;
  font-family: "Raleway", sans-serif;
`;

const Button = styled(Link)`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  width: 60px;
  color: white;
  font-family: "Raleway", sans-serif;
  transition: 0.15s all;
  background-color: ${props => props.theme.accent};
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  }

  &:active {
    filter: brightness(0.9);
  }
`;
