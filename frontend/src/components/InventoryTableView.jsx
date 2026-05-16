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
      <div className="overflow-x-auto rounded-[20px] border border-[#dfe5ea] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <table className="w-full min-w-[1200px] bg-white">
          <thead>
            <tr className="border-b border-[#e6ebef] text-left bg-[#f8fafb]">
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
                Metal
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Gross Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Net Wt
              </th>

              <th className="p-5 text-sm text-[#7b8794] font-semibold">
                Amount
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
                <td className="p-5">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/100"
                    }
                    className="w-16 h-16 rounded-[16px] object-cover border border-[#dfe5ea] bg-[#f8fafb]"
                  />
                </td>

                <td className="p-5 font-semibold text-[#31475a]">
                  {
                    item.skuStNo
                  }
                </td>

                <td className="p-5 text-[#1f2933] font-medium">
                  {item.item}
                </td>

                <td className="p-5 text-[#52606d]">
                  {item.metal}
                </td>

                <td className="p-5 text-[#52606d]">
                  {
                    item.grossWeight
                  }
                </td>

                <td className="p-5 text-[#52606d]">
                  {
                    item.netWeight
                  }
                </td>

                <td className="p-5 font-bold text-[#1f2933]">
                  $
                  {Number(
                    item.amount || 0
                  ).toLocaleString()}
                </td>

                <td className="p-5">
                  <div
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                      
                      ${
                        item.status ===
                        "SOLD"
                          ? "bg-green-100 text-green-700"

                          : item.status ===
                            "IN_DUBAI"
                          ? "bg-yellow-100 text-yellow-700"

                          : item.status ===
                            "RETURNED"
                          ? "bg-blue-100 text-blue-700"

                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {item.status}
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