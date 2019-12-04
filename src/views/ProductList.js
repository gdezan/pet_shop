import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatters } from "Utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import Divider from "base-components/Divider";
import TextField from "base-components/TextField";
import Button from "base-components/Button";
import ProductEditModal from "components/ProductEditModal";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [productToEdit, setProductToEdit] = useState();
  const [isModalOpen, setModalOpen] = useState(false);

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

    fetch("/api/products/categories", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setCategories(
          data.reduce((acc, cat) => {
            acc[cat._id] = cat;
            return acc;
          }, {}),
        );
      })
      .catch(err => console.error(err));
  }, []);

  if (!categories || !products) return null;

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
            <ProductWrapper key={product._id}>
              <Text bold>{product.name}</Text>
              <Text>Preço: {formatters.brl(product.price)}</Text>
              <Text>Quantidade em estoque: {product.qtyStock}</Text>
              <Text>Quantidade vendida: {product.qtySold}</Text>
              {product.discountedPrice ? (
                <Text>Preço com desconto: {formatters.brl(product.discountedPrice)}</Text>
              ) : (
                ""
              )}
              <LastLine>
                <Text>
                  Categoria:{" "}
                  {categories[product.categoryId]
                    ? categories[product.categoryId].name
                    : "Sem Categoria"}
                </Text>
                <StyledButton
                  onClick={() => {
                    setProductToEdit(product);
                    setModalOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </StyledButton>
              </LastLine>
            </ProductWrapper>
          ))}
      </ListWrapper>
      <ProductEditModal
        product={productToEdit}
        categories={{ ...categories, noCat: { _id: "noCat", name: "Sem Categoria" } }}
        isOpen={isModalOpen}
        onSuccess={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      />
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

const LastLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledButton = styled(Button)`
  font-size: 14px;
  text-transform: uppercase;
  background-color: #ddd;
  color: #222;
`;
