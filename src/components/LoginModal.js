import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "@reach/router";
import { useForm } from "hooks";
import SweetAlert from 'sweetalert2-react';

import Button from "base-components/Button";
import TextField from "base-components/TextField";
import { UserContext } from "components/UserContext";

const LoginModal = ({ isOpen, onLogin, toggleLogin }) => {
  const [wrongPW, setWrongPW] = useState(false);
  const { setUser } = useContext(UserContext);

  const submit = () => {
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })      
      .then(res => res.json())
      .then(data => {
        window.localStorage.setItem("authToken", data.authToken.token);
        setUser(data.user);
        onLogin();
      })
      .catch(err => {
        setWrongPW(true);
        toggleLogin();
        console.error(err);
      });
  };

  const { values, handleChange, handleSubmit } = useForm(submit);
  return (
    <LoginWrapper isOpen={isOpen} id="login" onSubmit={handleSubmit}>
      <Title>Faça aqui o seu login!</Title>
      <TextField
        label={"E-mail"}
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <TextField
        label={"Senha"}
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <StyledButton type="submit" form="login" disabled={!values.email || !values.password}>
        Login
      </StyledButton>
      <StyledLink to="forgot_password">Esqueceu a senha?</StyledLink>
      <StyledLink to="signup">Cadastre-se</StyledLink>
      <SweetAlert
        show={wrongPW}
        title="E-mail e/ou senha errados"
        text="Tente fazer seu login novamente."
        onConfirm={() => setWrongPW(false)}
      />
    </LoginWrapper>
  );
};

export default LoginModal;

const LoginWrapper = styled.form`
  position: fixed;
  z-index: 2500;
  top: 60px;
  right: 20px;
  background-color: ${props => props.theme.strong};
  padding: 5px 15px 15px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  transition: 0.15s all;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: hidden;
  ${props =>
    !props.isOpen
      ? css`
          transform: translateY(-30%);
        `
      : css`
          visibility: visible;
        `};
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
    color: ${props => props.theme.light};
    text-decoration: underline;
  }
`;
