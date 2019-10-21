import React from "react";
import { Router, Location } from "@reach/router";
import { ThemeProvider } from "styled-components";
import posed, { PoseGroup } from "react-pose";
import "flatpickr/dist/themes/airbnb.css";

import Navbar from "components/Navbar";

import Home from "views/Home";
import Dog from "views/Dog";
import Login from "views/Login";
import UserDashboard from "views/UserDashboard";

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
  { name: "Usuário", component: UserDashboard, path: "user" },
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

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Navbar pages={pages} />
      <PosedRouter>
        {pages.map(page => {
          const Page = page.component;
          return <Page key={page.name} path={page.path} />;
        })}
        <Login path="login" />
        <UserDashboard path="user" />
      </PosedRouter>
    </ThemeProvider>
  );
}

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0 },
});

export default App;
