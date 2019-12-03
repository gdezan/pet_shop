import React, { useState, useEffect } from "react";

import MainBanner from "components/MainBanner";
import ProductList from "components/ProductList";

const OtherPets = ({ pages }) => {
  const img = require("assets/img/other_pets.png");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/by_category/other_pets", {
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
      <MainBanner img={img} title={"Produtos para Outros Pets"} />
      <ProductList products={products} title="Nosso produtos para os pets mais variados!" />
    </>
  );
};

export default OtherPets;
