import { motion } from 'framer-motion'
import { Gift as GiftIcon } from 'lucide-react'
import { Btn } from './ui'
export default function Gift({ onOpen, opening }) {
  return <section className="min-h-screen flex flex-col items-center justify-center text-center px-5 gap-10 relative">
    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="hand text-4xl sm:text-6xl drop-shadow-lg leading-snug">
      Hey Dipto!<br />A Little Surprise Awaits You...</motion.h1>
    <motion.div animate={opening ? {} : { y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="relative w-56 h-60 sm:w-64 sm:h-72">
      <motion.div animate={{ opacity: opening ? 1 : .35, scale: opening ? 2.2 : 1 }} transition={{ duration: 1 }} className="absolute inset-0 rounded-full blur-3xl bg-yellow-200/70" />
      <div className="absolute bottom-0 inset-x-2 h-[62%] rounded-b-2xl bg-gradient-to-b from-pink-400 to-fuchsia-600 shadow-2xl">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-gradient-to-b from-yellow-200 to-amber-300" />
      </div>
      <motion.div animate={opening ? { y: -110, rotate: -22, x: -30, opacity: .9 } : {}} transition={{ duration: .9, type: 'spring' }} className="absolute left-0 right-0 bottom-[60%] h-[22%] rounded-xl bg-gradient-to-b from-pink-300 to-pink-500 shadow-lg">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-9 bg-amber-300" />
        <div className="absolute -top-7 left-1/2 -translate-x-[110%] w-12 h-9 rounded-full border-[7px] border-amber-300 -rotate-12" />
        <div className="absolute -top-7 left-1/2 translate-x-[10%] w-12 h-9 rounded-full border-[7px] border-amber-300 rotate-12" />
      </motion.div>
      {opening && Array.from({ length: 10 }).map((_, i) => <motion.span key={i} initial={{ opacity: 1, y: 0, x: 0 }} animate={{ opacity: 0, y: -160 - i * 12, x: (i - 5) * 22 }} transition={{ duration: 1.6, delay: .3 + i * .05 }} className="absolute left-1/2 top-1/3 text-2xl">✨</motion.span>)}
    </motion.div>
    <Btn onClick={onOpen} className="text-lg"><GiftIcon size={20} /> Open Your Surprise</Btn>
  </section>
}
