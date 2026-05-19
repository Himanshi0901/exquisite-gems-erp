import { useState } from "react";

import JewelleryDrawer from "./JewelleryDrawer";

function InventoryTableView({
  items,
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

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
    ["Image", ""],
    ["SKU/St.No", ""],
    ["Item", ""],
    ["Client", ""],
    ["DLC No.", ""],
    ["Metal", ""],
    ["PCS", ""],

    ["G-Wt", "Gms"],
    ["N-Wt", "Gms"],

    ["Mt Value", "US$"],

    ["Diam Wt", "Cts"],
    ["Diam Value", "US$"],

    ["CS Wt", "Cts"],
    ["CS Value", "US$"],

    ["Labour", "US$"],
    ["Amount", "US$"],

    ["DLC Date", ""],
    ["Expiry Date", ""],
    ["Sold Date", ""],

    ["Remaining", ""],
    ["Status", ""],
  ];

  return (
    <>
      <div className="overflow-x-auto rounded-[24px] border border-[#dfe5ea] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
        <table className="w-full min-w-[2600px] bg-white">
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
                    className="p-5 text-sm text-[#5b6b79] font-bold whitespace-nowrap"
                  >
                    <div className="flex flex-col leading-tight">
                      <span>
                        {
                          heading[0]
                        }
                      </span>

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
            {items.map((item) => {
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
                  {/* IMAGE */}

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

                  {/* SKU */}

                  <td className="p-4 font-black text-[#31475a] whitespace-nowrap">
                    {
                      item.skuStNo
                    }
                  </td>

                  {/* ITEM */}

                  <td className="p-4 text-[#1f2933] font-semibold whitespace-nowrap">
                    {item.item}
                  </td>

                  {/* CLIENT */}

                  <td className="p-4 text-[#52606d] min-w-[220px]">
                    <div className="break-words whitespace-normal leading-relaxed">
                      {item.clientName ||
                        "-"}
                    </div>
                  </td>

                  {/* DLC */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap font-semibold">
                    {item.dlcNo ||
                      "-"}
                  </td>

                  {/* METAL */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {item.metal ||
                      "-"}
                  </td>

                  {/* PCS */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {item.pcs ||
                      "-"}
                  </td>

                  {/* GROSS */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {formatWeight(
                      item.grossWeight
                    )}
                  </td>

                  {/* NET */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {formatWeight(
                      item.netWeight
                    )}
                  </td>

                  {/* METAL VALUE */}

                  <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                    $
                    {formatPrice(
                      item.metalValue
                    )}
                  </td>

                  {/* DIAMOND WT */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {formatWeight(
                      item.diamondWeight
                    )}
                  </td>

                  {/* DIAMOND VALUE */}

                  <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                    $
                    {formatPrice(
                      item.diamondValue
                    )}
                  </td>

                  {/* CS WT */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {formatWeight(
                      item.csWeight
                    )}
                  </td>

                  {/* CS VALUE */}

                  <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                    $
                    {formatPrice(
                      item.csValue
                    )}
                  </td>

                  {/* LABOUR */}

                  <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                    $
                    {formatPrice(
                      item.labourValue
                    )}
                  </td>

                  {/* TOTAL */}

                  <td className="p-4 font-black text-[#1f2933] whitespace-nowrap">
                    $
                    {formatPrice(
                      item.amount
                    )}
                  </td>

                  {/* DLC DATE */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {item.dlcDate
                      ? new Date(
                          item.dlcDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* EXPIRY DATE */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {item.expiryDate
                      ? new Date(
                          item.expiryDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* SOLD DATE */}

                  <td className="p-4 text-[#52606d] whitespace-nowrap">
                    {item.soldDate
                      ? new Date(
                          item.soldDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  {/* REMAINING */}

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

                  {/* STATUS */}

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
            })}
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