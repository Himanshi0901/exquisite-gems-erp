import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function AnalyticsChart({
  items,
}) {
  const available =
    items.filter(
      (i) =>
        i.status !==
        "SOLD"
    ).length;

  const sold =
    items.filter(
      (i) =>
        i.status ===
        "SOLD"
    ).length;

  const expiringSoon =
    items.filter(
      (item) => {
        if (
          !item.expiryDate ||
          item.status ===
            "SOLD"
        )
          return false;

        const expiry =
          new Date(
            item.expiryDate
          );

        const today =
          new Date();

        const diff =
          expiry - today;

        const days =
          diff /
          (1000 *
            60 *
            60 *
            24);

        return (
          days <= 30 &&
          days > 0
        );
      }
    ).length;

  const data = [
    {
      name:
        "Available",
      value:
        available,
    },

    {
      name: "Sold",
      value: sold,
    },

    {
      name:
        "Expiring Soon",
      value:
        expiringSoon,
    },
  ];

  const COLORS = [
    "#31475a",
    "#ef4444",
    "#f59e0b",
  ];

  return (
    <div className="bg-white border border-[#dfe5ea] rounded-[24px] p-5 md:p-6 h-[420px] shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#1f2933]">
            Inventory Overview
          </h2>

          <p className="text-[#7b8794] text-sm mt-1">
            Live showroom analytics
          </p>
        </div>

        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* EMPTY */}

      {items.length === 0 ? (
        <div className="flex items-center justify-center h-[300px] text-[#7b8794] font-semibold">
          Loading analytics...
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height="85%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={115}
              innerRadius={70}
              paddingAngle={4}
            >
              {data.map(
                (
                  entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius:
                  "16px",
                border:
                  "1px solid #dfe5ea",
                background:
                  "#ffffff",
                fontSize:
                  "13px",
              }}
            />

            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AnalyticsChart;