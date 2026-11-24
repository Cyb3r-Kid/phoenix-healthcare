"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduced ? {} : { y: [12, 0] }} viewport={{ once: true, amount: .1 }} transition={{ duration: .45 }}>{children}</motion.div>;
}
