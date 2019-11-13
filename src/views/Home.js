import React from "react";
// import styled from "styled-components";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const promotionList = [
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração X",
    price: "R$ 67.89",
    discountedPrice: "R$ 29.99",
  },
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração Y",
    price: "R$ 67.89",
  },
  {
    img: require("assets/img/dog_food.png"),
    name: "Ração Z",
    price: "R$ 67.89",
  },
];

const Home = () => {
  return (
    <>
      <MainBanner
        imgStyle={{ transform: "translateY(15%)" }}
        img={require("assets/img/banner_dog.png")}
        title={"Au Que Mia"}
        description="Produtos mágicos para o seu melhor amigo!"
      />
      <Promotions productList={promotionList} />
    </>
  );
};

export default Home;
