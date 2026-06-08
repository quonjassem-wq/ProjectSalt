"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert } from "lucide-react";

export default function InspectGuard() {
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If they were caught before and haven't clicked sorry yet, show modal
    if (localStorage.getItem("salt_inspect_caught") === "true") {
      setCaught(true);
    }

    const trigger = () => {
      localStorage.setItem("salt_inspect_caught", "true");
      setCaught(true);
    };

    const handleKeyDown = (e) => {
      const blocked =
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && [73, 74, 67, 75].includes(e.keyCode)) ||
        (e.ctrlKey && e.keyCode === 85); // Ctrl+U

      if (blocked) {
        e.preventDefault();
        e.stopPropagation();
        trigger();
        return false;
      }
    };

    const handleContext = (e) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContext, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContext, true);
    };
  }, []);

  const handleSorry = () => {
    localStorage.removeItem("salt_inspect_caught");
    setCaught(false);
  };

  return (
    <AnimatePresence>
      {caught && (
        <motion.div
          key="inspect-guard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 999999,
            background: "rgba(0,0,0,0.97)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full"
              style={{
                width: 600,
                height: 600,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)",
              }}
            />
            <motion.div
              animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full"
              style={{
                width: 900,
                height: 900,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                background:
                  "radial-gradient(circle, rgba(220,38,38,0.1) 0%, transparent 70%)",
              }}
            />
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)",
            }}
          />

          <motion.div
            initial={{ scale: 0.4, y: 60, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 14, stiffness: 180 }}
            className="relative max-w-md w-full mx-6 rounded-3xl overflow-hidden"
            style={{
              background:
                "linear-gradient(145deg, rgba(20,5,5,0.98), rgba(8,0,0,0.99))",
              border: "1px solid rgba(239,68,68,0.4)",
              boxShadow:
                "0 0 120px rgba(239,68,68,0.25), 0 30px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <div
              style={{
                height: 4,
                background: "linear-gradient(90deg,#ef4444,#dc2626,#b91c1c)",
              }}
            />

            <div className="p-10 text-center space-y-8">
              <motion.div
                animate={{ rotate: [0, -12, 12, -12, 12, -6, 6, 0] }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className="inline-flex items-center justify-center w-28 h-28 rounded-full mx-auto"
                style={{
                  background:
                    "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(239,68,68,0.05) 100%)",
                  border: "2px solid rgba(239,68,68,0.4)",
                  boxShadow: "0 0 40px rgba(239,68,68,0.2)",
                }}
              >
                <ShieldAlert size={56} color="#ef4444" />
              </motion.div>

              <div className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div
                    className="text-xs font-black tracking-[0.4em] uppercase mb-2"
                    style={{ color: "#ef4444" }}
                  >
                    ⚠ security alert ⚠
                  </div>
                  <h2
                    className="text-4xl font-black text-white leading-tight"
                    style={{ textShadow: "0 0 30px rgba(239,68,68,0.5)" }}
                  >
                    Caught You.
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="space-y-2"
                >
                  <p className="text-xl font-bold" style={{ color: "#fca5a5" }}>
                    Caught you trying to get the source
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Do you want to get banned? Think twice before trying to
                    inspect Salt's source code.
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
              >
                <motion.button
                  onClick={handleSorry}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 12px 40px rgba(239,68,68,0.5)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-5 rounded-2xl font-black text-xl text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
                    boxShadow: "0 8px 32px rgba(239,68,68,0.35)",
                    letterSpacing: "0.05em",
                  }}
                >
                  🙏 I am sorry
                </motion.button>
                <p className="text-xs text-gray-600 mt-3">
                  This is the only way out.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
