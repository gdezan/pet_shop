import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { masks, formatters } from "Utils";
import Swal from "sweetalert2";

import TextField from "base-components/TextField";
import Button from "base-components/Button";
import Select from "base-components/Select";

const ProductEditModal = ({ isOpen, product, categories, ...props }) => {
  const [image, setImage] = useState(null);
  const [imageWasChanged, setImageWasChanged] = useState(null);
  const [category, setCategory] = useState(categories["noCat"]);
  const [values, setValues] = useState({});

  const onChange = event => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const onCancel = () => {
    props.onCancel();
    setImageWasChanged(false);
    setImage(null);
  };

  const onSubmit = event => {
    event.preventDefault();
    const { name, price, discountedPrice, qtyStock } = values;

    const formData = new FormData();
    if (imageWasChanged) {
      image && formData.append("image", image);
    }

    const body = {
      name,
      price: formatters.inputToPrice(price),
      discountedPrice: formatters.inputToPrice(discountedPrice || "0"),
      ...(category._id !== "noCat" && { categoryId: category._id }),
      qtyStock,
    };

    Object.keys(body).forEach(key => body[key] && formData.append(key, body[key]));

    fetch(`/api/products/${product._id}`, {
      method: "PUT",
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) throw data;
        Swal.fire({
          title: "Sucesso!",
          text: "Produto editado",
          icon: "success",
        }).then(() => {
          props.onSuccess();
          window.location.reload();
        });
      })
      .catch(err => {
        Swal.fire("Erro", err.message, "error");
      });
  };

  useEffect(() => {
    if (product) {
      setCategory(product.categoryId ? categories[product.categoryId] : categories["noCat"]);
      setValues({
        price: product.price.toString(),
        discountedPrice: product.discountedPrice.toString() || "",
        name: product.name,
        qtyStock: product.qtyStock,
      });
    }
  }, [categories, product]);

  return (
    <Wrapper isOpen={isOpen}>
      <Form id="editProduct" onSubmit={onSubmit} isOpen={isOpen}>
        {product && (
          <>
            <Title>Editar produto</Title>
            <Img
              src={
                image
                  ? URL.createObjectURL(image)
                  : product.imagePath
                  ? require(`../${product.imagePath}`)
                  : require("assets/img/profile.png")
              }
              id="outputImg"
            />
            <ImageField
              label={"Image"}
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={event => {
                setImage(event.target.files[0]);
                setImageWasChanged(true);
              }}
            />
            <FormLines>
              <FormRow>
                <TextField
                  label="Nome do produto"
                  id="name"
                  name="name"
                  type="text"
                  lightBg
                  value={values.name || ""}
                  onChange={onChange}
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
                  value={masks.currency(values.price || "")}
                  onChange={onChange}
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
                  value={masks.currency(values.discountedPrice || "")}
                  onChange={onChange}
                />
              </FormRow>
              <FormRow>
                <TextField
                  label="Quantidade em estoque"
                  id="qtyStock"
                  name="qtyStock"
                  type="number"
                  lightBg
                  value={values.qtyStock || ""}
                  onChange={onChange}
                />
              </FormRow>
            </FormLines>
            <FormRow>
              <CancelButton form="no" onClick={onCancel}>
                CANCELAR
              </CancelButton>
              <Button type="submit" form="editProduct">
                CADASTRAR
              </Button>
            </FormRow>
          </>
        )}
      </Form>
    </Wrapper>
  );
};

export default ProductEditModal;

const Form = styled.form`
  background-color: white;
  width: 80%;
  padding: 15px 5px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;

  transition: all 0.2s;
  position: fixed;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
  transition: all 0.2s;
  position: fixed;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  z-index: ${props => (props.isOpen ? 2 : -1)};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
`;

const Title = styled.h2`
  width: 95%;
  text-align: left;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Img = styled.img`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 3px;
  width: 80px;
  height: 80px;
  margin-bottom: 5px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
`;

const ImageField = styled.input`
  margin: 15px auto 15px;
  border: 1px solid #ddd;
  padding: 8px 10px;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  width: 80%;
  background-color: #f5f5f5;
`;

const FormLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
`;

const CancelButton = styled(Button)`
  background-color: #c10000;
`;
