import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import { objectToQueryString } from "Utils";

import Navbar from "components/Navbar";
import { UserContext } from "components/UserContext";
import { CartContext } from "components/CartContext";
import Router from "components/Router";

import "flatpickr/dist/themes/airbnb.css";

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

function App() {
  const [user, setUser] = useState();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken");
    const localData = window.localStorage.getItem("cartItems");
    if (authToken) {
      fetch(`/api/users/session?${objectToQueryString({ token: authToken })}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(res => res.json())
        .then(data => {
          setUser(data);
        })
        .catch(err => console.error(err));
    }
    if (localData) {
      setCartItems(JSON.parse(localData));
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <UserContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={mainTheme}>
          <Navbar />
          <Router />
        </ThemeProvider>
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
