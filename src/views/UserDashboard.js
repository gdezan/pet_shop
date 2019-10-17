import React from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";

const UserDashboard = () => {
  return (
    <Wrapper>
      <Title>Minha Conta</Title>
      <Divider title="Detalhes" />
      <Divider title="Opções" />
      <Divider title="Agendar um horário" />
      <Divider title="Meus pets" />
    </Wrapper>
  );
};

export default UserDashboard;

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
