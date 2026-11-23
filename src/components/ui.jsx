import { motion } from 'framer-motion'
export const Rise = ({ children, delay = 0, className = '' }) => (
  <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .8, delay }} className={className}>{children}</motion.div>)
export const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative min-h-screen flex flex-col items-center justify-center text-center px-5 py-20 overflow-hidden ${className}`}>{children}</section>)
export const Title = ({ children }) => <Rise><h2 className="hand text-4xl sm:text-6xl drop-shadow-[0_2px_12px_rgba(255,255,255,.45)] mb-8">{children}</h2></Rise>
export const Btn = ({ children, onClick, className = '' }) => (
  <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: .95 }} onClick={onClick}
    className={`px-7 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/40 border border-white/40 cursor-pointer inline-flex items-center gap-2 ${className}`}>{children}</motion.button>)
export const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
