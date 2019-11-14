import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Divider from "base-components/Divider";
import TextField from "base-components/TextField";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const categories = {
    dog: "Cachorro",
    cat: "Gato",
    other_pets: "Outros Pets",
  };

  return (
    <Wrapper>
      <Title>Consulta de Produtos</Title>
      <Divider title="Pesquisar" />
      <TextField value={search} onChange={e => setSearch(e.target.value)} label="Produto" lightBg />
      <Divider title={"Produtos"} />
      <ListWrapper>
        {products
          .filter(product => {
            const inSearch =
              search === "" || product.name.toLowerCase().includes(search.toLowerCase());
            return inSearch;
          })
          .map(product => (
            <ProductWrapper key={product.id}>
              <Text bold>{product.name}</Text>
              <Text>Preço: R${product.price}</Text>
              {product.discounted_price && (
                <Text>Preço com desconto: R${product.discounted_price}</Text>
              )}
              <Text>Categoria: {categories[product.category]}</Text>
            </ProductWrapper>
          ))}
      </ListWrapper>
    </Wrapper>
  );
};

export default ProductList;

const Wrapper = styled.div`
  background-color: white;
  width: 90%;
  margin: 120px auto;
  padding: 40px 30px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Raleway", sans-serif;
`;

const Title = styled.h1`
  width: 95%;
  text-align: left;
  margin: 0 0 10px;
`;

const ListWrapper = styled.div`
  width: 100%;
`;

const ProductWrapper = styled.div`
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px 10px;
`;

const Text = styled.p`
  font-size: 14px;
  margin: 10px;
  font-weight: ${props => (props.bold ? "bold" : "regular")};
`;
