import React, { useState, useEffect } from "react";
// import { Link } from "@reach/router";

// import Button from "base-components/Button";
import MainBanner from "components/MainBanner";
import ProductList from "components/ProductList";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [promotionList, setPromotionList] = useState([]);

  useEffect(() => {
    fetch("/api/products", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);

        let promo = [];
        let i = 0;
        while (promo.length < 4) {
          if (data[i].discountedPrice !== data[i].price && data[i].discountedPrice > 0) {
            promo.push(data[i]);
          }
          i++;
        }
        setPromotionList(promo);
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
