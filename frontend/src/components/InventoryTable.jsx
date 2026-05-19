import { useState } from "react";

import JewelleryDrawer from "./JewelleryDrawer";

function InventoryTable({
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
        text: "EXPIRED",
        type: "expired",
      };
    }

    if (days <= 15) {
      return {
        text: `${days}-DAYSLEFT`,
        type: "critical",
      };
    }

    if (days <= 30) {
      return {
        text: `${days}-DAYSLEFT`,
        type: "warning",
      };
    }

    return {
      text: `${days}-DAYSLEFT`,
      type: "safe",
    };
  };

  return (
    <>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3 md:gap-4">
        {items.map((item) => {
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
              className="bg-white rounded-[18px] border border-[#e5e7eb] overflow-hidden cursor-pointer hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* IMAGE */}

              <div className="relative bg-[#fafafa] h-[180px] md:h-[220px] flex items-center justify-center overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    item.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.item}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400";
                  }}
                  className="w-full h-full object-contain p-3 hover:scale-105 transition duration-500"
                />

                {/* STATUS */}

                <div
                  className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-wide shadow-sm ${
                    item.status ===
                    "SOLD"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {item.status ===
                  "SOLD"
                    ? "● SOLD"
                    : "● AVAILABLE"}
                </div>
              </div>

              {/* DETAILS */}

              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-[13px] md:text-[15px] font-black leading-tight text-[#1f2933] truncate">
                      {
                        item.skuStNo
                      }
                    </h2>
                  </div>

                  <button className="text-[#9aa5b1] text-lg leading-none">
                    ⋮
                  </button>
                </div>

                {/* INFO */}

                <div className="mt-2 flex items-center gap-1.5 text-[9px] md:text-[11px] text-[#52606d] flex-wrap">
                  <span className="uppercase tracking-wide">
                    {item.item}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {item.metal}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {formatWeight(
                      item.netWeight
                    )}
                    g
                  </span>

                  <span>
                    •
                  </span>

                  <span className="font-black text-[#102a43]">
                    $
                    {formatPrice(
                      item.amount
                    )}
                  </span>
                </div>

                {/* CLIENT + DLC */}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[10px] px-2 py-2 min-w-0">
                    <p className="text-[7px] md:text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                      Client
                    </p>

                    <p className="text-[10px] md:text-[11px] font-bold text-[#334e68] mt-1 break-words whitespace-normal leading-relaxed">
                      {item.clientName ||
                        "-"}
                    </p>
                  </div>

                  <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[10px] px-2 py-2 min-w-0">
                    <p className="text-[7px] md:text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                      DLC No.
                    </p>

                    <p className="text-[10px] md:text-[11px] font-bold text-[#334e68] mt-1 break-words whitespace-normal leading-relaxed">
                      {item.dlcNo ||
                        "-"}
                    </p>
                  </div>
                </div>

                {/* EXPIRY + DAYS */}

                {item.status !==
                "SOLD" && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {/* EXPIRY DATE */}

                    <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[10px] px-3 py-2">
                      <p className="text-[7px] md:text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                        Expiry Date
                      </p>

                      <p className="text-[10px] md:text-[11px] font-semibold text-[#334e68] mt-1 break-words">
                        {item.expiryDate
                          ? new Date(
                              item.expiryDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    {/* DAYS LEFT */}

                    {remaining && (
                      <div className="bg-[#fff1f2] border border-[#fecdd3] rounded-[10px] px-3 py-3 flex items-center justify-center">
                        <p className="text-[18px] md:text-[24px] font-black text-red-600 leading-none tracking-tight text-center">
                          {
                            remaining.text
                          }
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* SOLD DATE */}

                {item.status ===
                  "SOLD" &&
                  item.soldDate && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-[10px] px-3 py-2">
                      <p className="text-[7px] md:text-[8px] uppercase tracking-wide text-red-400">
                        Sold Date
                      </p>

                      <p className="text-[10px] md:text-[11px] font-bold text-red-600 mt-1">
                        {new Date(
                          item.soldDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  )}
              </div>
            </div>
          );
        })}
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

export default InventoryTable;