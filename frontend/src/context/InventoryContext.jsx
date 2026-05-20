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

  const [loading, setLoading] =
    useState(true);

  const fetchItems =
    async () => {
      try {
        setLoading(true);

        const res =
          await axios.get(
            "https://exquisite-gems-erp.onrender.com/api/jewellery"
          );

        setItems(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem =
    async (id) => {
      try {
        await axios.delete(
          `https://exquisite-gems-erp.onrender.com/api/jewellery/${id}`
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
        await axios.patch(
          `https://exquisite-gems-erp.onrender.com/api/jewellery/${id}/dubai`
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
        await axios.patch(
          `https://exquisite-gems-erp.onrender.com/api/jewellery/${id}/sold`
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
        await axios.patch(
          `https://exquisite-gems-erp.onrender.com/api/jewellery/${id}/returned`
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