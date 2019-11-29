import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "@reach/router";
import { useForm } from "hooks";
import Swal from "sweetalert2";

import Button from "base-components/Button";
import TextField from "base-components/TextField";
import { UserContext } from "components/UserContext";

const LoginModal = ({ isOpen, onLogin, toggleLogin }) => {
  const { setUser } = useContext(UserContext);

  const submit = () => {
    fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw data;
        window.localStorage.setItem("authToken", data.session._id);
        setUser(data.user);
        onLogin();
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
        toggleLogin();
      });
  };

  const { values, handleChange, handleSubmit } = useForm(submit);
  return (
    <LoginWrapper isOpen={isOpen} id="login_modal" onSubmit={handleSubmit}>
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
      <StyledButton type="submit" form="login_modal" disabled={!values.email || !values.password}>
        Login
      </StyledButton>
      <StyledLink to="forgot_password">Esqueceu a senha?</StyledLink>
      <StyledLink to="signup">Cadastre-se</StyledLink>
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
