import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";

import ProductButton from "components/ProductButton";
import device from "assets/device";
import TextField from "base-components/TextField";
import { UserContext } from "components/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductList = ({ products, category, promotions, title }) => {
  const [search, setSearch] = useState("");
  const { user } = useContext(UserContext);

  return (
    <Wrapper promotions={promotions}>
      <Title promotions={promotions}>{title}</Title>
      {!promotions && (
        <SearchWrapper>
          <Icon icon={faSearch} />
          <TextField
            value={search}
            onChange={e => setSearch(e.target.value)}
            label="Pesquisar produto"
            lightBg
          />
        </SearchWrapper>
      )}
      <ProductsWrapper promotions={promotions}>
        {products
          .filter(product => {
            const inSearch =
              search === "" || product.name.toLowerCase().includes(search.toLowerCase());
            return inSearch;
          })
          .map(product => {
            return <ProductButton key={product._id} product={product} user={user} />;
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

const SearchWrapper = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 22px;
  margin-right: 15px;
`;
