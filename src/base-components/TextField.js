import React from "react";
import styled from "styled-components";

const TextField = () => {
  return (
    <Label>
      <TextInput />
      <TextLabel>Label</TextLabel>
      <Border />
    </Label>
  );
};

export default TextField;

const Border = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background #0077FF;
  transform: scaleX(0);
  transform-origin: 0 0;
  transition: all .15s ease;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  -webkit-appearance: none;
  width: 100%;
  border: 0;
  font-family: inherit;
  padding: 12px 0;
  height: 48px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid #C8CCD4;
  background: none;
  border-radius: 0;
  color: #223254;
  transition: all .15s ease;

  &:hover {
    background: rgba(#223254,.03);
  }

  /* &:not(::placeholder-shown) {
    + span {
      color #5A667F;
      transform: translateY(-26px) scale(.75);
    }
  } */

  &:focus {
    background: none;
    outline: none;
    + span {
      color #0077FF;
      transform: translateY(-26px) scale(.75);
    }
    + {Border}
    transform: scaleX(1);
  }
`;

const TextLabel = styled.span`
  position: absolute;
  top: 16px;
  left: 0;
  font-size: 16px;
  color: #9098a9;
  font-weight: 500;
  transform-origin: 0 0;
  transition: all 0.2s ease;
`;

const Label = styled.label`
  position: relative;
  margin: auto;
  width: 100%;
  max-width: 280px;
`;
