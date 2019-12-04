import React from "react";
import styled from "styled-components";

import {
  faUserCog,
  faUsers,
  faShoppingCart,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Divider from "base-components/Divider";
import DashboardButton from "components/DashboardButton";
import ScheduledServices from "components/ScheduledServices";
import device from "assets/device";

const AdminDashboard = () => {
  return (
    <Wrapper>
      <Title>Painel de Controle Administrativo</Title>
      <Divider title="Registros" />
      <AdminOptions>
        <DashboardButton title="Exibir administradores" icon={faUserCog} path="/admin_list" />
        <DashboardButton title="Exibir usuários" icon={faUsers} path="/user_list" />
        <DashboardButton title="Registrar Produtos" icon={faShoppingCart} path="/add_product" />
        <DashboardButton title="Criar Serviço" icon={faCalendarAlt} path="/create_service" />
        <DashboardButton title="Editar Produtos" icon={faEdit} path="/product_list" />
      </AdminOptions>

      <Divider title="Serviços Agendados" />
      <ScheduledServices />
    </Wrapper>
  );
};

export default AdminDashboard;

const AdminOptions = styled.div`
  display: grid;
  width: 100%;
  padding: 15px 0;
  grid-template-columns: 1fr 1fr;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

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
