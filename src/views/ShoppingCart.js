import React, { useState, useContext } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import Swal from "sweetalert2";

import Divider from "base-components/Divider";
import Button from "base-components/Button";
import CartList from "components/CartList";
import { CartContext } from "components/CartContext";
import { formatters } from "Utils";

const ShoppingCart = () => {
  const [total, setTotal] = useState(0);
  const { cartItems, setCartItems } = useContext(CartContext);

  const updateTotal = () => {
    let total = 0;
    let item;

    for (let i = 0; i < cartItems.length; ++i) {
      item = cartItems[i];
      total += item.quantity * (item.discountedPrice || item.price);
    }
    setTotal(total);
  };

  const handlePay = () => {
    Swal.fire("Compra completa", "Seu pagamento foi efetivado!", "success").then(() => {
      navigate("/");
      localStorage.removeItem("cartItems");
      setCartItems([]);
    });
  };

  return (
    <Wrapper>
      <Title>Meu Carrinho</Title>
      <Divider title="Produtos" />
      <CartList updateTotal={updateTotal} />
      <Divider title="Pagamento" />
      <Text>Total: {formatters.brl(total)}</Text>
      <Button onClick={() => handlePay()}>PAGAR</Button>
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

const Text = styled.div`
  text-align: left;
  width: 90%;
  margin: 15px 0 30px;
  font-size: 20px;
`;
