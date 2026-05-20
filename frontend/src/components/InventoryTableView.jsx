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
                <div className="flex gap-4">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/100"
                    }
                    onError={(
                      e
                    ) => {
                      e.target.src =
                        "https://via.placeholder.com/100";
                    }}
                    className="w-24 h-24 rounded-[18px] object-cover border border-[#dfe5ea]"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-black text-[#31475a] truncate">
                      {
                        item.skuStNo
                      }
                    </div>

                    <div className="text-sm text-[#52606d] mt-1">
                      {
                        item.item
                      }
                    </div>

                    <div className="text-sm text-[#52606d]">
                      {
                        item.clientName
                      }
                    </div>

                    <div className="text-sm font-semibold text-[#1f2933] mt-2">
                      $
                      {formatPrice(
                        item.amount
                      )}
                    </div>

                    <div className="text-xs text-[#7b8794] mt-1">
                      DLC:
                      {" "}
                      {
                        item.dlcNo
                      }
                    </div>

                    <div className="text-xs text-[#7b8794]">
                      Sr No:
                      {" "}
                      {
                        item.srNo
                      }
                    </div>
                  </div>
                </div>
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
                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.srNo ||
                        "-"}
                    </td>

                    <td className="p-4">
                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/100"
                        }
                        onError={(
                          e
                        ) => {
                          e.target.src =
                            "https://via.placeholder.com/100";
                        }}
                        className="w-16 h-16 rounded-[16px] object-cover border border-[#dfe5ea] bg-[#f8fafb]"
                      />
                    </td>

                    <td className="p-4 font-black text-[#31475a] whitespace-nowrap">
                      {
                        item.skuStNo
                      }
                    </td>

                    <td className="p-4 text-[#1f2933] font-semibold whitespace-nowrap">
                      {item.item}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.metal ||
                        "-"}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.hsn ||
                        "-"}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.pcs ||
                        "-"}
                    </td>

                    <td className="p-4 text-[#52606d] min-w-[180px] max-w-[220px]">
                      <div className="break-words whitespace-normal leading-relaxed line-clamp-3 text-sm">
                        {item.description ||
                          "-"}
                      </div>
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {formatWeight(
                        item.grossWeight
                      )}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {formatWeight(
                        item.netWeight
                      )}
                    </td>

                    <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.metalValue
                      )}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {formatWeight(
                        item.diamondWeight
                      )}
                    </td>

                    <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.diamondValue
                      )}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {formatWeight(
                        item.csWeight
                      )}
                    </td>

                    <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.csValue
                      )}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {formatWeight(
                        item.otherWeight
                      )}
                    </td>

                    <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.otherValue
                      )}
                    </td>

                    <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.labourValue
                      )}
                    </td>

                    <td className="p-4 font-black text-[#1f2933] whitespace-nowrap">
                      $
                      {formatPrice(
                        item.amount
                      )}
                    </td>

                    <td className="p-4 text-[#52606d] min-w-[220px]">
                      <div className="break-words whitespace-normal leading-relaxed">
                        {item.clientName ||
                          "-"}
                      </div>
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap font-semibold">
                      {item.dlcNo ||
                        "-"}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.dlcDate
                        ? new Date(
                            item.dlcDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.expiryDate
                        ? new Date(
                            item.expiryDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4 text-[#52606d] whitespace-nowrap">
                      {item.soldDate
                        ? new Date(
                            item.soldDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      {remaining ? (
                        <div
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap
                          ${
                            remaining.type ===
                              "expired" ||
                            remaining.type ===
                              "critical"
                              ? "bg-red-100 text-red-700"
                              : remaining.type ===
                                "warning"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-blue-100 text-blue-700"
                          }
                        `}
                        >
                          {
                            remaining.text
                          }
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-4">
                      <div
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap
                        ${
                          item.status ===
                          "SOLD"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                      >
                        {item.status ===
                        "SOLD"
                          ? "SOLD"
                          : "AVAILABLE"}
                      </div>
                    </td>
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
          setSelectedItem(null)
        }
      />
    </>
  );
}

export default InventoryTableView;