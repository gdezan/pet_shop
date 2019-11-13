import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { useForm } from "hooks";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import { UserContext } from "components/UserContext";

const getInt = str => str.match(/\d/g).join("");

const currencyMask = tmp => {
  if (!tmp || !tmp.match(/\d/g)) return "";
  tmp = getInt(tmp);
  tmp = tmp.replace(/^\D+/g, "").replace(/([0-9]{2})$/g, ",$1");
  if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

  return tmp;
};

const DiscountedPrice = ({ price, discount }) => {
  let disc = 0;
  if (price && !discount) {
    disc = getInt(price);
  } else if (price && discount) {
    disc = (getInt(price) * getInt(discount)) / 100;
  }
  console.log(disc);
  return (
    <div>
      <div>Preço com desconto</div>
      {currencyMask(disc)}
    </div>
  );
};

const AddProduct = () => {
  const [image, setImage] = useState(require("assets/img/profile.png"));
  const { setUser } = useContext(UserContext);

  const submit = () => {
    const { email, password, phone } = values;

    const body = {
      name: `${values.name} ${values.surname}`,
      email,
      password,
      phone,
      zip_code: values.cep,
      address: `${values.street}, ${values.addressnumber}, ${values.nbhood}, ${values.city}, ${values.state}`,
    };

    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(body),
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

  const { values, handleChange, handleSubmit, changeValues } = useForm(submit);

  return (
    <Wrapper id="registerProduct" onSubmit={handleSubmit}>
      <Title>Registro de produto</Title>
      <Img src={image} id="outputImg"></Img>
      <ImageField
        label={"Image"}
        id="inputImg"
        type="file"
        accept="image/*"
        onChange={event => setImage(URL.createObjectURL(event.target.files[0]))}
      />
      <Form>
        <FormRow>
          <TextField
            label="Nome do produto"
            id="name"
            name="name"
            type="text"
            lightBg
            value={values.name}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label="Preço"
            id="price"
            name="price"
            type="text"
            prepend="R$"
            lightBg
            value={currencyMask(values.price)}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label="Porcentagem de Desconto"
            id="discount"
            name="discount"
            type="text"
            lightBg
            prepend="%"
            value={values.discount}
            onChange={handleChange}
          />
          <Pusher />
          <DiscountedPrice price={values.price} discount={values.discount} />
        </FormRow>
      </Form>
      <Button
        type="submit"
        form="registerProduct"
        disabled={Object.keys(values).find(key => values[key] === "")}
      >
        CADASTRAR
      </Button>
    </Wrapper>
  );
};

export default AddProduct;

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
  text-align: left;
  margin-bottom: 50px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Img = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 130px;
  height: 130px;
  margin-bottom: 15px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
`;

const ImageField = styled.input`
  margin: 15px auto 30px;
  border: 1px solid #ddd;
  padding: 10px 15px;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  background-color: #f5f5f5;
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
