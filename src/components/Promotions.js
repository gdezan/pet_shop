import React from "react";
import styled from "styled-components";

import ProductButton from "components/ProductButton";

const Promotions = ({ productList }) => {
  if (!productList) {
    return null;
  }

  return (
    <PromotionsWrapper>
      <Title>Promoções!</Title>
      <ProductsWrapper>
        {productList.map((product, i) => {
          return (
            <ProductButton
              key={i}
              product={product}
            />
          );
        })}
      </ProductsWrapper>
    </PromotionsWrapper>
  );
};

export default Promotions;

const PromotionsWrapper = styled.div`
  width: 100%;
  background-color: ${props => props.theme.accent};
  box-sizing: border-box;
  padding: 50px 10px;
`;

const ProductsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Title = styled.h2`
  font-family: "Raleway", sans-serif;
  color: white;
  margin: 0 5% 40px;
  font-size: 30px;
`;
