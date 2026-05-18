import { useState } from "react";

import JewelleryDrawer from "./JewelleryDrawer";

function InventoryTableView({
  items,
}) {
  const [
    selectedItem,
    setSelectedItem,
  ] = useState(null);

  return (
    <>
      <div className="overflow-x-auto rounded-[24px] border border-[#dfe5ea] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <table className="w-full min-w-[2100px] bg-white">
          <thead className="sticky top-0 z-10 bg-[#f8fafb]">
            <tr className="border-b border-[#e6ebef] text-left">
              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Image
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                SKU/St.No
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Item
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Client
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                DLC No.
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Metal
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                PCS
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Gross Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Net Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Diamond Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Diamond Value
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                CS Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                CS Value
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Labour
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Total Amount
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Expiry Date
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
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
                    className="w-16 h-16 rounded-[16px] object-cover border border-[#dfe5ea] bg-[#f8fafb]"
                  />
                </td>

                {/* SKU */}

                <td className="p-4 font-bold text-[#31475a] whitespace-nowrap">
                  {
                    item.skuStNo
                  }
                </td>

                {/* ITEM */}

                <td className="p-4 text-[#1f2933] font-semibold whitespace-nowrap">
                  {item.item}
                </td>

                {/* CLIENT */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
                  {item.clientName ||
                    "-"}
                </td>

                {/* DLC */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
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
                  {
                    item.grossWeight
                  }
                  g
                </td>

                {/* NET */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
                  {
                    item.netWeight
                  }
                  g
                </td>

                {/* DIAMOND WT */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
                  {item.diamondWeight ||
                    0}
                </td>

                {/* DIAMOND VALUE */}

                <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                  $
                  {Number(
                    item.diamondValue ||
                      0
                  ).toLocaleString()}
                </td>

                {/* CS WT */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
                  {item.csWeight ||
                    0}
                </td>

                {/* CS VALUE */}

                <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                  $
                  {Number(
                    item.csValue ||
                      0
                  ).toLocaleString()}
                </td>

                {/* LABOUR */}

                <td className="p-4 font-semibold text-[#1f2933] whitespace-nowrap">
                  $
                  {Number(
                    item.labourValue ||
                      0
                  ).toLocaleString()}
                </td>

                {/* TOTAL */}

                <td className="p-4 font-black text-[#1f2933] whitespace-nowrap">
                  $
                  {Number(
                    item.amount || 0
                  ).toLocaleString()}
                </td>

                {/* EXPIRY DATE */}

                <td className="p-4 text-[#52606d] whitespace-nowrap">
                  {item.expiryDate
                    ? new Date(
                        item.expiryDate
                      ).toLocaleDateString()
                    : "-"}
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
            ))}
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