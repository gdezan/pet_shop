import React from "react";
import { Router } from "@reach/router";
import { ThemeProvider } from "styled-components";

import Navbar from "components/Navbar";

import Home from "views/Home";

const mainTheme = {
  bg: "#d9eeec",
  light: "#5ca4bd",
  strong: "#3c70a4",
  accent: "#da9833",
};

const pages = [{ name: "Home", component: Home, path: "/" }];

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Navbar pages={pages} />
      <Router>
        {pages.map(page => {
          const Page = page.component;
          return <Page key={page.name} path={page.path} />;
        })}
      </Router>
    </ThemeProvider>
  );
}

export default App;
