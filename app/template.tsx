"use client";

import { motion } from "framer-motion";

/**
 * Transición suave entre páginas. Al ser un template (no un layout),
 * se vuelve a montar en cada navegación y dispara la animación.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
