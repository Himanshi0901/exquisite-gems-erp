import { motion } from "framer-motion";

function StatCard({
  title,
  value,
}) {
  const isWarning =
    title ===
    "Expiring Soon";

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`relative overflow-hidden rounded-[22px] p-5 h-[150px] flex flex-col justify-between border shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300
      
      ${
        isWarning
          ? "bg-orange-50 border-orange-200"
          : "bg-white border-[#dfe5ea]"
      }
      `}
    >
      {/* TOP BORDER */}

      <div
        className={`absolute top-0 left-0 w-full h-1
        
        ${
          isWarning
            ? "bg-gradient-to-r from-orange-400 to-orange-500"
            : "bg-gradient-to-r from-[#31475a] to-[#6e879d]"
        }
      `}
      />

      {/* TITLE */}

      <div className="relative z-10">
        <p
          className={`text-sm font-medium tracking-wide
          
          ${
            isWarning
              ? "text-orange-700"
              : "text-[#7b8794]"
          }
        `}
        >
          {title}
        </p>
      </div>

      {/* VALUE */}

      <div className="relative z-10 flex items-end justify-between">
        <h2
          className={`text-5xl font-black leading-none
          
          ${
            isWarning
              ? "text-orange-600"
              : "text-[#31475a]"
          }
        `}
        >
          {value}
        </h2>

        <span
          className={`text-[11px] font-semibold uppercase tracking-wide
          
          ${
            isWarning
              ? "text-orange-500"
              : "text-[#9aa5b1]"
          }
        `}
        >
          Live
        </span>
      </div>
    </motion.div>
  );
}

export default StatCard;