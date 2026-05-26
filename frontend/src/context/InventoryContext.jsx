import {
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";

import api from "../services/api";

import {
  AuthContext,
} from "./AuthContext";

export const InventoryContext =
  createContext();

export function InventoryProvider({
  children,
}) {
  const {
    user,
    loading:
      authLoading,
  } = useContext(
    AuthContext
  );

  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchItems =
    async () => {
      try {
        setLoading(true);

        const res =
          await api.get(
            "/jewellery"
          );

        setItems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (
      user &&
      !authLoading
    ) {
      fetchItems();

      const interval =
        setInterval(() => {
          fetchItems();
        }, 5000);

      return () =>
        clearInterval(
          interval
        );
    }
  }, [
    user,
    authLoading,
  ]);

  const deleteItem =
    async (id) => {
      try {
        await api.delete(
          `/jewellery/${id}`
        );

        setItems((prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const sendToDubai =
    async (id) => {
      try {
        await api.patch(
          `/jewellery/${id}/dubai`
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status:
                    "DUBAI",
                }
              : item
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const markSold =
    async (id) => {
      try {
        await api.patch(
          `/jewellery/${id}/sold`
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status:
                    "SOLD",
                }
              : item
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const markReturned =
    async (id) => {
      try {
        await api.patch(
          `/jewellery/${id}/returned`
        );

        setItems((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  status:
                    "RETURNED",
                }
              : item
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <InventoryContext.Provider
      value={{
        items,
        loading,
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