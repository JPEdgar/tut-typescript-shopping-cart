import React from "react";

import { Navbar as BSNavbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import ShoppingCartIcon from "./elements/ShoppingCartIcon";
import { useShoppingCart } from "../context/ShoppingCartContext";

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <BSNavbar sticky="top">
      <Container className="bg-white shadow-sm mb-3 me-auto">
        <Nav>
          <Nav.Link as={NavLink} to={"/"}>
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/store"}>
            Store
          </Nav.Link>
          <Nav.Link as={NavLink} to={"/about"}>
            About
          </Nav.Link>
        </Nav>
        {cartQuantity > 0 && <ShoppingCartIcon openCart={openCart} cartQuantity={cartQuantity} />}
      </Container>
    </BSNavbar>
  );
};

export default Navbar;
