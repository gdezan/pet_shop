import React from "react";
// import { Link, Router } from "@reach/router";
import { ThemeProvider } from "styled-components";

import Navbar from "components/Navbar";

const mainTheme = {
  bg: "#d9eeec",
  light: "#5ca4bd",
  strong: "#3c70a4",
  accent: "#da9833",
};

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Navbar />
      {/* <Router><Home path="/" />
        <Dashboard path="/dashboard" /></Router> */}
    </ThemeProvider>
  );
}

export default App;
