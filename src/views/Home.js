import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import ProductList from "components/ProductList";

const promotionList = [
  {
    _id: "1e231e",
    name: "Ração X",
    price: "6789",
    discountedPrice: "2999",
  },
  {
    _id: "1sdfsdfdsf1e",
    name: "Ração Y",
    price: "6734",
  },
  {
    _id: "dsffsd31e",
    name: "Ração Z",
    price: "8890",
  },
  {
    _id: "1e2fdsfer1e",
    name: "ROLA",
    price: "420420",
    discountedPrice: "6969",
  },
];

const Home = () => {
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

  return (
    <>
      <MainBanner
        img={require("assets/img/banner_dog.png")}
        title={"Au Que Mia"}
        description="Produtos mágicos para o seu melhor amigo!"
      />
      <ProductList title="Promoções!" products={promotionList} promotions />
      <ProductList title="Nossos produtos" products={products} />
    </>
  );
};

export default Home;
