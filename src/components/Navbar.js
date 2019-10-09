import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "@reach/router";

import { size } from "assets/device";

import Button from "base-components/Button";
import LoginModal from "components/LoginModal";

const Navbar = props => {
  const [isMobile, setMobile] = useState(window.innerWidth < parseInt(size.tablet));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [sideMenuOpen, setSideMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < parseInt(size.tablet) && !isMobile) {
        setMobile(true);
      } else if (window.innerWidth > parseInt(size.tablet) && isMobile) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
  }, [isMobile]);

  const renderLinks = (pages, isMobile = false) => {
    const RenderedLink = isMobile ? MobileLink : StyledLink;
    return pages.map(page => (
      <RenderedLink key={page.name} to={page.path}>
        {page.name}
      </RenderedLink>
    ));
  };

  if (isMobile) {
    return (
      <>
        <Nav>
          <Button onClick={() => setSideMenu(true)}>=</Button>
        </Nav>
        <SideMenu isOpen={sideMenuOpen}>
          <Button onClick={() => setSideMenu(false)}>{"<-"}</Button>
          <LinksWrapper>
            <PageLinks isMobile>{renderLinks(props.pages, true)}</PageLinks>
            <UserLinks>
              <LoginButton onClick={() => setLoginModalOpen(!loginModalOpen)}>Login</LoginButton>
            </UserLinks>
          </LinksWrapper>
        </SideMenu>
        <Pusher />
        <LoginModal isOpen={loginModalOpen} />
      </>
    );
  }

  return (
    <>
      <Nav>
        <PageLinks>{renderLinks(props.pages)}</PageLinks>
        <UserLinks>
          <LoginButton onClick={() => setLoginModalOpen(!loginModalOpen)}>Login</LoginButton>
        </UserLinks>
      </Nav>
      <Pusher />
      <LoginModal isOpen={loginModalOpen} />
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  font-family: "Dosis", sans-serif;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.3);
  background-color: ${props => props.theme.strong};
  padding: 0;
  color: white;
  display: flex;
  justify-content: space-between;
`;

const Pusher = styled.div`
  margin-bottom: 45px;
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

const MobileLink = styled(StyledLink)`
  padding: 20px 70px 20px 20px;
  font-family: "Raleway", sans-serif;
  border-bottom: 1px solid ${props => props.theme.light};
`;

const PageLinks = styled.div`
  ${props =>
    props.isMobile &&
    css`
      display: flex;
      flex-direction: column;
    `}
`;

const UserLinks = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled(Button)`
  margin: 0 10px 0 0;
  font-family: "Dosis", sans-serif;
`;

const SideMenu = styled.div`
  height: 100%;
  position: fixed;
  z-index: 2000;
  left: 0;
  top: 0;
  background-color: ${props => props.theme.strong};
  box-shadow: 5px 0px 5px 2px rgba(0, 0, 0, 0.6);
  transition: 0.3s transform ease-in-out;
  transform: translateX(-120%);
  display: flex;
  flex-direction: column;

  ${props =>
    props.isOpen &&
    css`
      transform: translateX(0);
    `}
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex-grow: 1;
`;
