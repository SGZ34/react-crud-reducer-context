import { useReducer } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { productsReducer } from "../reducer/productsReducer";

const productsContext = createContext();

const init = () => JSON.parse(localStorage.getItem("products")) || [];

export const useProducts = () => {
  const context = useContext(productsContext);
  if (!context) throw new Error("El provedor de productos se ha desconectado");
  return context;
};

export function ProductsProvider({ children }) {
  const [products, dispatch] = useReducer(productsReducer, [], init);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    dispatch({
      type: "add product",
      payload: product,
    });
  };
  const deleteProduct = ({ id }) => {
    dispatch({
      type: "delete product",
      payload: id,
    });
  };

  const getProduct = (id) => {
    const product = products.find((p) => p.id == id);

    return product;
  };

  const editProduct = (id, product) => {
    dispatch({
      type: "edit product",
      payload: {
        id,
        product,
      },
    });
  };
  return (
    <productsContext.Provider
      value={{ products, addProduct, deleteProduct, getProduct, editProduct }}
    >
      {children}
    </productsContext.Provider>
  );
}
