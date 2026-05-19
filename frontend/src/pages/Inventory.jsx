import {
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import toast from "react-hot-toast";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

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

  const [clientFilter, setClientFilter] =
    useState("ALL");

  const [dlcFilter, setDlcFilter] =
    useState("ALL");

  const [sortBy, setSortBy] =
    useState("latest");

  const formatWeight = (
    value
  ) =>
    Number(
      value || 0
    ).toFixed(3);

  const formatPrice = (
    value
  ) =>
    Number(
      value || 0
    ).toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

  /* ALERTS */

  useEffect(() => {
    const criticalItems =
      items.filter((item) => {
        if (
          !item.expiryDate ||
          item.status === "SOLD"
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
      });

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

        toast(
          `${item.dlcNo} is due to return to India in ${days} days`,
          {
            duration: 8000,

            icon: "⚠️",
          }
        );
      }
    );
  }, [items]);

  const uniqueClients =
    [
      ...new Set(
        items
          .map(
            (item) =>
              item.clientName
          )
          .filter(Boolean)
      ),
    ];

  const uniqueDlc =
    [
      ...new Set(
        items
          .map(
            (item) =>
              item.dlcNo
          )
          .filter(Boolean)
      ),
    ];

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
                item.clientName,
                item.dlcNo,
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
                .trim() ===
                itemFilter;

            const matchesClient =
              clientFilter ===
                "ALL" ||
              item.clientName ===
                clientFilter;

            const matchesDlc =
              dlcFilter ===
                "ALL" ||
              item.dlcNo ===
                dlcFilter;

            return (
              matchesSearch &&
              matchesStatus &&
              matchesItem &&
              matchesClient &&
              matchesDlc
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
      clientFilter,
      dlcFilter,
      sortBy,
    ]);

  const exportToExcel =
    () => {
      const exportData =
        filteredItems.map(
          (item) => ({
            SKU:
              item.skuStNo,

            Item:
              item.item,

            Client:
              item.clientName,

            "DLC No":
              item.dlcNo,

            Metal:
              item.metal,

            PCS:
              item.pcs,

            "Gross Weight":
              formatWeight(
                item.grossWeight
              ),

            "Net Weight":
              formatWeight(
                item.netWeight
              ),

            "Diamond Weight":
              formatWeight(
                item.diamondWeight
              ),

            "Diamond Value":
              formatPrice(
                item.diamondValue
              ),

            "CS Weight":
              formatWeight(
                item.csWeight
              ),

            "CS Value":
              formatPrice(
                item.csValue
              ),

            Labour:
              formatPrice(
                item.labourValue
              ),

            Amount:
              formatPrice(
                item.amount
              ),

            Status:
              item.status,

            Description:
              item.description,

            "Sent Date":
              item.sentDate
                ? new Date(
                    item.sentDate
                  ).toLocaleDateString()
                : "-",

            "Expiry Date":
              item.expiryDate
                ? new Date(
                    item.expiryDate
                  ).toLocaleDateString()
                : "-",

            "Sold Date":
              item.soldDate
                ? new Date(
                    item.soldDate
                  ).toLocaleDateString()
                : "-",

            "Image Link":
              item.image || "",
          })
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          exportData
        );

      /* CLICKABLE IMAGE LINKS */

      filteredItems.forEach(
        (item, index) => {
          if (item.image) {
            const cellAddress =
              `T${index + 2}`;

            worksheet[
              cellAddress
            ] = {
              t: "s",

              v: "Open Image",

              l: {
                Target:
                  item.image,
              },
            };
          }
        }
      );

      worksheet["!cols"] = [
        { wch: 18 },
        { wch: 18 },
        { wch: 24 },
        { wch: 18 },
        { wch: 14 },
        { wch: 10 },
        { wch: 16 },
        { wch: 16 },
        { wch: 18 },
        { wch: 18 },
        { wch: 16 },
        { wch: 16 },
        { wch: 16 },
        { wch: 16 },
        { wch: 14 },
        { wch: 14 },
        { wch: 14 },
        { wch: 20 },
      ];

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Inventory"
      );

      const excelBuffer =
        XLSX.write(
          workbook,
          {
            bookType:
              "xlsx",

            type: "array",
          }
        );

      const data =
        new Blob(
          [excelBuffer],
          {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          }
        );

      saveAs(
        data,
        `inventory_export_${Date.now()}.xlsx`
      );
    };

  if (!items.length) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh] text-[#52606d] text-lg font-semibold">
          Loading inventory...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="sticky top-[72px] z-30 bg-white border border-[#dfe5ea] rounded-[22px] p-3 md:p-4 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-[2.2fr_1fr_1fr_1fr_1fr_1fr_auto_auto] gap-2 md:gap-3 items-center">
          <input
            type="text"
            placeholder="Search SKU, client, DLC..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="col-span-2 bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] px-4 py-2.5 outline-none text-sm"
          />

          <div className="flex items-center bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] p-1 w-full">
            <button
              onClick={() =>
                setViewMode(
                  "grid"
                )
              }
              className={`flex-1 px-3 py-2 rounded-[12px] text-sm font-semibold transition
                
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
              className={`flex-1 px-3 py-2 rounded-[12px] text-sm font-semibold transition
                
                ${
                  viewMode ===
                  "table"
                    ? "bg-[#31475a] text-white"
                    : "text-[#52606d]"
                }
              `}
            >
              Table
            </button>
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] px-3 py-2.5 outline-none text-sm"
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

          <select
            value={itemFilter}
            onChange={(e) =>
              setItemFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] px-3 py-2.5 outline-none text-sm"
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

          <select
            value={clientFilter}
            onChange={(e) =>
              setClientFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] px-3 py-2.5 outline-none text-sm"
          >
            <option value="ALL">
              All Clients
            </option>

            {uniqueClients.map(
              (client) => (
                <option
                  key={client}
                  value={client}
                >
                  {client}
                </option>
              )
            )}
          </select>

          <select
            value={dlcFilter}
            onChange={(e) =>
              setDlcFilter(
                e.target.value
              )
            }
            className="bg-[#f8fafb] border border-[#dfe5ea] rounded-[14px] px-3 py-2.5 outline-none text-sm"
          >
            <option value="ALL">
              All DLC
            </option>

            {uniqueDlc.map(
              (dlc) => (
                <option
                  key={dlc}
                  value={dlc}
                >
                  {dlc}
                </option>
              )
            )}
          </select>

          <div className="flex items-center justify-end gap-2 flex-nowrap">
            <button
              onClick={
                exportToExcel
              }
              className="bg-[#31475a] hover:bg-[#3d556b] text-white px-5 py-2.5 rounded-[14px] text-sm font-semibold transition-all whitespace-nowrap"
            >
              Export Excel
            </button>

            <div className="flex items-center justify-center bg-[#f8fafb] rounded-[14px] border border-[#dfe5ea] px-4 py-2.5 text-sm font-semibold text-[#334e68] whitespace-nowrap">
              {
                filteredItems.length
              }{" "}
              Items
            </div>
          </div>
        </div>
      </div>

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