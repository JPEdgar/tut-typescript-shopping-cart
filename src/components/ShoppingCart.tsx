import React from "react";

import { Offcanvas, Stack } from "react-bootstrap";

import CartItem from "./CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities";
import storeItems from "../data/items.json";

type ShoppingCartProps = {
  isOpenFlag: boolean;
};

const ShoppingCart = ({ isOpenFlag }: ShoppingCartProps) => {
  const { closeCart, cartList } = useShoppingCart();

  return (
    <Offcanvas show={isOpenFlag} onHide={() => closeCart()} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartList.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
    
        <div className="ms-auto fw-bold fs-5">
          Total:
          {formatCurrency(
            cartList.reduce((total, cartItem) => {
              const item = storeItems.find(
                (storeItem) => storeItem.id === cartItem.id
              );
              return total + (item?.price || 0) * cartItem.quantity;
            }, 0)
          )}
        </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
