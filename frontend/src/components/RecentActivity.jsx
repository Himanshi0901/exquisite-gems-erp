function RecentActivity({
  items,
}) {
  return (
    <div className="bg-white border border-[#dfe5ea] rounded-[24px] p-5 md:p-6 shadow-[0_4px_18px_rgba(0,0,0,0.04)] h-full">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1f2933]">
            Recent Inventory
          </h2>

          <p className="text-[#7b8794] text-sm mt-1">
            Latest jewellery items
          </p>
        </div>

        <div className="w-3 h-3 rounded-full bg-[#31475a] animate-pulse" />
      </div>

      {/* EMPTY */}

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-[250px] text-[#7b8794] font-semibold">
          No inventory found
        </div>
      ) : (
        <div className="space-y-4">
          {items
            .slice(0, 5)
            .map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-[#f8fafb] border border-[#e6ebef] p-4 rounded-[18px] hover:border-[#bcc9d4] hover:shadow-sm transition-all duration-300"
              >
                <img
                  loading="lazy"
                  src={
                    item.image ||
                    "https://via.placeholder.com/100"
                  }
                  alt={
                    item.skuStNo
                  }
                  onError={(
                    e
                  ) => {
                    e.target.src =
                      "https://via.placeholder.com/100";
                  }}
                  className="w-14 h-14 rounded-[14px] object-cover bg-white border border-[#dfe5ea]"
                />

                <div className="min-w-0">
                  <h3 className="font-bold text-[#1f2933] truncate">
                    {
                      item.skuStNo
                    }
                  </h3>

                  <p className="text-sm text-[#7b8794] truncate mt-1">
                    {item.item}
                  </p>
                </div>

                <div className="ml-auto">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap
                      
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
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivity;