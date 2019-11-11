import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import Button from "base-components/Button";
import TextField from "base-components/TextField";

const Login = () => {
  return (
    <LoginWrapper>
      <Title>Faça seu login na nossa loja!</Title>
      <TextField label={"E-mail"} id="email" lightBg />
      <TextField label={"Senha"} type="password" id="password" lightBg />
      <StyledButton>Login</StyledButton>
      <StyledLink to="forgot_password">Esqueceu sua senha?</StyledLink>
      <StyledLink to="signup">Cadastre-se</StyledLink>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  width: 90%;
  background-color: white;
  margin: 120px auto;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin: 30px 0;
  font-size: 20px;
  border-radius: 5px;
  padding: 10px 20px;
`;

const Title = styled.h1`
  font-family: "Raleway", sans-serif;
  color: ${props => props.theme.text.dark};
  margin-bottom: 35px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.text.dark};
  display: block;
  text-decoration: none;
  padding: 15px;
  transition: 0.2s all;
  text-align: center;
  padding: 10px;

  &:hover {
    color: ${props => props.theme.light};
    text-decoration: underline;
  }
`;
