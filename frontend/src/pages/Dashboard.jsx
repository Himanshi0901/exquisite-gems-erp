import {
  useContext,
  useEffect,
  useMemo,
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

  /* MEMOIZED DATA */

  const soldItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.status ===
            "SOLD"
        ),
      [items]
    );

  const availableItems =
    useMemo(
      () =>
        items.filter(
          (item) =>
            item.status !==
            "SOLD"
        ),
      [items]
    );

  const expiringSoon =
    useMemo(
      () =>
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
        ),
      [items]
    );

  /* ALERTS */

  useEffect(() => {
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
      });
  }, [items, user]);

  /* LOADING */

  if (!items.length) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#dfe5ea] border-t-[#31475a] rounded-full animate-spin mx-auto" />

            <p className="mt-5 text-[#52606d] font-semibold">
              Loading dashboard...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* HERO */}

      <div className="mb-6">
        <DashboardHero
          items={items}
        />
      </div>

      {/* ALERTS */}

      <div className="mb-6">
        <ExpiryAlerts
          items={items}
        />
      </div>

      {/* STATS */}

      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-3 md:gap-4 mb-8">
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

      {/* MAIN GRID */}

      <div className="grid xl:grid-cols-3 grid-cols-1 gap-5 md:gap-6">
        {/* CHART */}

        <div className="xl:col-span-2">
          <AnalyticsChart
            items={items}
          />
        </div>

        {/* ACTIVITY */}

        <div>
          <RecentActivity
            items={items}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;