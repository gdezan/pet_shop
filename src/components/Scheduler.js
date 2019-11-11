import React, { useState } from "react";
import styled from "styled-components";
import Flatpickr from "flatpickr";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";

import Select from "base-components/Select";

const available_services = {
  0: { name: "Banho" },
  1: { name: "Tosa" },
  2: { name: "Vacinação" },
};

const Scheduler = () => {
  const [date, setDate] = useState();
  const [service, setService] = useState();

  return (
    <Wrapper>
      <TopRow>
        <ServiceSelection>
          <OptionTitle>Selecione o serviço</OptionTitle>
          <Select
            options={available_services}
            value={service}
            onChange={id => setService(available_services[id])}
          />
        </ServiceSelection>
      </TopRow>
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
    </Wrapper>
  );
};

export default Scheduler;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFlatpickr = styled(Flatpickr)`
  display: flex;
  width: 80%;
  margin: 20px 0;
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

const TopRow = styled.div``;
const ServiceSelection = styled.div``;
const OptionTitle = styled.div``;
