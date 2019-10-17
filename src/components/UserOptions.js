import React from "react";
import styled from "styled-components";

import { faShoppingCart, faPlus, faClock, faEdit } from "@fortawesome/free-solid-svg-icons";

import DashboardButton from "components/DashboardButton";

const UserOptions = () => {
  return (
    <Wrapper>
      <DashboardButton title="Agendar um horário" icon={faClock} href="#" />
      <DashboardButton title="Editar Conta" icon={faEdit} href="#" />
      <DashboardButton title="Comprar produtos" icon={faShoppingCart} href="#" />
      <DashboardButton title="Adicionar pets" icon={faPlus} href="#" />
    </Wrapper>
  );
};

export default UserOptions;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  padding: 15px 0;
`;
