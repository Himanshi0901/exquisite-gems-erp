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

  const [
    showExportConfirm,
    setShowExportConfirm,
  ] = useState(false);

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
                item.description,
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

  /* RESET FILTERS */

  const resetFilters =
    () => {
      setSearch("");

      setStatusFilter(
        "ALL"
      );

      setItemFilter(
        "ALL"
      );

      setClientFilter(
        "ALL"
      );

      setDlcFilter(
        "ALL"
      );

      setSortBy(
        "latest"
      );

      setViewMode(
        "grid"
      );
    };

  const exportToExcel =
    () => {
      const exportData =
        filteredItems.map(
          (item) => {
            const today =
              new Date();

            const expiry =
              item.expiryDate
                ? new Date(
                    item.expiryDate
                  )
                : null;

            const remaining =
              expiry
                ? Math.ceil(
                    (expiry -
                      today) /
                      (1000 *
                        60 *
                        60 *
                        24)
                  )
                : "-";

            return {
              "Sr No":
                item.srNo,

              "SKU/St.No":
                item.skuStNo,

              Item:
                item.item,

              Metal:
                item.metal,

              HSN:
                item.hsn,

              "Pcs/Pair":
                item.pcs,

              Description:
                item.description,

              "G-Wt (Gms)":
                formatWeight(
                  item.grossWeight
                ),

              "N-Wt (Gms)":
                formatWeight(
                  item.netWeight
                ),

              "Mt Value (US$)":
                formatPrice(
                  item.metalValue
                ),

              "Diam Wt (Cts)":
                formatWeight(
                  item.diamondWeight
                ),

              "Diam Value (US$)":
                formatPrice(
                  item.diamondValue
                ),

              "CS Wt (Cts)":
                formatWeight(
                  item.csWeight
                ),

              "CS Value (US$)":
                formatPrice(
                  item.csValue
                ),

              "Oth Wt (Gms)":
                formatWeight(
                  item.otherWeight
                ),

              "Oth Val (US$)":
                formatPrice(
                  item.otherValue
                ),

              "Labour & Value Addition (US$)":
                formatPrice(
                  item.labourValue
                ),

              "Amount (US$)":
                formatPrice(
                  item.amount
                ),

              Client:
                item.clientName,

              "DLC No.":
                item.dlcNo,

              "DLC Date":
                item.dlcDate
                  ? new Date(
                      item.dlcDate
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

              Remaining:
                remaining > 0
                  ? `${remaining} Days`
                  : "Expired",

              Status:
                item.status,

              Image:
                item.image ||
                "",
            };
          }
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          exportData
        );

      filteredItems.forEach(
        (
          item,
          index
        ) => {
          if (
            item.image
          ) {
            const cellAddress =
              `Z${
                index + 2
              }`;

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

          <div className="flex items-center justify-end gap-2 flex-nowrap">
            <button
              onClick={
                resetFilters
              }
              className="bg-[#f8fafb] hover:bg-[#eef2f5] border border-[#dfe5ea] text-[#334e68] px-5 py-2.5 rounded-[14px] text-sm font-semibold transition-all whitespace-nowrap"
            >
              Reset
            </button>

            <button
              onClick={() =>
                setShowExportConfirm(
                  true
                )
              }
              className="bg-[#31475a] hover:bg-[#3d556b] text-white px-5 py-2.5 rounded-[14px] text-sm font-semibold transition-all whitespace-nowrap"
            >
              Export Excel
            </button>
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

      {showExportConfirm && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[420px] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] p-6">
            <h2 className="text-[24px] font-black text-[#1f2933]">
              Export Inventory
            </h2>

            <p className="mt-3 text-[#52606d] leading-relaxed">
              Are you sure you want to export the current filtered inventory data?
            </p>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() =>
                  setShowExportConfirm(
                    false
                  )
                }
                className="flex-1 py-3 rounded-[16px] border border-[#dfe5ea] text-[#52606d] font-semibold hover:bg-[#f8fafb]"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  exportToExcel();

                  setShowExportConfirm(
                    false
                  );
                }}
                className="flex-1 py-3 rounded-[16px] bg-[#31475a] hover:bg-[#3d556b] text-white font-bold transition"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Inventory;