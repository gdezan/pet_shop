import React, { useState, useContext } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { useForm } from "hooks";
import Swal from "sweetalert2";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import { UserContext } from "components/UserContext";

const SignUpPet = () => {
  const [image, setImage] = useState(null);
  const { user } = useContext(UserContext);

  const submit = () => {
    const { name, breed, age } = values;
    console.log(values);
    if (!name || !breed || !age) {
      return Swal.fire("Erro", "Preencha todos os campos", "error");
    }

    const formData = new FormData();
    image && formData.append("image", image);

    const body = { name, breed, age };

    Object.keys(body).forEach(
      key => body[key] && body[key].length && formData.append(key, body[key]),
    );

    fetch(`/api/users/${user._id}/pets`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw data;
        Swal.fire({
          title: "Sucesso!",
          text: "Pet cadastrado",
          icon: "success",
        }).then(() => {
          navigate("/user");
        });
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  };

  const { values, handleChange, handleSubmit } = useForm(submit);

  return (
    <Wrapper id="signup_pet" onSubmit={handleSubmit}>
      <Title>Cadastre seu pet</Title>
      <Img
        src={(image && URL.createObjectURL(image)) || require("assets/img/profile.png")}
        id="outputImg"
      />
      <ImageField
        abel={"Image"}
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
            label={"Nome"}
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
            label={"Raça"}
            id="breed"
            name="breed"
            type="text"
            lightBg
            value={values.breed || ""}
            onChange={handleChange}
          />
          <Pusher />
          <TextField
            label={"Idade (Anos)"}
            id="age"
            name="age"
            type="number"
            min="0"
            max="25"
            value={values.age || ""}
            onChange={handleChange}
            lightBg
          />
        </FormRow>
      </Form>
      <Button type="submit" form="signup_pet">
        CADASTRAR
      </Button>
    </Wrapper>
  );
};

export default SignUpPet;

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
