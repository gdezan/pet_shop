import React, { useContext } from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";

import UserOptions from "components/UserOptions";
import PetList from "components/PetList";
import Scheduler from "components/Scheduler";
import { UserContext } from "components/UserContext";

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
  const { user } = useContext(UserContext);

  if (!user) return null;

  const addressArr = user.address.split(", ");
  const client = {
    name: user.name,
    email: user.email,
    address: addressArr.slice(0, 3).join(", "),
    city: addressArr.slice(3, 5).join(", "),
  };

  return (
    <Wrapper>
      <Title>Minha Conta</Title>
      <Divider title="Detalhes" />
      <Details client={client} />
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
