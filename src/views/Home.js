import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";
import ProductButton from "components/ProductButton";

const promotionList = [
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração X",
    price: "R$ 67.89",
    discounted_price: "29.99",
  },
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração Y",
    price: "67.89",
  },
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração Z",
    price: "67.89",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <MainBanner
        imgStyle={{ transform: "translateY(15%)" }}
        img={require("assets/img/banner_dog.png")}
        title={"Au Que Mia"}
        description="Produtos mágicos para o seu melhor amigo!"
      />
      <Promotions productList={promotionList} />
      <ProductsWrapper>
        {products.map(product => {
          return (
            <ProductButton
              key={product.id}
              product={{ ...product, img: require("assets/img/dog_food.png") }}
            />
          );
        })}
      </ProductsWrapper>
    </>
  );
};

export default Home;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 60%;
  margin: 40px auto;
`;
