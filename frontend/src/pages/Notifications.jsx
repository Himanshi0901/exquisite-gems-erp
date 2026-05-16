import { useContext } from "react";

import MainLayout from "../layouts/MainLayout";

import { InventoryContext } from "../context/InventoryContext";

function Notifications() {
  const { items } =
    useContext(InventoryContext);

  const today = new Date();

  const notifications = items.filter(
    (item) => {
      if (!item.returnDeadline)
        return false;

      const diff =
        new Date(item.returnDeadline) -
        today;

      const daysLeft = Math.ceil(
        diff / (1000 * 60 * 60 * 24)
      );

      return (
        item.status === "IN_DUBAI" &&
        daysLeft <= 30
      );
    }
  );

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-yellow-500/10 border border-yellow-500 p-5 rounded-xl"
          >
            <h2 className="text-xl font-bold text-yellow-400">
              {item.name}
            </h2>

            <p className="text-gray-300 mt-2">
              Dubai return deadline approaching.
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default Notifications;