import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useState } from "react";

function JewelleryDrawer({
  item,
  onClose,
}) {
  const [
    confirmSell,
    setConfirmSell,
  ] = useState(false);

  const [
    confirmText,
    setConfirmText,
  ] = useState("");

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

  if (!item) return null;

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onClose}
        className="fixed inset-0 bg-black/35 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4"
      >
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 0.25,
          }}
          onClick={(e) =>
            e.stopPropagation()
          }
          className="w-full md:w-[74%] lg:w-[64%] xl:w-[58%] 2xl:w-[52%] h-[92vh] md:max-h-[88vh] rounded-[28px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.16)] overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-[38%_62%] h-full">
            {/* IMAGE SECTION */}

            <div className="bg-[#f8fafb] border-b md:border-b-0 md:border-r border-[#eef2f5] flex items-center justify-center p-4">
              <img
                src={
                  item.image
                }
                alt={item.item}
                className="w-full max-h-[240px] md:max-h-[300px] object-contain"
              />
            </div>

            {/* DETAILS */}

            <div className="p-4 flex flex-col max-h-[92vh] overflow-y-auto">
              {/* HEADER */}

              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="text-[22px] md:text-[28px] leading-none font-black text-[#1f2933] break-words">
                    {
                      item.skuStNo
                    }
                  </h1>

                  <p className="mt-1 text-[#7b8794] uppercase text-[11px] tracking-wide break-words">
                    {
                      item.item
                    }
                  </p>
                </div>

                <button
                  onClick={
                    onClose
                  }
                  className="w-9 h-9 rounded-full bg-[#f1f5f9] border border-[#dfe5ea] flex items-center justify-center text-lg text-[#52606d] min-w-[36px]"
                >
                  ×
                </button>
              </div>

              {/* STATUS */}

              <div className="mt-2">
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold tracking-wide
                    
                    ${
                      item.status ===
                      "SOLD"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }
                  `}
                >
                  {item.status ===
                  "SOLD"
                    ? "SOLD"
                    : "IN SHOWROOM"}
                </span>
              </div>

              {/* DETAILS GRID */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 mt-3">
                {[
                  {
                    label:
                      "Metal",
                    value:
                      item.metal ||
                      "-",
                  },

                  {
                    label:
                      "Gross",
                    value: `${formatWeight(
                      item.grossWeight
                    )}g`,
                  },

                  {
                    label:
                      "Net",
                    value: `${formatWeight(
                      item.netWeight
                    )}g`,
                  },

                  {
                    label:
                      "PCS",
                    value:
                      item.pcs ||
                      1,
                  },

                  {
                    label:
                      "Diamond",
                    value: `${formatWeight(
                      item.diamondWeight
                    )}ct`,
                  },

                  {
                    label:
                      "D Value",
                    value: `$${formatPrice(
                      item.diamondValue
                    )}`,
                  },

                  {
                    label:
                      "CS Wt",
                    value: `${formatWeight(
                      item.csWeight
                    )}g`,
                  },

                  {
                    label:
                      "CS Val",
                    value: `$${formatPrice(
                      item.csValue
                    )}`,
                  },

                  {
                    label:
                      "Other Wt",
                    value: `${formatWeight(
                      item.otherWeight
                    )}g`,
                  },

                  {
                    label:
                      "Other Val",
                    value: `$${formatPrice(
                      item.otherValue
                    )}`,
                  },

                  {
                    label:
                      "Labour",
                    value: `$${formatPrice(
                      item.labourValue
                    )}`,
                  },

                  {
                    label:
                      "HSN",
                    value:
                      item.hsn ||
                      "-",
                  },

                  {
                    label:
                      "Client",
                    value:
                      item.clientName ||
                      "-",
                  },

                  {
                    label:
                      "DLC",
                    value:
                      item.dlcNo ||
                      "-",
                  },
                ].map(
                  (
                    detail
                  ) => (
                    <div
                      key={
                        detail.label
                      }
                      className="bg-[#f8fafb] border border-[#eef2f5] rounded-[12px] p-2"
                    >
                      <p className="text-[7px] uppercase text-[#7b8794]">
                        {
                          detail.label
                        }
                      </p>

                      <h3 className="text-[11px] md:text-[12px] font-black text-[#1f2933] mt-1 break-words whitespace-normal leading-relaxed">
                        {
                          detail.value
                        }
                      </h3>
                    </div>
                  )
                )}
              </div>

              {/* DESCRIPTION */}

              <div className="mt-2 bg-[#f8fafb] border border-[#eef2f5] rounded-[14px] p-2.5">
                <p className="text-[7px] uppercase text-[#7b8794]">
                  Description
                </p>

                <p className="mt-1 text-[11px] leading-relaxed text-[#334e68] break-words whitespace-pre-wrap">
                  {item.description ||
                    "No description available"}
                </p>
              </div>

              {/* INFO */}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 mt-2">
                <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[14px] p-2.5">
                  <p className="text-[7px] uppercase text-[#7b8794]">
                    Sent Date
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-[#1f2933]">
                    {item.sentDate
                      ? new Date(
                          item.sentDate
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[14px] p-2.5">
                  <p className="text-[7px] uppercase text-[#7b8794]">
                    Expiry Date
                  </p>

                  <p className="mt-1 text-[11px] font-bold text-[#1f2933]">
                    {item.expiryDate
                      ? new Date(
                          item.expiryDate
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div className="bg-[#f8fafb] border border-[#eef2f5] rounded-[14px] p-2.5">
                  <p className="text-[7px] uppercase text-[#7b8794]">
                    Total Value
                  </p>

                  <h2 className="mt-1 text-[18px] md:text-[22px] leading-none font-black text-[#1f2933] break-words">
                    $
                    {formatPrice(
                      item.amount
                    )}
                  </h2>
                </div>
              </div>

              {/* SPACING */}

              <div className="pb-24" />

              {/* SOLD BUTTON */}

              <button
                onClick={() => {
                  setConfirmSell(
                    true
                  );

                  setConfirmText(
                    ""
                  );
                }}
                disabled={
                  item.status ===
                  "SOLD"
                }
                className={`sticky bottom-0 mt-4 w-full py-3 rounded-[16px] text-[14px] font-bold transition-all
                  
                  ${
                    item.status ===
                    "SOLD"
                      ? "bg-red-100 text-red-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white"
                  }
                `}
              >
                {item.status ===
                "SOLD"
                  ? "Item Sold"
                  : "Mark As Sold"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* CONFIRMATION MODAL */}

      <AnimatePresence>
        {confirmSell && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              className="bg-white rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] w-full max-w-[420px] p-6"
            >
              <h2 className="text-[24px] font-black text-[#1f2933]">
                Final Confirmation
              </h2>

              <p className="mt-3 text-[#52606d] leading-relaxed">
                This action will permanently mark the jewellery item as SOLD.

                <span className="block mt-3 font-bold text-red-500">
                  Please select confirmation below.
                </span>
              </p>

              <select
                value={
                  confirmText
                }
                onChange={(e) =>
                  setConfirmText(
                    e.target.value
                  )
                }
                className="mt-5 w-full bg-[#f8fafb] border border-[#dfe5ea] rounded-[16px] px-4 py-3 outline-none"
              >
                <option value="">
                  Select Confirmation
                </option>

                <option value="confirmed">
                  Yes, Mark Item as Sold
                </option>
              </select>

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() =>
                    setConfirmSell(
                      false
                    )
                  }
                  className="flex-1 py-3 rounded-[16px] border border-[#dfe5ea] text-[#52606d] font-semibold hover:bg-[#f8fafb]"
                >
                  Cancel
                </button>

                <button
                  disabled={
                    confirmText !==
                    "confirmed"
                  }
                  onClick={async () => {
                    try {
                      const response =
                        await fetch(
                          `https://exquisite-gems-erp.onrender.com/api/jewellery/${item.id}/sold`,
                          {
                            method:
                              "PATCH",
                          }
                        );

                      if (
                        response.ok
                      ) {
                        setConfirmSell(
                          false
                        );

                        window.location.reload();
                      }
                    } catch (error) {
                      console.log(
                        error
                      );

                      alert(
                        "Failed to mark as sold"
                      );
                    }
                  }}
                  className={`flex-1 py-3 rounded-[16px] text-white font-bold transition
                
                ${
                  confirmText ===
                  "confirmed"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-200 cursor-not-allowed"
                }
              `}
                >
                  YES, MARK SOLD
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default JewelleryDrawer;