import React from "react";
import styled from "styled-components";

const Select = ({ options, value, onChange }) => {
  return (
    <SelectInput value={value} onChange={onChange}>
      {Object.keys(options).map(id => (
        <Option key={id} value={id}>
          {options[id].name}
        </Option>
      ))}
    </SelectInput>
  );
};

export default Select;

const SelectInput = styled.select`
  width: 100%;
  margin: 10px;
  padding: 10px;
  background-color: white;
`;
const Option = styled.option`
  padding: 10px;
`;
