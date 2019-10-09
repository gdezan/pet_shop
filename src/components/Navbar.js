import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import TextField from "base-components/TextField";

const LoginModal = ({ isOpen }) => {
  return (
    <LoginWrapper>
      <TextField label={"foo"} id="1" />
    </LoginWrapper>
  );
};

const Navbar = () => {
  return (
    <>
      <Nav>
        <PageLinks>
          <SLink to="/">Home</SLink>
          <SLink to="dog">Cachorro</SLink>
          <SLink to="cat">Gato</SLink>
          <SLink to="other_pets">Outros Pets</SLink>
          <SLink to="services">Serviços</SLink>
        </PageLinks>
        <UserLinks>
          <LoginButton>Login</LoginButton>
        </UserLinks>
      </Nav>
      <LoginModal />
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  font-family: "Dosis", sans-serif;
  position: fixed;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.strong};
  padding: 0;
  color: white;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const SLink = styled(Link)`
  color: white;
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  transition: 0.3s all;

  &:hover {
    background-color: ${props => props.theme.accent};
  }
`;

const PageLinks = styled.div``;

const UserLinks = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
  text-decoration: none;
  color: white;
  font-family: "Dosis", sans-serif;
  transition: 0.3s all;

  &:hover {
    background-color: ${props => props.theme.accent};
  }
`;

const LoginWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 40px;
  background-color: red;
`;
