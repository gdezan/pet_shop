import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

const Pet = ({ name, img, breed, age, services }) => {
  return (
    <PetWrapper>
      <Image src={img} alt="Pet image" />
      <Details>
        <PetName>{name}</PetName>
        <Text>Raça: {breed}</Text>
        <Text>Idade: {age} anos</Text>
        <Text>
          <FontAwesomeIcon icon={faClock} /> Serviços agendados:
        </Text>
        <ServicesWrapper>
          {services.length ? (
            <>
              {services.map(s => (
                <Service key={s.id}>
                  {s.service} - {format(new Date(s.datetime), "dd/MM/yyyy - HH:mm")} ({s.price})
                </Service>
              ))}
            </>
          ) : (
            <></>
          )}
        </ServicesWrapper>
      </Details>
    </PetWrapper>
  );
};

const PetList = ({ pets }) => {
  return (
    <PetListWrapper>
      {pets.length ? (
        <>
          {pets.map(pet => (
            <Pet
              key={pet.id}
              name={pet.name}
              img={pet.img}
              age={pet.age}
              breed={pet.race}
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
`;

const Details = styled.div`
  margin-left: 30px;
`;

const Image = styled.img`
  height: 200px;
  width: 200px;
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
