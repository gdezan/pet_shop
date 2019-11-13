import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import SweetAlert from 'sweetalert2-react';

import Divider from "base-components/Divider";
import ProductList from "components/ProductList";

const ShoppingCart = () => {
  const [total,setTotal] = useState(0);
  const [pay,setPay] = useState(false);

  const updateTotal = () => {
    let localData = localStorage.getItem('cartItems');
    let cartItems = localData ? JSON.parse(localData) : [];

    let total = 0;
    let item;
    for(let i = 0; i < cartItems.length; ++i){
      item = cartItems[i];
      total += item.quantity * (item.discountedPrice ? (
        parseFloat(item.discountedPrice.replace(/^R\$\s/g,""))
      ) : (
        parseFloat(item.price.replace(/^R\$\s/g,""))
      ));
    }
    setTotal(total);
  };

  const handlePay = () => {
    setPay(true);
    localStorage.clear();
  };

  return (
    <Wrapper>
      <Title>Meu Carrinho</Title>
      <Divider title="Produtos" />
      <ProductList updateTotal={updateTotal} />
      <Divider title="Pagamento" />
      <Text>Total: {total.toFixed(2)}</Text>
      <Button to="/" onClick={handlePay}>PAGAR</Button>
      <SweetAlert
        show={pay}
        title="Pagamento concluído"
        text="Seu pagamento foi concluído com sucesso!"
        onConfirm={() => setPay(false)}
      />
    </Wrapper>
  );
};

export default ShoppingCart;

const Wrapper = styled.div`
  background-color: white;
  width: 90%;
  margin: 120px auto;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;
`;

const Title = styled.h1`
  width: 95%;
  text-align: left;
  margin: 0 0 10px;
`;

const Text = styled.p`
  text-align: left;
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled(Link)`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
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