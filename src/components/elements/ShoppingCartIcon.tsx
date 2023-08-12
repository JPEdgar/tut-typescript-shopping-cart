import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

type ShoppingCartIconProps = {
  openCart: () => void;
  cartQuantity: number;
};

const ShoppingCartIcon = ({
  openCart,
  cartQuantity,
}: ShoppingCartIconProps) => {
  return ( 
    <Button
      variant="outline-primary"
      className="rounded-circle"
      style={{ height: "3rem", width: "3rem", position: "relative" }}
      onClick={() => openCart()}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      <div
        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
        style={{
          color: "white",
          width: "1.5rem",
          height: "1.5rem",
          position: "absolute",
          bottom: "0",
          right: "0",
          transform: "translate(25%, 25%",
        }}
      >
        {cartQuantity}
      </div>
    </Button>
  );
};

export default ShoppingCartIcon;
