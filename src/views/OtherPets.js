import React from "react";

import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const OtherPets = ({ pages }) => {
  const img = require("assets/img/other_pets.png");
  return (
    <>
      <MainBanner
        left={"100px"}
        imgMaxWid={"210px"} 
        imgMinWid={"200px"} 
        translateY={"3.5%"}
        img={img} 
        title={"Produtos para Outros Pets"} />
      <Promotions />
    </>
  );
};

export default OtherPets;
