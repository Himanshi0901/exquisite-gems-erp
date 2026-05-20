import { motion } from "framer-motion";

function DashboardHero({
  items,
}) {
  const availableItems =
    items.filter(
      (i) =>
        i.status !==
        "SOLD"
    ).length;

  const soldItems =
    items.filter(
      (i) =>
        i.status ===
        "SOLD"
    ).length;

  const today =
    new Date();

  const date =
    today.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative overflow-hidden rounded-[30px] p-6 md:p-8 mb-8 bg-gradient-to-br from-[#31475a] to-[#425b70] border border-[#52697d] shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
    >
      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between gap-8">
        {/* LEFT */}

        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[#c6d2dc] mb-3 tracking-[0.22em] uppercase text-[11px] md:text-sm">
            </p>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight text-white">
              Welcome Back
            </h1>

            <p className="text-[#d6e0e8] mt-5 max-w-[620px] text-sm md:text-lg leading-relaxed">
              Monitor showroom
              inventory, expiry
              timelines, sold
              items, and jewellery
              analytics in real
              time.
            </p>
          </div>

          {/* MINI STATS */}

          <div className="mt-7 flex gap-4 flex-wrap">
            <div className="bg-white/10 border border-white/10 px-5 py-4 rounded-2xl min-w-[170px] backdrop-blur-sm">
              <p className="text-[#d6e0e8] text-sm">
                Available Items
              </p>

              <h3 className="text-3xl font-black text-white mt-2">
                {
                  availableItems
                }
              </h3>
            </div>

            <div className="bg-white/10 border border-white/10 px-5 py-4 rounded-2xl min-w-[170px] backdrop-blur-sm">
              <p className="text-[#d6e0e8] text-sm">
                Sold Items
              </p>

              <h3 className="text-3xl font-black text-white mt-2">
                {soldItems}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex items-start xl:items-end">
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-sm min-w-[280px]">
            <p className="text-[#d6e0e8] text-sm">
              Today
            </p>

            <h2 className="text-2xl font-bold mt-3 leading-relaxed text-white">
              {date}
            </h2>

            <div className="mt-7 h-[1px] bg-white/20 rounded-full" />

            <div className="mt-5">
              <p className="text-[#d6e0e8] text-sm">
                System Status
              </p>

              <div className="flex items-center gap-3 mt-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

                <span className="text-green-300 font-medium">
                  All Systems
                  Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardHero;