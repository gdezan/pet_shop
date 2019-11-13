import React, { useState, useEffect } from "react";
import { Router, Location } from "@reach/router";
import { ThemeProvider } from "styled-components";
import posed, { PoseGroup } from "react-pose";
import withAuthentication from "hocs/withAuthentication";

import Navbar from "components/Navbar";
import { UserContext } from "components/UserContext";

import "flatpickr/dist/themes/airbnb.css";

import Home from "views/Home";
import Dog from "views/Dog";
import Cat from "views/Cat";
import OtherPets from "views/OtherPets";
import Login from "views/Login";
import UserDashboard from "views/UserDashboard";
import AdminDashboard from "views/AdminDashboard";
import SignUp from "views/SignUp";
import SignUpPet from "views/SignUpPet";
import EditAccount from "views/EditAccount";
import ForgotPW from "views/ForgotPW";
import UserList from "views/UserList";
import ShoppingCart from "views/ShoppingCart";

const mainTheme = {
  bg: "#d9eeec",
  light: "#5ca4bd",
  strong: "#3c70a4",
  accent: "#da9833",
  text: {
    dark: "#222",
    light: "#d9eeec",
  },
};

const pages = [
  { name: "Home", component: Home, path: "/" },
  { name: "Cachorro", component: Dog, path: "dog_products" },
  { name: "Gato", component: Cat, path: "cat_products" },
  { name: "Outros Pets", component: OtherPets, path: "other_products" },
];

const PosedRouter = ({ children }) => (
  <Location>
    {({ location }) => (
      <PoseGroup>
        <RouteContainer key={location.key}>
          <Router location={location}>{children}</Router>
        </RouteContainer>
      </PoseGroup>
    )}
  </Location>
);

const AdminDashboardWithAuth = withAuthentication(AdminDashboard, true);
const UserListWithAuth = withAuthentication(UserList, true);
const UserDashboardWithAuth = withAuthentication(UserDashboard);

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken");
    if (authToken) {
      fetch("/api/users/session", {
        method: "POST",
        body: JSON.stringify({ auth_token: authToken }),
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
        })
        .catch(err => console.error(err));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={mainTheme}>
        <Navbar pages={pages} />
        <PosedRouter>
          {pages.map(page => {
            const Page = page.component;
            return <Page key={page.name} path={page.path} />;
          })}
          <Login path="login" />
          <SignUp path="signup" />
          <SignUpPet path="signup_pet" />
          <EditAccount path="edit_account" />
          <UserDashboardWithAuth path="user" />
          <AdminDashboardWithAuth path="admin" />
          <UserListWithAuth path="user_list" />
          <UserListWithAuth path="admin_list" adminUsers />
          <ForgotPW path="forgot_password" />
          <ShoppingCart path="shopping_cart" />
        </PosedRouter>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0 },
});

export default App;
