import React from "react";
import { Router, Location } from "@reach/router";
import posed, { PoseGroup } from "react-pose";
import withAuthentication from "hocs/withAuthentication";

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
import ProductList from "views/ProductList";
import ShoppingCart from "views/ShoppingCart";
import AddProduct from "views/AddProduct";
import ScheduleService from "views/ScheduleService";
import CreateService from "views/CreateService";

const AdminDashboardWithAuth = withAuthentication(AdminDashboard, true);
const UserListWithAuth = withAuthentication(UserList, true);
const ProductListWithAuth = withAuthentication(ProductList, true);
const AddProductWithAuth = withAuthentication(AddProduct, true);
const CreateServiceWithAuth = withAuthentication(CreateService, true);
const UserDashboardWithAuth = withAuthentication(UserDashboard);
const ShoppingCartWithAuth = withAuthentication(ShoppingCart);
const ScheduleServiceWithAuth = withAuthentication(ScheduleService);
const EditAccountWithAuth = withAuthentication(EditAccount);

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

export default () => {
  return (
    <PosedRouter>
      <Home path="/" />
      <Dog path="dog_products" />
      <Cat path="cat_products" />
      <OtherPets path="other_products" />
      <Login path="login" />
      <SignUp path="signup" />
      <SignUpPet path="signup_pet" />
      <AddProductWithAuth path="add_product" />
      <EditAccountWithAuth path="edit_account" />
      <UserDashboardWithAuth path="user" />
      <AdminDashboardWithAuth path="admin" />
      <UserListWithAuth path="user_list" />
      <ProductListWithAuth path="product_list" />
      <UserListWithAuth path="admin_list" adminUsers />
      <ForgotPW path="forgot_password" />
      <ShoppingCartWithAuth path="shopping_cart" />
      <ScheduleServiceWithAuth path="schedule_service" />
      <CreateServiceWithAuth path="create_service" />
    </PosedRouter>
  );
};

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 100 },
  exit: { opacity: 0 },
});
