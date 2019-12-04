import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { navigate } from "@reach/router";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";

import Button from "base-components/Button";
import Divider from "base-components/Divider";
import Select from "base-components/Select";

import { UserContext } from "components/UserContext";

import device from "assets/device";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns/esm";

const SelectOptions = props => {
  return (
    <OptionsList>
      {props.options.map(option => (
        <OptionItem
          key={option._id}
          selected={props.selectedOption === option._id}
          onClick={() => props.onClick(option._id)}
        >
          <OptionImg
            alt={option.name}
            src={
              option.imagePath
                ? require(`../${option.imagePath}`)
                : require("assets/img/profile.png")
            }
          />
          <OptionDetails>
            <OptionName>{option.name}</OptionName>
            {props.type === "pets" && (
              <>
                <OptionLine>Raça: {option.breed}</OptionLine>
                <OptionLine>Idade: {option.age} anos</OptionLine>
              </>
            )}
            {props.type === "services" && (
              <OptionLine>R$ {(option.price / 100).toFixed(2)}</OptionLine>
            )}
          </OptionDetails>
        </OptionItem>
      ))}
    </OptionsList>
  );
};

const times = {};
for (let i = 9; i < 19; i++) {
  times[`${i}00`] = { name: `${i}:00` };
  times[`${i}30`] = { name: `${i}:30` };
}

const ScheduleService = () => {
  const [availableServices, setAvailableServices] = useState([]);
  const [date, setDate] = useState();
  const [schedule, setSchedule] = useState();
  const [time, setTime] = useState(900);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    fetch("api/services", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        setAvailableServices(data);
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });

    fetch("api/services/schedule", {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        data.sort((a, b) => a.service.date < b.service.date);
        setSchedule(data);
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    if (!date) {
      return Swal.fire("Erro", "Preencha uma data", "error");
    }
    const dateString = `${date[0].toISOString().slice(0, 11)}${times[time].name}:00`;
    const body = {
      date: dateString,
      serviceId: selectedService,
      petId: selectedPet,
    };

    fetch(`/api/users/${user._id}/schedule`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        setUser(data);
        Swal.fire({
          title: "Sucesso!",
          text: "Serviço agendado",
          icon: "success",
        }).then(() => {
          navigate("/user");
        });
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  };

  if (!availableServices.length) return null;

  let filteredTimes = times;
  if (date) {
    schedule.forEach(sc => {
      const scDate = new Date(sc.service.date);
      if (format(scDate, "yyyy-MM-dd") === format(new Date(date), "yyyy-MM-dd")) {
        delete filteredTimes[format(scDate, "Hmm")];
      }
    });
  }

  return (
    <Wrapper id="service" onSubmit={onSubmit}>
      <Title>Agendar serviço</Title>
      <Form>
        <Divider title="Selecione o serviço" />
        <FormRow>
          <SelectOptions
            options={availableServices}
            type="services"
            selectedOption={selectedService}
            onClick={id => setSelectedService(id)}
          />
        </FormRow>
        <Divider title="Selecione o seu pet" />
        <FormRow>
          <SelectOptions
            options={user.pets}
            type="pets"
            selectedOption={selectedPet}
            onClick={id => setSelectedPet(id)}
          />
        </FormRow>
        <Divider title="Selecione um dia" />
        <FormRow>
          <StyledFlatpickr
            value={date}
            onChange={date => setDate(date)}
            options={{
              dateFormat: "d/m/Y",
              minDate: new Date(),
              wrap: true,
            }}
          >
            <DateInput type="text" placeholder="Selecione um dia" data-input />

            <InputButton title="Calendário" data-toggle>
              <FontAwesomeIcon icon={faCalendar} />
            </InputButton>

            <InputButton title="Apagar" data-clear>
              <FontAwesomeIcon icon={faTrash} />
            </InputButton>
          </StyledFlatpickr>
        </FormRow>
        <Divider title="Selecione um horário" />
        <FormRow>
          <Select options={filteredTimes} value={time} onChange={e => setTime(e.target.value)} />
        </FormRow>
      </Form>
      <Button type="submit" form="service">
        AGENDAR
      </Button>
    </Wrapper>
  );
};

export default ScheduleService;

const Wrapper = styled.form`
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
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const FormRow = styled.div`
  display: flex;
  padding: 5px 0;
  width: 80%;
  @media ${device.tablet} {
    width: 100%;
  }
`;

const StyledFlatpickr = styled(Flatpickr)`
  display: flex;
  margin: 20px auto;
  width: 100%;
`;

const DateInput = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #999;
`;

const InputButton = styled.a`
  color: #666;
  border: 1px solid #999;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 50px;
  justify-content: center;
  margin-left: -1px;
  background-color: #eee;
  transition: 0.1s all;

  &:hover {
    color: #444;
    background-color: #f4f4f4;
  }
`;

const OptionsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 10px auto;
  grid-column-gap: 20px;

  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  margin: 10px 0;
  transition: 0.2s all;
  box-sizing: border-box;
  height: 100px;
  cursor: pointer;

  &:hover {
    ${props =>
      !props.selected &&
      css`
        transform: translateY(-3px) scale(1.005);
        box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.3);
      `}
  }

  ${props =>
    props.selected &&
    css`
      color: ${props => props.theme.strong};
      border: 2px solid ${props => props.theme.strong};
      background-color: ${props => props.theme.bg};
      transform: translateY(0) scale(0.995);
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0);
    `}
`;

const OptionDetails = styled.div`
  margin: 10px;
`;

const OptionImg = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 10px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const OptionName = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
`;

const OptionLine = styled.p`
  margin: 5px 0;
  font-size: 15px;
`;
