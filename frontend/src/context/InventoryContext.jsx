import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const InventoryContext =
  createContext();

export function InventoryProvider({
  children,
}) {
  const [items, setItems] =
    useState([]);

  const fetchItems =
    async () => {
      try {
        const res =
          await axios.get(
            "http://localhost:5000/api/jewellery"
          );

        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/jewellery/${id}`
        );

        fetchItems();
      } catch (error) {
        console.log(error);
      }
    };

  const sendToDubai =
    async (id) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/jewellery/${id}/dubai`
        );

        fetchItems();
      } catch (error) {
        console.log(error);
      }
    };

  const markSold =
    async (id) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/jewellery/${id}/sold`
        );

        fetchItems();
      } catch (error) {
        console.log(error);
      }
    };

  const markReturned =
    async (id) => {
      try {
        await axios.patch(
          `http://localhost:5000/api/jewellery/${id}/returned`
        );

        fetchItems();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <InventoryContext.Provider
      value={{
        items,
        fetchItems,
        deleteItem,
        sendToDubai,
        markSold,
        markReturned,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}