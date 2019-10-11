import React from "react";
// import styled from "styled-components";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const Home = () => {
  return (
    <>
      <MainBanner
        img={require("assets/img/banner_dog.png")}
        title={"Au Que Mia"}
        description="Produtos mágicos para o seu melhor amigo!"
      />
      <Promotions />
    </>
  );
};

export default Home;
