import React from "react";
import styled from "styled-components";

const ProductButton = ({ name, price, discountedPrice, img, ...props }) => {
  return (
    <Wrapper>
      <Image src={img} alt={`{name} image`} />
      <Name>{name}</Name>
      <Price>{price}</Price>
    </Wrapper>
  );
};

export default ProductButton;

const Wrapper = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  max-width: 180px;
  font-family: "Raleway", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.15s all;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Name = styled.div`
  margin: 30px 0 10px;
  font-weight: 600;
  font-size: 20px;
`;

const Price = styled.div`
  font-weight: 600;
  color: red;
  font-size: 23px;
`;
