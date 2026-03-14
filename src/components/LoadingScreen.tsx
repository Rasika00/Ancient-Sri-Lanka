import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const ancientSymbols = ["☸", "🕉", "⚱", "♛", "☼", "◈", "⊕", "✦"];

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Spinning symbols */}
        <div className="relative h-48 w-48 md:h-64 md:w-64">
          {ancientSymbols.map((symbol, i) => {
            const angle = (i / ancientSymbols.length) * Math.PI * 2;
            const radius = 80;
            return (
              <motion.span
                key={i}
                className="absolute text-2xl md:text-3xl text-primary"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * radius}px - 14px)`,
                  top: `calc(50% + ${Math.sin(angle) * radius}px - 14px)`,
                }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              >
                {symbol}
              </motion.span>
            );
          })}

          {/* Center gem */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-primary/20 border-2 border-primary"
            animate={{
              boxShadow: [
                "0 0 20px hsl(40, 70%, 45%, 0.3)",
                "0 0 50px hsl(35, 90%, 55%, 0.6)",
                "0 0 20px hsl(40, 70%, 45%, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Title */}
        <motion.h1
          className="mt-8 text-2xl md:text-4xl font-display text-gold-gradient tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Ancient Sri Lanka
        </motion.h1>

        <motion.p
          className="mt-3 text-sm md:text-base font-accent text-muted-foreground tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Unveiling the treasures of the past
        </motion.p>

        {/* Progress bar */}
        <div className="mt-8 w-48 md:w-64 h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold-gradient rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
