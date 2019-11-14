import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "hooks";
import { masks, formatters } from "Utils";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import Select from "base-components/Select";

const AddProduct = () => {
  const [image, setImage] = useState({ image_url: require("assets/img/profile.png"), img: null });
  const [category, setCategory] = useState("Cachorro");

  const submit = () => {
    const { name, price, discountedPrice } = values;
    const body = {
      name,
      price: formatters.inputToPrice(price),
      discounted_price: formatters.inputToPrice(discountedPrice),
      category: category.id,
    };
    fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => window.location.reload())
      .catch(err => console.error(err));
  };

  const initialValues = {
    price: "",
    discountedPrice: "",
    name: "",
  };

  const categories = {
    Cachorro: { name: "Cachorro", id: "dog" },
    Gato: { name: "Gato", id: "cat" },
    "Outros Pets": { name: "Outros Pets", id: "other_pets" },
  };

  const { values, handleChange, handleSubmit } = useForm(submit, initialValues);
  return (
    <Wrapper id="registerProduct" onSubmit={handleSubmit}>
      <Title>Registro de produto</Title>
      <Img src={image.image_url} id="outputImg"></Img>
      <ImageField
        label={"Image"}
        id="inputImg"
        type="file"
        accept="image/*"
        onChange={event =>
          setImage({
            image_url: URL.createObjectURL(event.target.files[0]),
            img: event.target.files[0],
          })
        }
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
          <Select
            options={categories}
            value={category.name}
            onChange={e => {
              setCategory(categories[e.target.value]);
            }}
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
            value={masks.currency(values.price)}
            onChange={handleChange}
          />
        </FormRow>
        <FormRow>
          <TextField
            label="Preço com Desconto"
            id="discountedPrice"
            name="discountedPrice"
            type="text"
            lightBg
            prepend="R$"
            value={masks.currency(values.discountedPrice)}
            onChange={handleChange}
          />
        </FormRow>
      </Form>
      <Button
        type="submit"
        form="registerProduct"
        disabled={Object.keys(values).find(
          key => (key === "name" || key === "price") && values[key] === "",
        )}
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
