import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { useForm } from "hooks";
import { masks, formatters } from "Utils";
import Swal from "sweetalert2";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import Select from "base-components/Select";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState({ _id: "noCat", name: "Sem Categoria" });

  useEffect(() => {
    fetch("/api/products/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        let cats = data.reduce((acc, cat) => {
          acc[cat._id] = cat;
          return acc;
        }, {});
        cats["noCat"] = { _id: "noCat", name: "Sem Categoria" };
        setCategories(cats);
      })
      .catch(err => Swal.fire("Erro", err.message, "error"));
  }, []);

  const submit = () => {
    const { name, price, discountedPrice } = values;

    const formData = new FormData();
    image && formData.append("image", image);

    const body = {
      name,
      price: formatters.inputToPrice(price),
      discountedPrice: formatters.inputToPrice(discountedPrice),
      ...(category._id !== "noCat" && { categoryId: category._id }),
    };

    Object.keys(body).forEach(key => body[key] && formData.append(key, body[key]));

    fetch("/api/products", {
      method: "POST",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        Swal.fire({
          title: "Sucesso!",
          text: "Produto cadastrado",
          icon: "success",
        }).then(() => {
          navigate("/admin");
        });
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  };

  const initialValues = {
    price: "",
    discountedPrice: "",
    name: "",
  };

  const { values, handleChange, handleSubmit } = useForm(submit, initialValues);

  if (!categories) return null;

  return (
    <Wrapper id="registerProduct" onSubmit={handleSubmit}>
      <Title>Registro de produto</Title>
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
            value={category._id}
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
      <Button type="submit" form="registerProduct">
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
