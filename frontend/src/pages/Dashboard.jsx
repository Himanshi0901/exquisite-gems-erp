import {
  useContext,
  useEffect,
} from "react";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";

import StatCard from "../components/StatCard";

import AnalyticsChart from "../components/AnalyticsChart";

import RecentActivity from "../components/RecentActivity";

import ExpiryAlerts from "../components/ExpiryAlerts";

import DashboardHero from "../components/DashboardHero";

import { InventoryContext } from "../context/InventoryContext";

import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { items } =
    useContext(
      InventoryContext
    );

  const { user } =
    useContext(
      AuthContext
    );

  const soldItems =
    items.filter(
      (item) =>
        item.status ===
        "SOLD"
    );

  const availableItems =
    items.filter(
      (item) =>
        item.status !==
        "SOLD"
    );

  const expiringSoon =
    items.filter(
      (item) => {
        if (
          !item.expiryDate ||
          item.status ===
            "SOLD"
        )
          return false;

        const expiry =
          new Date(
            item.expiryDate
          );

        const today =
          new Date();

        const diff =
          expiry - today;

        const days =
          diff /
          (1000 *
            60 *
            60 *
            24);

        return (
          days <= 30 &&
          days > 0
        );
      }
    );

  /* ADMIN ALERTS */

  useEffect(() => {
    if (
      user?.role !==
      "ADMIN"
    )
      return;

    const criticalItems =
      items.filter(
        (item) => {
          if (
            !item.expiryDate ||
            item.status ===
              "SOLD"
          )
            return false;

          const expiry =
            new Date(
              item.expiryDate
            );

          const today =
            new Date();

          const diff =
            expiry - today;

          const days =
            Math.ceil(
              diff /
                (1000 *
                  60 *
                  60 *
                  24)
            );

          return (
            days <= 15 &&
            days > 0
          );
        }
      );

    criticalItems.forEach(
      (item) => {
        const expiry =
          new Date(
            item.expiryDate
          );

        const today =
          new Date();

        const diff =
          expiry - today;

        const days =
          Math.ceil(
            diff /
              (1000 *
                60 *
                60 *
                24)
          );

        toast.error(
          `${item.dlcNo} is due to return to India in ${days} days`,
          {
            duration: 7000,
          }
        );
      }
    );
  }, [items, user]);

  return (
    <MainLayout>
      <DashboardHero
        items={items}
      />

      <ExpiryAlerts
        items={items}
      />

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 mb-8">
        <StatCard
          title="Total Inventory"
          value={
            items.length
          }
        />

        <StatCard
          title="Available Items"
          value={
            availableItems.length
          }
        />

        <StatCard
          title="Sold Items"
          value={
            soldItems.length
          }
        />

        <StatCard
          title="Expiring Soon"
          value={
            expiringSoon.length
          }
        />
      </div>

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-6">
        <div className="xl:col-span-2">
          <AnalyticsChart
            items={items}
          />
        </div>

        <RecentActivity
          items={items}
        />
      </div>
    </MainLayout>
  );
}

export default Dashboard;