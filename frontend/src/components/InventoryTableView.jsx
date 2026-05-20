import { useState } from "react";

import JewelleryDrawer from "./JewelleryDrawer";

function InventoryTableView({
  items,
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

  const [
    sortField,
    setSortField,
  ] = useState("");

  const [
    sortDirection,
    setSortDirection,
  ] = useState("asc");

  const handleSort = (
    field
  ) => {
    if (
      sortField === field
    ) {
      setSortDirection(
        sortDirection ===
          "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortField(field);

      setSortDirection(
        "asc"
      );
    }
  };

  const sortedItems =
    [...items].sort(
      (a, b) => {
        if (
          !sortField
        )
          return 0;

        const aValue =
          a[
            sortField
          ];

        const bValue =
          b[
            sortField
          ];

        if (
          aValue ==
            null ||
          bValue ==
            null
        )
          return 0;

        const isNumeric =
          !isNaN(
            aValue
          ) &&
          !isNaN(
            bValue
          );

        if (
          isNumeric
        ) {
          return sortDirection ===
            "asc"
            ? Number(
                aValue
              ) -
                Number(
                  bValue
                )
            : Number(
                bValue
              ) -
                Number(
                  aValue
                );
        }

        return sortDirection ===
          "asc"
          ? String(
              aValue
            ).localeCompare(
              String(
                bValue
              ),
              undefined,
              {
                numeric: true,
              }
            )
          : String(
              bValue
            ).localeCompare(
              String(
                aValue
              ),
              undefined,
              {
                numeric: true,
              }
            );
      }
    );

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

  const getRemainingDays = (
    expiryDate
  ) => {
    if (!expiryDate)
      return null;

    const expiry =
      new Date(
        expiryDate
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

    if (days <= 0) {
      return {
        text: "Expired",
        type: "expired",
      };
    }

    if (days <= 15) {
      return {
        text: `${days} Days Left`,
        type: "critical",
      };
    }

    if (days <= 30) {
      return {
        text: `${days} Days Left`,
        type: "warning",
      };
    }

    return {
      text: `${days} Days Left`,
      type: "safe",
    };
  };

  const headers = [
    [
      "Sr No",
      "",
      "srNo",
    ],

    [
      "Image",
      "",
      null,
    ],

    [
      "SKU/St.No",
      "",
      "skuStNo",
    ],

    [
      "Item",
      "",
      "item",
    ],

    [
      "Metal",
      "",
      "metal",
    ],

    [
      "HSN",
      "",
      "hsn",
    ],

    [
      "Pcs/Pair",
      "",
      "pcs",
    ],

    [
      "Description",
      "",
      "description",
    ],

    [
      "G-Wt",
      "Gms",
      "grossWeight",
    ],

    [
      "N-Wt",
      "Gms",
      "netWeight",
    ],

    [
      "Mt Value",
      "US$",
      "metalValue",
    ],

    [
      "Diam Wt",
      "Cts",
      "diamondWeight",
    ],

    [
      "Diam Value",
      "US$",
      "diamondValue",
    ],

    [
      "CS Wt",
      "Cts",
      "csWeight",
    ],

    [
      "CS Value",
      "US$",
      "csValue",
    ],

    [
      "Oth Wt",
      "Gms",
      "otherWeight",
    ],

    [
      "Oth Val",
      "US$",
      "otherValue",
    ],

    [
      "Labour & Value Addition",
      "US$",
      "labourValue",
    ],

    [
      "Amount",
      "US$",
      "amount",
    ],

    [
      "Client",
      "",
      "clientName",
    ],

    [
      "DLC No.",
      "",
      "dlcNo",
    ],

    [
      "DLC Date",
      "",
      "dlcDate",
    ],

    [
      "Expiry Date",
      "",
      "expiryDate",
    ],

    [
      "Sold Date",
      "",
      "soldDate",
    ],

    [
      "Remaining",
      "",
      null,
    ],

    [
      "Status",
      "",
      "status",
    ],
  ];

  return (
    <>
      {/* MOBILE VIEW */}

      <div className="md:hidden space-y-4">
        {sortedItems.map(
          (item) => {
            const remaining =
              getRemainingDays(
                item.expiryDate
              );

            return (
              <div
                key={item.id}
                onClick={() =>
                  setSelectedItem(
                    item
                  )
                }
                className="bg-white border border-[#dfe5ea] rounded-[22px] p-4 shadow-[0_4px_18px_rgba(0,0,0,0.04)]"
              >
                MOBILE VIEW SAME AS BEFORE
              </div>
            );
          }
        )}
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden md:block overflow-x-auto rounded-[24px] border border-[#dfe5ea] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <table className="w-full min-w-[4200px] bg-white">
          <thead className="sticky top-0 z-20 bg-[#f4f7fa] backdrop-blur-md">
            <tr className="border-b border-[#e6ebef] text-left">
              {headers.map(
                (
                  heading
                ) => (
                  <th
                    key={
                      heading[0]
                    }
                    onClick={() => {
                      if (
                        heading[2]
                      ) {
                        handleSort(
                          heading[2]
                        );
                      }
                    }}
                    className={`p-5 text-sm text-[#5b6b79] font-bold whitespace-nowrap ${
                      heading[2]
                        ? "cursor-pointer select-none hover:bg-[#eef2f5]"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col leading-tight">
                      <div className="flex items-center gap-2">
                        <span>
                          {
                            heading[0]
                          }
                        </span>

                        {sortField ===
                          heading[2] && (
                          <span>
                            {sortDirection ===
                            "asc"
                              ? "↑"
                              : "↓"}
                          </span>
                        )}
                      </div>

                      {heading[1] && (
                        <span className="text-[10px] text-[#9aa5b1] font-semibold mt-1">
                          {
                            heading[1]
                          }
                        </span>
                      )}
                    </div>
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {sortedItems.map(
              (item) => {
                const remaining =
                  getRemainingDays(
                    item.expiryDate
                  );

                return (
                  <tr
                    key={item.id}
                    onClick={() =>
                      setSelectedItem(
                        item
                      )
                    }
                    className="border-b border-[#eef2f5] hover:bg-[#f8fafb] cursor-pointer transition-all duration-200"
                  >
                    {/* KEEP YOUR EXISTING TDs SAME */}
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>

      <JewelleryDrawer
        item={selectedItem}
        onClose={() =>
          setSelectedItem(
            null
          )
        }
      />
    </>
  );
}

export default InventoryTableView;