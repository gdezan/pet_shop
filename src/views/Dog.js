import React, { useState, useEffect } from "react";

import MainBanner from "components/MainBanner";
import ProductList from "components/ProductList";

const Dog = ({ pages }) => {
  const img = require("assets/img/pug_photo.png");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/by_category/dog", {
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
      <MainBanner img={img} title={"Produtos para Cachorro"} />
      <ProductList products={products} title="Nosso produtos para o melhor amigo do homem!" />
    </>
  );
};

export default Dog;
