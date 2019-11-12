import React, { useContext } from "react";
import styled from "styled-components";
import { Link, navigate } from "@reach/router";
import { useForm } from "hooks";

import Button from "base-components/Button";
import TextField from "base-components/TextField";
import { UserContext } from "components/UserContext";

const Login = () => {
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
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  const { values, handleChange, handleSubmit } = useForm(submit);

  return (
    <LoginForm id="login" onSubmit={handleSubmit}>
      <Title>Faça seu login na nossa loja!</Title>
      <TextField
        label={"E-mail"}
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        lightBg
      />
      <TextField
        label={"Senha"}
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        lightBg
      />
      <StyledButton type="submit" form="login" disabled={!values.email || !values.password}>
        Login
      </StyledButton>
      <StyledLink to="/forgot_password">Esqueceu sua senha?</StyledLink>
      <StyledLink to="/signup">Cadastre-se</StyledLink>
    </LoginForm>
  );
};

export default Login;

const LoginForm = styled.form`
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
