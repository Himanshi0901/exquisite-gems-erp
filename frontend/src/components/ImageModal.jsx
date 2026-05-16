import { motion } from "framer-motion";

function ImageModal({
  image,
  onClose,
}) {
  if (!image) return null;

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
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-8"
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
          duration: 0.3,
        }}
        onClick={(e) =>
          e.stopPropagation()
        }
        className="relative max-w-6xl w-full"
      >
        <button
          onClick={onClose}
          className="absolute -top-14 right-0 w-11 h-11 rounded-full bg-white text-[#31475a] text-3xl flex items-center justify-center shadow-md hover:bg-[#eef3f7] transition"
        >
          ×
        </button>

        <div className="bg-white rounded-[28px] overflow-hidden border border-[#dfe5ea] shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          <div className="bg-[#f8fafb] border-b border-[#dfe5ea] px-6 py-4">
            <h2 className="text-lg font-semibold text-[#31475a]">
              Jewellery Preview
            </h2>
          </div>

          <img
            src={image}
            alt="Jewellery"
            className="w-full max-h-[85vh] object-contain bg-[#f8fafb] p-6"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ImageModal;