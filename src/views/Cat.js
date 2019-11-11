import React from "react";

import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const Cat = () => {
  const img = require("assets/img/cat_photo.png");
  return (
    <>
      <MainBanner translateY={"1%"} img={img} title={"Produtos para Gato"} />
      <Promotions />
    </>
  );
};

export default Cat;
