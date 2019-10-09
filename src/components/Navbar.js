import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import Button from "base-components/Button";
import LoginModal from "components/LoginModal";

const Navbar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <Nav>
        <PageLinks>
          <StyledLink to="/">Home</StyledLink>
          <StyledLink to="dog">Cachorro</StyledLink>
          <StyledLink to="cat">Gato</StyledLink>
          <StyledLink to="other_pets">Outros Pets</StyledLink>
          <StyledLink to="services">Serviços</StyledLink>
        </PageLinks>
        <UserLinks>
          <LoginButton onClick={() => setLoginModalOpen(!loginModalOpen)}>Login</LoginButton>
        </UserLinks>
      </Nav>
      <LoginModal isOpen={loginModalOpen} />
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

const StyledLink = styled(Link)`
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

const LoginButton = styled(Button)`
  margin: 0 10px 0 0;
  font-family: "Dosis", sans-serif;
`;
