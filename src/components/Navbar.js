import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link, navigate, globalHistory } from "@reach/router";

import { size } from "assets/device";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars } from "@fortawesome/free-solid-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { objectToQueryString } from "Utils";

import Button from "base-components/Button";
import LoginModal from "components/LoginModal";
import ShoppingCartModal from "components/ShoppingCartModal";
import { UserContext } from "components/UserContext";
import { CartContext } from "components/CartContext";

const pages = [
  { name: "Home", path: "/" },
  { name: "Cachorro", path: "dog_products" },
  { name: "Gato", path: "cat_products" },
  { name: "Outros Pets", path: "other_products" },
];

const Navbar = props => {
  const [isMobile, setMobile] = useState(window.innerWidth < parseInt(size.tablet));
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [shoppingCartOpen, setShoppingCartOpen] = useState(false);
  const [sideMenuOpen, setSideMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < parseInt(size.tablet) && !isMobile) {
        setMobile(true);
      } else if (window.innerWidth > parseInt(size.tablet) && isMobile) {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        setLoginModalOpen(false);
      }
    });
  }, [isMobile]);

  const logout = () => {
    const params = { token: window.localStorage.getItem("authToken") };
    fetch(`/api/users/logout?${objectToQueryString(params)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then(res => {
        window.localStorage.removeItem("authToken");
        setUser(null);
        navigate("/");
      })
      .catch(err => console.error(err));
  };

  const renderLinks = (pages, isMobile = false) => {
    const RenderedLink = isMobile ? MobileLink : StyledLink;
    return pages.map((page, index) => (
      <RenderedLink
        key={page.name}
        onClick={() => setSideMenu(false)}
        to={page.path}
        first={index === 0 ? 1 : 0}
      >
        {page.name}
      </RenderedLink>
    ));
  };

  const itemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  if (isMobile) {
    return (
      <>
        <Nav>
          <MenuButton onClick={() => setSideMenu(true)}>
            <FontAwesomeIcon icon={faBars} />
          </MenuButton>
        </Nav>
        <SideMenu isOpen={sideMenuOpen}>
          <MenuButton onClick={() => setSideMenu(false)} sideMenu>
            <FontAwesomeIcon icon={faArrowLeft} />
          </MenuButton>
          <LinksWrapper>
            <PageLinks isMobile>{renderLinks(pages, true)}</PageLinks>
            {user ? (
              <MobileUserLinks>
                {user.isAdmin && (
                  <UserLink key="admin" onClick={() => setSideMenu(false)} to="/admin">
                    Admin
                  </UserLink>
                )}
                <UserLink key="user" onClick={() => setSideMenu(false)} to="/user">
                  Minha Conta
                </UserLink>
                <UserLink onClick={logout} to="/">
                  Logout
                </UserLink>
                <UserLink onClick={() => setSideMenu(false)} to="shopping_cart">
                  <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
                </UserLink>
              </MobileUserLinks>
            ) : (
              <MobileUserLinks>
                <UserLink onClick={() => setSideMenu(false)} to="login">
                  Login
                </UserLink>
              </MobileUserLinks>
            )}
          </LinksWrapper>
        </SideMenu>
        <Pusher />
      </>
    );
  }
  return (
    <>
      <Nav>
        <PageLinks>{renderLinks(pages)}</PageLinks>
        <UserLinks>
          {user ? (
            <>
              {user.isAdmin && (
                <StyledLink key="admin" onClick={() => setSideMenu(false)} to="/admin">
                  Admin
                </StyledLink>
              )}
              <StyledLink key="user" onClick={() => setSideMenu(false)} to="/user">
                Minha Conta
              </StyledLink>
              <LoginButton onClick={logout}>Logout</LoginButton>
              <ShoppingCartButton onClick={() => setShoppingCartOpen(!shoppingCartOpen)}>
                {itemCount > 0 && <ItemCount>{itemCount}</ItemCount>}
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              </ShoppingCartButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => setLoginModalOpen(!loginModalOpen)}>Login</LoginButton>
              <ShoppingCartButton onClick={() => setShoppingCartOpen(!shoppingCartOpen)}>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
              </ShoppingCartButton>
            </>
          )}
        </UserLinks>
      </Nav>
      <Pusher />
      <LoginModal
        isOpen={loginModalOpen}
        onLogin={() => {
          navigate("/");
        }}
        toggleLogin={() => {
          setLoginModalOpen(false);
        }}
      />
      <ShoppingCartModal
        toggleCart={() => {
          setShoppingCartOpen(!shoppingCartOpen);
        }}
        isOpen={shoppingCartOpen}
      />
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
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.6);
  background-color: ${props => props.theme.strong};
  padding: 0;
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
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
  padding: 20px 100px 20px 20px;
  font-family: "Raleway", sans-serif;
  border-bottom: 1px solid ${props => props.theme.light};
  ${props =>
    props.first === 1 &&
    css`
      border-top: 1px solid ${props => props.theme.light};
    `}
`;

const PageLinks = styled.div`
  ${props =>
    props.isMobile &&
    css`
      display: flex;
      flex-direction: column;
    `}
`;

const MobileUserLinks = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserLinks = styled.div`
  display: flex;
  align-items: center;
`;

const LoginButton = styled(Button)`
  margin: 0 10px;
  font-family: "Dosis", sans-serif;
`;

const ShoppingCartButton = styled(Button)`
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
  font-size: 20px;

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
  padding-bottom: 20px;
`;

const MenuButton = styled(Button)`
  background-color: rgba(0, 0, 0, 0);
  font-size: 20px;
  &:hover {
    box-shadow: none;
    transform: scale(1.1);
  }
  ${props =>
    props.sideMenu &&
    css`
      text-align: left;
    `}
`;

const UserLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: "Raleway", sans-serif;
  padding: 20px 100px 20px 20px;
`;

const ItemCount = styled.div`
  position: absolute;
  right: 31px;
  top: 29px;
  width: 23px;
  height: 23px;
  background-color: red;
  border-radius: 50%;
  line-height: 23px;
`;
