import { useContext } from "react";

import MainLayout from "../layouts/MainLayout";

import StatCard from "../components/StatCard";

import AnalyticsChart from "../components/AnalyticsChart";

import RecentActivity from "../components/RecentActivity";

import ExpiryAlerts from "../components/ExpiryAlerts";

import DashboardHero from "../components/DashboardHero";

import { InventoryContext } from "../context/InventoryContext";

function Dashboard() {
  const { items } =
    useContext(
      InventoryContext
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
          !item.outDate ||
          item.status ===
            "SOLD"
        )
          return false;

        const expiry =
          new Date(
            item.outDate
          );

        expiry.setDate(
          expiry.getDate() +
            180
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