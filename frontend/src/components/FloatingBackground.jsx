import { motion } from "framer-motion";

function FloatingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#31475a]/8 blur-[140px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
        }}
        className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-[#6e879d]/8 blur-[160px] rounded-full"
      />

      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
        }}
        className="absolute top-[40%] left-[45%] w-[320px] h-[320px] bg-[#90a4b8]/6 blur-[120px] rounded-full"
      />
    </div>
  );
}

export default FloatingBackground;