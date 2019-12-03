import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import device from "assets/device";

const Pet = ({ name, img, breed, age, services }) => {
  return (
    <PetWrapper>
      <Image src={require(`../${img}`)} alt="Pet image" />
      <Details>
        <PetName>{name}</PetName>
        <Text>Raça: {breed}</Text>
        <Text>Idade: {age} anos</Text>
        {services && services.length && (
          <>
            <Text>
              <FontAwesomeIcon icon={faClock} /> Serviços agendados:
            </Text>
            <ServicesWrapper>
              {services.map(s => (
                <Service key={s.id}>
                  {s.service} - {format(new Date(s.datetime), "dd/MM/yyyy - HH:mm")} ({s.price})
                </Service>
              ))}
            </ServicesWrapper>
          </>
        )}
      </Details>
    </PetWrapper>
  );
};

const PetList = ({ pets }) => {
  return (
    <PetListWrapper>
      {pets && pets.length ? (
        <>
          {pets.map(pet => (
            <Pet
              key={pet._id}
              name={pet.name}
              img={pet.imagePath}
              age={pet.age}
              breed={pet.breed}
              services={pet.scheduled_services}
            />
          ))}
        </>
      ) : (
        <></>
      )}
    </PetListWrapper>
  );
};

export default PetList;

const PetListWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 30px 10px;
`;

const PetWrapper = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  padding: 20px;
  margin: 0 10px 20px;
  border: 1px solid #aaa;
  border-radius: 5px;
  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
  }
`;

const Details = styled.div`
  margin-left: 30px;
  @media ${device.tablet} {
    width: 100%;
    margin-top: 30px;
  }
`;

const Image = styled.img`
  max-width: 150px;
  height: auto;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
`;

const Service = styled.li`
  margin: 0 0 10px;
`;

const PetName = styled.h2``;
const Text = styled.p``;
const ServicesWrapper = styled.ul``;
