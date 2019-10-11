import React from "react";
// import styled from "styled-components";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const Dog = () => {
  const img = require("assets/img/pug_photo.png");
  return (
    <>
      <MainBanner img={img} title={"Produtos para Cachorro"} />
      <Promotions />
    </>
  );
};

export default Dog;
