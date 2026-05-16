import {
  useContext,
  useMemo,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import InventoryTable from "../components/InventoryTable";

import InventoryTableView from "../components/InventoryTableView";

import { InventoryContext } from "../context/InventoryContext";

function Inventory() {
  const { items } =
    useContext(
      InventoryContext
    );

  const [viewMode, setViewMode] =
    useState("grid");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [itemFilter, setItemFilter] =
    useState("ALL");

  const [sortBy, setSortBy] =
    useState("latest");

  const filteredItems =
    useMemo(() => {
      let filtered =
        items.filter(
          (item) => {
            const matchesSearch =
              [
                item.skuStNo,
                item.item,
                item.metal,
                item.status,
              ]
                .join(" ")
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesStatus =
              statusFilter ===
                "ALL" ||
              item.status ===
                statusFilter;

            const matchesItem =
              itemFilter ===
                "ALL" ||
              item.item
                ?.toUpperCase()
                .includes(
                  itemFilter
                );

            return (
              matchesSearch &&
              matchesStatus &&
              matchesItem
            );
          }
        );

      if (
        sortBy ===
        "priceHigh"
      ) {
        filtered.sort(
          (a, b) =>
            Number(
              b.amount
            ) -
            Number(
              a.amount
            )
        );
      }

      if (
        sortBy ===
        "priceLow"
      ) {
        filtered.sort(
          (a, b) =>
            Number(
              a.amount
            ) -
            Number(
              b.amount
            )
        );
      }

      if (
        sortBy ===
        "weightHigh"
      ) {
        filtered.sort(
          (a, b) =>
            Number(
              b.netWeight
            ) -
            Number(
              a.netWeight
            )
        );
      }

      return filtered;
    }, [
      items,
      search,
      statusFilter,
      itemFilter,
      sortBy,
    ]);

  return (
    <MainLayout>
      {/* FILTER BAR */}

      <div className="sticky top-[72px] z-30 bg-white border border-[#dfe5ea] rounded-[22px] p-4 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.2fr_auto_1fr_1fr_1fr_auto] gap-3 items-center">
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search SKU, item..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] px-4 py-3 outline-none text-sm"
          />

          {/* TOGGLE */}

          <div className="flex items-center bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] p-1 w-fit">
            <button
              onClick={() =>
                setViewMode(
                  "grid"
                )
              }
              className={`px-4 py-2 rounded-[12px] text-sm font-semibold transition
                
                ${
                  viewMode ===
                  "grid"
                    ? "bg-[#31475a] text-white"

                    : "text-[#52606d]"
                }
              `}
            >
              Grid
            </button>

            <button
              onClick={() =>
                setViewMode(
                  "table"
                )
              }
              className={`px-4 py-2 rounded-[12px] text-sm font-semibold transition
                
                ${
                  viewMode ===
                  "table"
                    ? "bg-blue-600 text-white"

                    : "text-[#52606d]"
                }
              `}
            >
              Table
            </button>
          </div>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] px-4 py-3 outline-none text-sm"
          >
            <option value="ALL">
              All Status
            </option>

            <option value="IN_STOCK">
              Available
            </option>

            <option value="SOLD">
              Sold
            </option>
          </select>

          {/* CATEGORY */}

          <select
            value={itemFilter}
            onChange={(e) =>
              setItemFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] px-4 py-3 outline-none text-sm"
          >
            <option value="ALL">
              All Jewellery
            </option>

            <option value="NECKLACE">
              Necklace
            </option>

            <option value="RING">
              Ring
            </option>

            <option value="EARRING">
              Earring
            </option>

            <option value="BANGLE">
              Bangle
            </option>
          </select>

          {/* SORT */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] px-4 py-3 outline-none text-sm"
          >
            <option value="latest">
              Latest Added
            </option>

            <option value="priceHigh">
              Price High-Low
            </option>

            <option value="priceLow">
              Price Low-High
            </option>

            <option value="weightHigh">
              Weight High-Low
            </option>
          </select>

          {/* COUNT */}

          <div className="flex items-center justify-center bg-[#f8fafb] rounded-[16px] border border-[#dfe5ea] px-5 py-3 text-sm font-semibold text-[#334e68] whitespace-nowrap">
            {filteredItems.length}{" "}
            Items
          </div>
        </div>
      </div>

      {/* VIEW */}

      {viewMode ===
      "grid" ? (
        <InventoryTable
          items={
            filteredItems
          }
        />
      ) : (
        <InventoryTableView
          items={
            filteredItems
          }
        />
      )}
    </MainLayout>
  );
}

export default Inventory;