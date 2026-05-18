import { useState } from "react";

import JewelleryDrawer from "./JewelleryDrawer";

function InventoryTable({
  items,
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

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

  return (
    <>
      <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
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
              className="bg-white rounded-[18px] border border-[#e5e7eb] overflow-hidden cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] transition-all duration-300"
            >
              {/* IMAGE */}

              <div className="relative bg-[#fafafa] h-[220px] flex items-center justify-center overflow-hidden">
                <img
                  loading="lazy"
                  src={
                    item.image ||
                    "https://via.placeholder.com/400"
                  }
                  alt={item.item}
                  className="w-full h-full object-contain p-3 hover:scale-105 transition duration-500"
                />

                {/* STATUS */}

                <div
                  className={`absolute top-2 left-2 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wide shadow-sm
                  
                  ${
                    item.status ===
                    "SOLD"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }
                `}
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
                    <h2 className="text-[15px] font-black leading-tight text-[#1f2933] truncate">
                      {
                        item.skuStNo
                      }
                    </h2>

                    <p className="text-[#52606d] text-[10px] mt-1 uppercase tracking-wide truncate">
                      {item.item}
                    </p>
                  </div>

                  <button className="text-[#9aa5b1] text-lg leading-none">
                    ⋮
                  </button>
                </div>

                {/* INFO */}

                <div className="mt-2 flex items-center gap-2 text-[10px] text-[#52606d] flex-wrap">
                  <span>
                    {item.metal}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {
                      item.netWeight
                    }
                    g
                  </span>

                  <span>
                    •
                  </span>

                  <span className="font-bold text-[#1f2933]">
                    $
                    {Number(
                      item.amount ||
                        0
                    ).toLocaleString()}
                  </span>
                </div>

                {/* CLIENT + DLC */}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[10px] px-2 py-2">
                    <p className="text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                      Client
                    </p>

                    <p className="text-[11px] font-bold text-[#334e68] truncate mt-1">
                      {item.clientName ||
                        "-"}
                    </p>
                  </div>

                  <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[10px] px-2 py-2">
                    <p className="text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                      DLC No.
                    </p>

                    <p className="text-[11px] font-bold text-[#334e68] truncate mt-1">
                      {item.dlcNo ||
                        "-"}
                    </p>
                  </div>
                </div>

                {/* DATE + REMAINING */}

                {item.status !==
                "SOLD" && (
                  <div className="mt-3 flex items-center justify-between bg-[#f8fafb] border border-[#eef2f5] rounded-[12px] px-3 py-2">
                    <div>
                      <p className="text-[8px] uppercase tracking-wide text-[#9aa5b1]">
                        Expiry Date
                      </p>

                      <p className="text-[11px] font-semibold text-[#334e68] mt-1">
                        {item.expiryDate
                          ? new Date(
                              item.expiryDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>

                    {remaining && (
                      <div
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold
                          
                          ${
                            remaining.type ===
                            "expired"
                              ? "bg-red-100 text-red-600"
                              : remaining.type ===
                                "warning"
                              ? "bg-orange-100 text-orange-600"
                              : "bg-blue-100 text-blue-600"
                          }
                        `}
                      >
                        {
                          remaining.text
                        }
                      </div>
                    )}
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