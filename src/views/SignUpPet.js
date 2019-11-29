import React, { useState } from "react";
import styled from "styled-components";
import SweetAlert from "sweetalert2-react";
import { navigate } from "@reach/router";

import TextField from "base-components/TextField";
import Button from "base-components/Button";

const SignUpPet = () => {
  const [postImg, setImg] = useState(require("assets/img/profile.png"));
  const [postName, setName] = useState("");
  const [postRace, setRace] = useState("");
  const [postAge, setAge] = useState("");
  const [signedPet, setSignedPet] = useState(false);

  const getFile = e => {
    let reader = new FileReader();
    reader.readAsDataURL(e[0]);
    reader.onload = e => {
      setImg(reader.result);
    };
  };

  // const submit = e => {
  //   e.preventDefault();
  //   if(postImg !== "" && postName !== "" && postRace !== "" && postAge !== ""){
  //     let post = {
  //       img: postImg,
  //       name: postName,
  //       race: postRace,
  //       age: postAge,
  //       scheduled_services: []
  //     };
  //     setSignedPet(true);
  //     navigate("/user");
  //   }
  // };

  return (
    <Wrapper>
      <Title>Cadastre seu pet</Title>
      <Img src={postImg} id="outputImg"></Img>
      <ImageField
        label={"Image"}
        id="inputImg"
        type="file"
        accept="image/*"
        onChange={e => getFile(e.target.files)}
      ></ImageField>
      <Form>
        <FormRow>
          <TextField
            onChange={e => setName(e.target.value)}
            label={"Nome"}
            id="name"
            type="text"
            lightBg
          ></TextField>
        </FormRow>
        <FormRow>
          <TextField
            onChange={e => setRace(e.target.value)}
            label={"Raça"}
            id="race"
            type="text"
            lightBg
          ></TextField>
          <Pusher />
          <TextField
            onChange={e => setAge(e.target.value)}
            label={"Idade"}
            id="age"
            type="number"
            min="1"
            max="200"
            lightBg
          ></TextField>
        </FormRow>
      </Form>
      {/* <Button onClick={e => submit(e)}>CADASTRAR</Button> */}
      <SweetAlert
        show={signedPet}
        title="Pet cadastrado"
        text="Seu pet foi cadastrado com sucesso!"
        onConfirm={() => setSignedPet(false)}
      />
    </Wrapper>
  );
};

export default SignUpPet;

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
