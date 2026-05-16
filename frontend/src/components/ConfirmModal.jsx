import { motion } from "framer-motion";

function ConfirmModal({
  open,
  title,
  message,
  confirmText,
  confirmColor,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-6"
    >
      <motion.div
        initial={{
          scale: 0.95,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
        }}
        className="bg-white border border-[#dfe5ea] rounded-[28px] w-full max-w-md p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
      >
        <h2 className="text-2xl font-bold text-[#1f2933]">
          {title}
        </h2>

        <p className="text-[#6b7280] mt-4 leading-relaxed">
          {message}
        </p>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-3 rounded-2xl bg-[#eef3f7] hover:bg-[#dde6ee] text-[#31475a] font-medium transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`px-5 py-3 rounded-2xl font-semibold transition text-white
              
              ${
                confirmColor ===
                "red"
                  ? "bg-red-500 hover:bg-red-600"

                  : confirmColor ===
                    "green"
                  ? "bg-green-500 hover:bg-green-600"

                  : confirmColor ===
                    "blue"
                  ? "bg-blue-500 hover:bg-blue-600"

                  : "bg-[#31475a] hover:bg-[#3d556b]"
              }
            `}
          >
            {confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ConfirmModal;