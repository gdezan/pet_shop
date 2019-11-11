import React, { useState } from "react";
import styled from "styled-components";

import TextField from "base-components/TextField";
import Button from "base-components/Button";

const EditAccount = () => {
  const [image, setImage] = useState(require("assets/img/profile.png"));

  function pesquisaCEP(value) {
    let cep = document.getElementById(value).value;
    cep = cep.replace(/\D/g, "");
    let cepPromise = require("cep-promise");

    if(cep.length === 8){
      cepPromise(cep).then(data => {
        document.getElementById("inputStreet").value = data.street;
        document.getElementById("inputNBHood").value = data.neighborhood;
        document.getElementById("inputCity").value = data.city;
        document.getElementById("inputState").value = data.state;
      });
    }
  }

  return (
    <Wrapper>
      <Title>Edite sua conta</Title>
      <Img src={image} id="outputImg"></Img>
      <ImageField 
        label={"Image"} 
        id="inputImg" 
        type="file" 
        accept="image/*"
        onChange={event => setImage(URL.createObjectURL(event.target.files[0]))}>
      </ImageField>
      <Form>
        <FormRow>
          <TextField label={"Nome"} id="name" type="text" lightBg></TextField>
          <Pusher />
          <TextField label={"Sobrenome"} id="surname" type="text" lightBg></TextField>
        </FormRow>
        <FormRow>
          <TextField label={"E-mail"} id="email" type="email" lightBg></TextField>
          <Pusher />
          <TextField label={"Senha"} id="password" type="password" lightBg></TextField>
        </FormRow>
        <FormRow>
          <TextField label={"Telefone"} id="phone" type="phone" lightBg></TextField>
          <Pusher />
          <TextField 
            label={"CEP"} 
            id="cep" 
            type="text" 
            size="10"
            onChange={id => pesquisaCEP(id)}
            maxlength="9" lightBg>
          </TextField>
        </FormRow>
        <FormRow>
          <TextField label={"Rua"} id="inputStreet" type="text" size="60" lightBg></TextField>
        </FormRow>
        <FormRow>
          <TextField label={"Bairro"} id="inputNBHood" type="text" size="40" lightBg></TextField>
          <Pusher />
          <TextField label={"Número"} id="inputNum" type="text" lightBg></TextField>
        </FormRow>
        <FormRow>
          <TextField label={"Cidade"} id="inputCity" type="text" size="40" lightBg></TextField>
          <Pusher />
          <TextField label={"Estado"} id="inputState" type="text" size="2" lightBg></TextField>
        </FormRow>
      </Form>
      <Button>SALVAR</Button>
    </Wrapper>
  );
};

export default EditAccount;

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

const Img = styled.img`
  border: 3px solid #3c70a4;
  border-radius: 10px;
  width: 130px;
  height: 130px;
  margin-bottom: 15px;
`;

const ImageField = styled.input`
  margin: 15px 0;
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

const Pusher = styled.div`
  margin-right: 20px;
`;