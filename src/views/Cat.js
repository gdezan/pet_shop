import React, { useState, useEffect } from "react";

import MainBanner from "components/MainBanner";
import ProductList from "components/ProductList";

const Cat = ({ pages }) => {
  const img = require("assets/img/cat_photo.png");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products/by_category/cat", {
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
      <MainBanner img={img} title={"Produtos para Gatos"} />
      <ProductList products={products} title="Nosso produtos para seu companheiro felino!" />
    </>
  );
};

export default Cat;
