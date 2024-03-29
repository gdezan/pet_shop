import React, { useState } from "react";
import styled, { css } from "styled-components";
import device from "assets/device";

const TextField = props => {
  const [active, setActive] = useState(props.locked && props.focused);
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState(props.error);
  const [label] = useState(props.label);

  const onChange = event => {
    const value = event.target.value;
    setValue(value);
    setError("");
  };

  const retActive = props.locked ? active : active || value;
  return (
    <Field active={retActive} locked={props.locked} lightBg={props.lightBg}>
      {props.prepend && <Prepend>{props.prepend}</Prepend>}
      <Input
        lightBg={props.lightBg}
        id={props.id}
        name={props.name}
        active={props.locked ? active : active || value}
        type={props.type}
        value={props.value !== undefined ? props.value : value}
        placeholder={label}
        onChange={props.onChange || onChange}
        onFocus={() => !props.locked && setActive(true)}
        onBlur={() => {
          !props.locked && setActive(false);
          props.onBlur();
        }}
      />
      <Label
        prepend={props.prepend}
        htmlFor={props.id}
        active={retActive}
        error={error}
        lightBg={props.lightBg}
      >
        {error || label}
      </Label>
    </Field>
  );
};

TextField.defaultProps = {
  locked: false,
  focussed: false,
  error: "",
  label: "",
  type: "text",
  onChange: null,
  onBlur: () => "",
};

export default TextField;

const Field = styled.div`
  font-family: "Raleway";
  width: 100%;
  height: 46px;
  margin: 10px 0;
  border-radius: 4px;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
  border-radius: 4px;
  overflow: hidden;
  display: flex;

  &:hover {
    ${props =>
      !props.active &&
      css`
        background-color: rgba(255, 255, 255, 0.45);
      `}
    ${props =>
      props.lightBg &&
      css`
        background-color: rgba(0, 0, 0, 0.02);
      `};
  }

  ${props => (props.locked && !props.active ? "pointer-events: none;" : "")};
  ${props =>
    props.active &&
    css`
      background-color: #ffffff;
    `};
  ${props =>
    props.lightBg &&
    css`
      background-color: rgba(0, 0, 0, 0.05);
    `};

  @media ${device.mobile} {
    margin: 6px 0;
    height: 38px;
  }
`;

const Input = styled.input.attrs(props => ({ type: props.type }))`
  height: 46px;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;

  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  ${props =>
    props.lightBg &&
    css`
      ::placeholder {
        color: ${props => props.theme.text.dark};
      }
      color: ${props => props.theme.text.dark};
      border-bottom: 1px solid #ddd;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.39), 0 -1px 1px #fff, 0 1px 0 #fff;
    `};

  ${props =>
    props.active &&
    css`
      padding: 23px 16px 7px 16px;
      ::placeholder {
        opacity: 0;
      }
    `};

  @media ${device.mobile} {
    font-size: 12px;
    padding: 0 12px;
  }
`;

const Label = styled.label`
  font-family: "Raleway";
  position: absolute;
  top: 24px;
  left: ${props => (props.prepend ? 56 : 16)}px;
  font-size: 10px;
  font-weight: 600;
  line-height: 24px;
  color: #ffffff;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s all ease-in-out;

  ${props => (props.error ? "color: #ec392f;" : "")};

  ${props =>
    props.active &&
    css`
      top: 0px;
      opacity: 1;
      color: #512da8;
    `}
`;

const Prepend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: 2px solid #ccc;
  padding: 5px;
  width: 40px;
  @media ${device.mobile} {
    font-size: 12px;
    padding: 2px;
    width: 35px;
  }
`;
