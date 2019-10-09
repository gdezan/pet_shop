import React from "react";
import styled from "styled-components";

const Button = props => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.button`
  cursor: pointer;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  color: white;
  font-family: "Raleway", sans-serif;
  transition: 0.15s all;
  background-color: ${props => props.theme.accent};
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
  border-radius: 8px;

  &:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
  }

  &:active {
    filter: brightness(0.9);
  }
`;
