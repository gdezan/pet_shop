import React from "react";
import styled, { css } from "styled-components";
import { Link } from "@reach/router";

import Button from "base-components/Button";
import TextField from "base-components/TextField";

const LoginModal = ({ isOpen }) => {
  return (
    <LoginWrapper isOpen={isOpen}>
      <Title>Faça aqui o seu login!</Title>
      <TextField label="E-Mail" id="email" dense />
      <TextField label="Password" type="password" id="password" dense />
      <StyledButton>Login</StyledButton>
      <StyledLink to="forgot_password">Esqueceu a senha?</StyledLink>
      <StyledLink to="signup">Cadastre-se</StyledLink>
    </LoginWrapper>
  );
};

export default LoginModal;

const LoginWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: ${props => props.theme.light};
  padding: 5px 15px 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  transition: 0.15s all;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  ${props =>
    !props.isOpen
      ? css`
          transform: translateY(-30%);
        `
      : ""};
`;

const Title = styled.h4`
  color: white;
  text-align: center;
  font-family: "Raleway", sans-serif;
`;

const StyledButton = styled(Button)`
  margin: 20px auto 10px;
  display: block;
`;

const StyledLink = styled(Link)`
  color: white;
  display: block;
  text-decoration: none;
  padding: 15px;
  transition: 0.2s all;
  text-align: center;
  padding: 10px;

  &:hover {
    color: ${props => props.theme.strong};
  }
`;
