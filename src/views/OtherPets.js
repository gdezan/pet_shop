import React from "react";

import MainBanner from "components/MainBanner";
import Promotions from "components/Promotions";

const OtherPets = ({ pages }) => {
  const img = require("assets/img/other_pets.png");
  return (
    <>
      <MainBanner
        imgStyle={{
          left: "100px",
          maxWidth: "210px",
          minWidth: "200px",
          transform: "translateY(3.5%)",
        }}
        img={img}
        title={"Produtos para Outros Pets"}
      />
      <Promotions />
    </>
  );
};

export default OtherPets;
