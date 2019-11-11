import React from "react";
import styled from "styled-components";

import TextField from "base-components/TextField";
import Button from "base-components/Button";

const ForgotPW = () => {
  return (
    <Wrapper>
      <Title>Esqueceu sua senha?</Title>
      <P>
        Insira o e-mail que você usou no cadastro. Nós mandaremos um e-mail com
        um link para você redefinir sua senha.
      </P>
      <Form>
        <FormRow>
          <TextField label={"E-mail"} id="email" type="email" lightBg></TextField>
        </FormRow>
      </Form>
      <Button>ENVIAR</Button>
    </Wrapper>
  );
};

export default ForgotPW;

const Wrapper = styled.div`
  background-color: white;
  width: 90%;
  margin: 120px auto;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;
`;

const Title = styled.h1`
  width: 95%;
  text-align: center;
  margin: 0 0 10px;
`;

const P = styled.p`
  width: 95%;
  text-align: center;
  margin: 0 0 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  width: 80%;
  padding: 5px 0;
`;