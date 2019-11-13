import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import cepPromise from "cep-promise";
import { useForm } from "hooks";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import { UserContext } from "components/UserContext";

const EditAccount = () => {
  const [image, setImage] = useState(require("assets/img/profile.png"));
  const { user, setUser } = useContext(UserContext);

  const submit = () => {
    const { password, phone } = values;

    const body = {
      id: user.id,
      name: `${values.name} ${values.surname}`,
      password,
      phone,
      zip_code: values.cep,
      address: `${values.street}, ${values.addressnumber}, ${values.nbhood}, ${values.city}, ${values.state}`,
    };

    fetch("/api/users/signup", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  const addressArr = user ? user.address.split(", ") : [];
  const initialValues = user
    ? {
        name: user.name.split(" ")[0],
        surname: user.name.split(" ")[1],
        phone: user.phone,
        password: "",
        cep: user.zip_code,
        street: addressArr[0],
        addressnumber: addressArr[1],
        nbhood: addressArr[2],
        city: addressArr[3],
        state: addressArr[4],
      }
    : {};

  const { values, handleChange, handleSubmit, changeValues } = useForm(submit, initialValues);

  const searchCep = () => {
    if (!values.cep) {
      return;
    }

    const cep = values.cep.replace(/\D/g, "");
    if (cep.length === 8) {
      cepPromise(cep).then(data => {
        const { street, neighborhood: nbhood, city, state } = data;
        changeValues({
          street,
          nbhood,
          city,
          state,
        });
      });
    }
  };

  return (
    <Wrapper id="update" onSubmit={handleSubmit}>
      <Title>Cadastre-se</Title>
      <Img src={image} id="outputImg"></Img>
      <ImageField
        label={"Image"}
        id="inputImg"
        type="file"
        accept="image/*"
        onChange={event => setImage(URL.createObjectURL(event.target.files[0]))}
      ></ImageField>
      <Form>
        <FormRow>
          <TextField
            label={"Nome"}
            id="name"
            name="name"
            type="text"
            lightBg
            value={values.name}
            onChange={handleChange}
          />
          <Pusher />
          <TextField
            label={"Sobrenome"}
            id="surname"
            name="surname"
            type="text"
            lightBg
            value={values.surname}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label={"Senha"}
            id="password"
            name="password"
            type="password"
            lightBg
            value={values.password}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label={"Telefone"}
            id="phone"
            name="phone"
            type="phone"
            lightBg
            value={values.phone}
            onChange={handleChange}
          />
          <Pusher />
          <TextField
            label={"CEP"}
            id="cep"
            name="cep"
            type="text"
            size="10"
            maxlength="9"
            lightBg
            value={values.cep}
            onChange={handleChange}
            onBlur={searchCep}
          />
        </FormRow>
        <FormRow>
          <TextField
            label={"Rua"}
            id="inputStreet"
            name="street"
            type="text"
            size="60"
            lightBg
            value={values.street}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label={"Bairro"}
            id="inputNBHood"
            name="nbhood"
            type="text"
            size="40"
            lightBg
            value={values.nbhood}
            onChange={handleChange}
          />
          <Pusher />
          <TextField
            label={"Número"}
            id="inputNum"
            name="addressnumber"
            type="text"
            lightBg
            value={values.addressnumber}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label={"Cidade"}
            id="inputCity"
            name="city"
            type="text"
            size="40"
            lightBg
            value={values.city}
            onChange={handleChange}
          />
          <Pusher />
          <TextField
            label={"Estado"}
            id="inputState"
            name="state"
            type="text"
            size="2"
            lightBg
            value={values.state}
            onChange={handleChange}
          />
        </FormRow>
      </Form>
      <Button
        type="submit"
        form="update"
        disabled={
          Object.keys(values).find(key => values[key] === "" && key !== "password") || false
        }
      >
        SALVAR
      </Button>
    </Wrapper>
  );
};

export default EditAccount;

const Wrapper = styled.form`
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

const Form = styled.div`
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
