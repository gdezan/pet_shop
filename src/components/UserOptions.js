import React from "react";
import styled from "styled-components";

import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

import DashboardButton from "components/DashboardButton";
import device from "assets/device";

const UserOptions = () => {
  return (
    <Wrapper>
      <DashboardButton title="Editar Conta" icon={faEdit} path="/edit_account" />
      <DashboardButton title="Adicionar pets" icon={faPlus} path="/signup_pet" />
      <DashboardButton title="Agendar um serviço" icon={faPlus} path="/schedule_service" />
    </Wrapper>
  );
};

export default UserOptions;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  padding: 15px 0;
  grid-template-columns: 1fr 1fr;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
