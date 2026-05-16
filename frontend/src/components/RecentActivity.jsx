function RecentActivity({
  items,
}) {
  return (
    <div className="bg-white border border-[#dfe5ea] rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1f2933]">
            Recent Inventory
          </h2>

          <p className="text-[#7b8794] text-sm mt-1">
            Latest jewellery items
          </p>
        </div>

        <div className="w-3 h-3 rounded-full bg-[#31475a]" />
      </div>

      <div className="space-y-4">
        {items
          .slice(0, 5)
          .map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-[#f8fafb] border border-[#e6ebef] p-4 rounded-[18px] hover:border-[#bcc9d4] transition-all duration-300"
            >
              <img
                src={
                  item.image
                }
                alt={item.name}
                className="w-14 h-14 rounded-[14px] object-cover bg-white border border-[#dfe5ea]"
              />

              <div>
                <h3 className="font-semibold text-[#1f2933]">
                  {item.name}
                </h3>

                <p className="text-sm text-[#7b8794]">
                  {
                    item.itemCode
                  }
                </p>
              </div>

              <div className="ml-auto">
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full
                  
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
                  {
                    item.status
                  }
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecentActivity;