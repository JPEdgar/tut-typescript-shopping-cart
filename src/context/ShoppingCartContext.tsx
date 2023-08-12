import { useState, createContext, useContext, ReactNode } from "react";

import ShoppingCart from "../components/ShoppingCart";
import {useLocalStorage} from "../hooks"

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartList: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

const useShoppingCart = () => useContext(ShoppingCartContext);

const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
  const [cartList, setCartList] = useLocalStorage <CartItem[]>("shopping-cart", []);
  const [isOpenFlag, setIsOpenFlag] = useState<boolean>(false);

  const getItemQuantity = (id: number) => {
    return cartList.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartList((curr) => {
      if (curr.find((item) => item.id === id) == null) {
        return [...curr, { id, quantity: 1 }];
      } else
        return curr.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
    });
  };

  const removeFromCart = (id: number) => {
    setCartList((curr) => curr.filter((item) => item.id !== id));
  };

  const decreaseCartQuantity = (id: number) => {
    setCartList((curr) => {
      if (curr.find((item) => item.id === id)?.quantity === 1) {
        return curr.filter((item) => item.id !== id);
      } else
        return curr.map((item) => {
          if (item.id === id) return { ...item, quantity: item.quantity - 1 };
          else return item;
        });
    });
  };

  const cartQuantity = cartList.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => {
    setIsOpenFlag(true);
  };

  const closeCart = () => {
    setIsOpenFlag(false);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartQuantity,
        cartList,
      }}
    >
      {children}
      <ShoppingCart isOpenFlag={isOpenFlag}/>
    </ShoppingCartContext.Provider>
  );
};

export { useShoppingCart, ShoppingCartProvider };
