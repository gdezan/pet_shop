import React from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";

import UserOptions from "components/UserOptions";
import PetList from "components/PetList";
import Scheduler from "components/Scheduler";

const test_client = {
  name: "João da Silva",
  email: "joaodasilva@gmail.com",
  address: "Endereço: Rua das Flores, 123",
  city: "São Carlos, São Paulo",
  profile_img: require("assets/img/default_profile.jpg"),
};

const pets = [
  {
    id: 0,
    name: "Spike",
    breed: "Golden Retriever",
    age: 7,
    scheduled_services: [
      { id: 0, service: "Banho", datetime: "2019-10-21T13:00:00Z", price: "R$ 20,00" },
      { id: 1, service: "Tosa", datetime: "2019-10-21T14:00:00Z", price: "R$ 15,00" },
    ],
    img: require("assets/img/golden.jpg"),
  },
];

const Details = ({ client }) => {
  return (
    <DetailsWrapper>
      <DetailsText>
        <DetailsLine>Nome: {client.name}</DetailsLine>
        <DetailsLine>E-Mail: {client.email}</DetailsLine>
        <DetailsLine>Endereço: {client.address}</DetailsLine>
        <DetailsLine>{client.city}</DetailsLine>
      </DetailsText>
      <DetailsImage src={client.profile_img} alt="Profile Picture" />
    </DetailsWrapper>
  );
};

const UserDashboard = () => {
  return (
    <Wrapper>
      <Title>Minha Conta</Title>
      <Divider title="Detalhes" />
      <Details client={test_client} />
      <Divider title="Opções" />
      <UserOptions />
      <Divider title="Agendar um serviço" />
      <Scheduler />
      <Divider title="Meus pets" />
      <PetList pets={pets} />
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

const DetailsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  padding: 20px 50px;
`;
const DetailsText = styled.div``;
const DetailsLine = styled.p``;
const DetailsImage = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 150px;
`;
