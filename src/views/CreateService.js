import React, { useState } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { useForm } from "hooks";
import Swal from "sweetalert2";
import { masks, formatters } from "Utils";

import device from "assets/device";

import TextField from "base-components/TextField";
import Button from "base-components/Button";

const CreateService = () => {
  const [image, setImage] = useState(null);

  const submit = () => {
    const { name, price } = values;

    const formData = new FormData();
    image && formData.append("image", image);

    const body = { name, price: formatters.inputToPrice(price) };
    console.log(body);

    Object.keys(body).forEach(key => body[key] && formData.append(key, body[key]));

    fetch("/api/services", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        Swal.fire({
          title: "Sucesso!",
          text: "Servico cadastrado",
          icon: "success",
        }).then(() => {
          navigate("/admin");
        });
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  };

  const { values, handleChange, handleSubmit } = useForm(submit);
  return (
    <Wrapper id="create_service" onSubmit={handleSubmit}>
      <Title>Criação de Serviço</Title>
      <Img
        src={(image && URL.createObjectURL(image)) || require("assets/img/profile.png")}
        id="outputImg"
      />
      <ImageField
        label={"Image"}
        id="inputImg"
        type="file"
        accept="image/*"
        onChange={event => {
          setImage(event.target.files[0]);
        }}
      />
      <Form>
        <FormRow>
          <TextField
            label={"Nome do Serviço"}
            id="name"
            name="name"
            type="text"
            lightBg
            value={values.name || ""}
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
            value={masks.currency(values.price || "")}
            onChange={handleChange}
          />
        </FormRow>
      </Form>
      <Button
        type="submit"
        form="create_service"
        disabled={Object.keys(values).find(key => values[key] === "")}
      >
        CADASTRAR
      </Button>
    </Wrapper>
  );
};

export default CreateService;

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
  @media ${device.tablet} {
    width: 100%;
  }
`;
