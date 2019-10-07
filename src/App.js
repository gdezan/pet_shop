import React from "react";
import { Link, Router } from "@reach/router";

const Home = () => {
  return <Link to="dashboard">Dashboard</Link>;
};
const Dashboard = () => {
  return <Link to="/">Home</Link>;
};

function App() {
  return (
    <Router>
      <Home path="/" />
      <Dashboard path="/dashboard" />
    </Router>
  );
}

export default App;
