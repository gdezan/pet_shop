import React, { useState, useContext } from "react";
import styled from "styled-components";
import Flatpickr from "react-flatpickr";

import Button from "base-components/Button";
import Select from "base-components/Select";
import { UserContext } from "components/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  const [type, setType] = useState("Banho");
  const [date, setDate] = useState();
  const { user } = useContext(UserContext);

  const onSubmit = () => {
    const body = {
      type,
      scheduled: date.toISOString(),
      user_id: user.id,
    };
    console.log(1);
    // fetch("/api/services", {
    //   method: "POST",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then(res => res.json())
    //   // .then(data => window.location.reload())
    //   .catch(err => console.error(err));
  };

  const types = {
    Banho: { name: "Banho", id: "bath" },
    Tosa: { name: "Tosa", id: "shearing" },
    Vacinação: { name: "Vacinação", id: "vaccine" },
  };

  return (
    <Wrapper id="service" onSubmit={onSubmit}>
      <Title>Agendar serviço</Title>
      <Form>
        <FormRow>
          <Select
            options={types}
            value={types.name}
            onChange={e => {
              setType(types[e.target.value]);
            }}
          />
        </FormRow>
        <FormRow>
          <StyledFlatpickr
            value={date}
            onChange={date => setDate(date)}
            options={{
              dateFormat: "d/m/Y - H:i",
              minDate: new Date(),
              wrap: true,
              enableTime: true,
              time_24hr: true,
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
      </Form>
      <Button type="submit" form="service">
        AGENDAR
      </Button>
    </Wrapper>
  );
};

export default AddProduct;

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
  margin-bottom: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  width: 80%;
  padding: 5px 0;
`;

const StyledFlatpickr = styled(Flatpickr)`
  display: flex;
  width: 80%;
  margin: 20px auto;
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
