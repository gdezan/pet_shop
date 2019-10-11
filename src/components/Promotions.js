import React from "react";
import styled from "styled-components";

import ProductButton from "components/ProductButton";

const Promotions = () => {
  return (
    <PromotionsWrapper>
      <ProductButton img={require("assets/img/dog_food.png")} name="Ração XYZ" price="R$ 67.89" />
      <ProductButton img={require("assets/img/dog_food.png")} name="Ração XYZ" price="R$ 67.89" />
      <ProductButton img={require("assets/img/dog_food.png")} name="Ração XYZ" price="R$ 67.89" />
    </PromotionsWrapper>
  );
};

export default Promotions;

const PromotionsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.accent};
  box-sizing: border-box;
  padding: 50px 10px;
  display: flex;
  justify-content: space-around;
`;
