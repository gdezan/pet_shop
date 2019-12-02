import React from "react";
import styled from "styled-components";

import {
  faUserCog,
  faUsers,
  faShoppingCart,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus, faClock, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";

import Divider from "base-components/Divider";
import DashboardButton from "components/DashboardButton";

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
      </AdminOptions>
      {/* <Divider title="Serviços" />
      <AdminOptions>
      <DashboardButton title="Criar Serviço" icon={faPlus} path="/" />
      <DashboardButton title="Agendar Serviço" icon={faClock} path="/" />
      <DashboardButton title="Liberar Horário" icon={faTrash} path="/" />
      <DashboardButton title="Calendário" icon={faCalendarAlt} path="/" />
    </AdminOptions> */}
      <Divider title="Produtos" />
      <AdminOptions>
        <DashboardButton title="Registrar Produtos" icon={faShoppingCart} path="/add_product" />
        {/* <DashboardButton title="Registrar Serviço" icon={faPlus} path="/" />
        <DashboardButton title="Editar Produto" icon={faEdit} path="/" />
        <DashboardButton title="Remover Produto" icon={faTrash} path="/" /> */}
        <DashboardButton title="Consultar" icon={faSearch} path="/product_list" />
      </AdminOptions>
    </Wrapper>
  );
};

export default AdminDashboard;

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

const AdminOptions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  padding: 15px 0;
`;
