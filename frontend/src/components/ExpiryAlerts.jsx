import {
  useState,
} from "react";

function ExpiryAlerts({
  items,
}) {
  const [
    dismissed,
    setDismissed,
  ] = useState(false);

  const alerts =
    items.filter((item) => {
      if (
        item.status ===
          "SOLD" ||
        !item.expiryDate
      )
        return false;

      const today =
        new Date();

      const expiry =
        new Date(
          item.expiryDate
        );

      const diff =
        Math.ceil(
          (expiry - today) /
            (1000 *
              60 *
              60 *
              24)
        );

      return (
        diff <= 15 &&
        diff > 0
      );
    });

  if (
    alerts.length === 0 ||
    dismissed
  )
    return null;

  return (
    <div className="bg-white border border-[#dfe5ea] rounded-[24px] p-4 md:p-6 mb-8 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1f2933]">
            Expiry Alerts
          </h2>

          <p className="text-[#7b8794] text-sm mt-1">
            Jewellery nearing
            India return
            deadline
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-red-100 text-red-700 text-sm font-bold whitespace-nowrap">
            {alerts.length}{" "}
            Alerts
          </div>

          <button
            onClick={() =>
              setDismissed(
                true
              )
            }
            className="px-4 py-2 rounded-2xl bg-[#31475a] hover:bg-[#3d556b] text-white text-sm font-semibold transition-all"
          >
            OK
          </button>
        </div>
      </div>

      {/* ALERTS */}

      <div className="space-y-3">
        {alerts.map((item) => {
          const today =
            new Date();

          const expiry =
            new Date(
              item.expiryDate
            );

          const diff =
            Math.ceil(
              (expiry - today) /
                (1000 *
                  60 *
                  60 *
                  24)
            );

          return (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl p-4 border transition-all duration-300
              
              ${
                diff <= 5
                  ? "bg-red-50 border-red-200"

                  : "bg-orange-50 border-orange-200"
              }
            `}
            >
              {/* LEFT */}

              <div className="flex items-center gap-4 min-w-0">
                <img
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
                  className="w-14 h-14 rounded-xl object-cover bg-white border border-[#dfe5ea] flex-shrink-0"
                />

                <div className="min-w-0">
                  <h3 className="font-black text-[#1f2933] break-words">
                    {
                      item.skuStNo
                    }
                  </h3>

                  <p className="text-sm text-[#52606d] mt-1 break-words">
                    DLC No:{" "}
                    {
                      item.dlcNo
                    }
                  </p>

                  <p className="text-xs text-[#7b8794] mt-1">
                    Expiry:{" "}
                    {new Date(
                      item.expiryDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              <div
                className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap text-center
                
                ${
                  diff <= 5
                    ? "bg-red-100 text-red-700"

                    : "bg-orange-100 text-orange-700"
                }
              `}
              >
                {diff} days left
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExpiryAlerts;