import React from "react";
import styled from "styled-components";

import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import DashboardButton from "components/DashboardButton";

const UserOptions = () => {
  return (
    <Wrapper>
      <DashboardButton title="Editar Conta" icon={faEdit} path="/edit_account" />
      <DashboardButton title="Adicionar pets" icon={faPlus} path="/signup_pet" />
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
