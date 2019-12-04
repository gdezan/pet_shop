import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { navigate } from "@reach/router";
import Swal from "sweetalert2";

import { CartContext } from "components/CartContext";
import { formatters } from "Utils";
import device from "assets/device";

const ProductButton = ({ product, user }) => {
  const { setCartItems } = useContext(CartContext);

  const addToCart = () => {
    let localData = localStorage.getItem("cartItems");
    let items = localData ? JSON.parse(localData) : [];
    let item;
    let found = false;

    for (let i = 0; i < items.length && !found; ++i) {
      item = items[i];
      if (item.name === product.name) {
        items[i].quantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(items));
        setCartItems(items);
        found = true;
      }
    }
    if (!found) {
      product.quantity = 1;
      items.push({
        _id: product._id,
        name: product.name,
        imagePath: product.imagePath,
        price: product.price,
        ...(discountedPrice && { discountedPrice: product.discountedPrice }),
        quantity: product.quantity,
      });
      localStorage.setItem("cartItems", JSON.stringify(items));
      setCartItems(items);
    }
  };

  const handleClick = () => {
    if (!user) {
      return Swal.fire({
        title: "Sem usuário!",
        text:
          "Você precisa fazer o login ou se cadastrar para poder adicionar um item ao seu carrinho",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Fazer Login",
        cancelButtonText: "Cancelar",
      }).then(result => {
        navigate("/login");
      });
    }

    Swal.fire({
      title: "Adicionar item ao carrinho?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Adicionar",
      cancelButtonText: "Cancelar",
    }).then(result => {
      addToCart();
      if (result.value) {
        Swal.fire("Adicionado", "Seu produto foi adicionado ao carrinho", "success");
      }
    });
    return;
  };

  const { name, price, imagePath, discountedPrice } = product;
  const image = imagePath && require(`../${imagePath}`);

  if (discountedPrice) {
    return (
      <Wrapper onClick={() => handleClick()} discounted>
        <Image src={image ? image : require("assets/img/profile.png")} alt={`${name} image`} />
        <Details>
          <Name>{name}</Name>
          <OldPrice>{formatters.brl(price)}</OldPrice>
          <DiscountedPrice>{formatters.brl(discountedPrice)}</DiscountedPrice>
        </Details>
      </Wrapper>
    );
  }

  return (
    <Wrapper onClick={() => handleClick()}>
      <Image src={image ? image : require("assets/img/profile.png")} alt={`${name} image`} />
      <Details>
        <Name>{name}</Name>
        <Price>{formatters.brl(price)}</Price>
      </Details>
    </Wrapper>
  );
};

export default ProductButton;

const Wrapper = styled.div`
  background-color: white;
  margin: 10px;
  border-radius: 8px;
  font-family: "Raleway", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 3px 4px 1px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.15s all;
  display: flex;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(1px);

    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.4);
  }

  ${props => !props.discounted && css``}

  @media ${device.tablet} {
    padding: 10px;
    flex-direction: column;
    align-items: center;
  }
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media ${device.tablet} {
    width: 100px;
    height: 100px;
  }

  @media ${device.mobile} {
    width: 80px;
    height: 80px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px 10px 20px 20px;
  width: 100%;

  @media ${device.tablet} {
    margin: 15px;
  }
`;

const Name = styled.div`
  font-size: 16px;
  margin-top: 5px;

  @media ${device.tablet} {
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 14px;
  }
`;

const Price = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 19px;
  text-align: right;
  color: #555;

  @media ${device.tablet} {
    margin-top: 10px;
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 17px;
  }
`;

const DiscountedPrice = styled.div`
  display: inline-block;
  text-align: right;
  font-weight: 600;
  color: red;
  font-size: 19px;

  @media ${device.tablet} {
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 17px;
  }
`;

const OldPrice = styled.div`
  display: inline-block;
  text-align: right;
  font-size: 15px;
  color: gray;
  text-decoration: line-through;

  @media ${device.tablet} {
    margin-top: 10px;
    display: block;
    text-align: center;
  }

  @media ${device.mobile} {
    font-size: 13px;
  }
`;
