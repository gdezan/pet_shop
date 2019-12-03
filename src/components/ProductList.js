import React from "react";
import styled, { css } from "styled-components";

import ProductButton from "components/ProductButton";
import device from "assets/device";

const ProductList = ({ products, category, promotions, title }) => {
  return (
    <Wrapper promotions={promotions}>
      <Title promotions={promotions}>{title}</Title>
      <ProductsWrapper promotions={promotions}>
        {products.map(product => {
          return <ProductButton key={product._id} product={product} />;
        })}
      </ProductsWrapper>
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 50px 10px;

  ${props =>
    props.promotions &&
    css`
      background-color: ${props => props.theme.accent};
    `}
`;

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr ${props => props.promotions && "1fr"};
  width: 90%;
  margin: 40px auto;

  @media ${device.laptop} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const Title = styled.h2`
  font-family: "Raleway", sans-serif;
  margin: 0 5% 40px;
  font-size: 30px;

  ${props =>
    props.promotions &&
    css`
      color: white;
    `}
`;
