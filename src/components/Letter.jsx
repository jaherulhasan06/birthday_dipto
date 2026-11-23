import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MailOpen } from 'lucide-react'
import { Section, Title, Btn } from './ui'
import { sfx } from '../lib/audio'
const TEXT = `Dear Punam,

Happy Birthday! Today I wanted to pause and tell you how grateful I am to have you as my friend. Some people make life feel lighter just by being in it, and you are one of them.

Thank you for your kindness, your warmth, and the way you make ordinary days feel brighter. A true friend is rare, and I never take that for granted.

On this special day, I hope you feel as loved and appreciated as you make others feel. I hope this year is full of laughter, peace, and little moments that turn into beautiful memories.

Thank you for being you.

Always cheering for you,
Your friend`
export default function Letter() {
  const [open, setOpen] = useState(false), [n, setN] = useState(0)
  useEffect(() => {
    if (!open) return
    let i = 0; const id = setInterval(() => { i++; setN(i); if (i >= TEXT.length) clearInterval(id) }, 28)
    return () => clearInterval(id)
  }, [open])
  return <Section id="letter"><Title>A Birthday Letter for You</Title>
    <div className="relative w-72 h-48 mb-10">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-200 to-purple-200 shadow-2xl" />
      <motion.div animate={{ y: open ? -60 : 0 }} transition={{ duration: .8 }} className="absolute left-4 right-4 top-4 h-40 bg-white rounded-md" style={{ zIndex: 1 }} />
      <div className="absolute inset-0 rounded-xl bg-pink-300" style={{ zIndex: 2, clipPath: 'polygon(0 0,50% 55%,100% 0,100% 100%,0 100%)' }} />
      <motion.div animate={{ rotateX: open ? 180 : 0 }} transition={{ duration: .7 }} className="absolute top-0 inset-x-0 h-28 origin-top bg-pink-400 flex items-start justify-center pt-5" style={{ zIndex: open ? 1 : 3, clipPath: 'polygon(0 0,100% 0,50% 100%)' }}>
        <Heart className="fill-white" size={26} /></motion.div>
    </div>
    {!open ? <Btn onClick={() => { sfx.open(); setOpen(true) }}><MailOpen size={18} /> Open Letter</Btn>
      : <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="glass bg-white/90! max-w-xl w-full p-6 sm:p-10 text-left text-purple-900 bg-white/85">
        <p className={`hand text-2xl sm:text-3xl whitespace-pre-wrap leading-relaxed ${n < TEXT.length ? 'caret' : ''}`}>{TEXT.slice(0, n)}</p></motion.div>}
  </Section>
}
