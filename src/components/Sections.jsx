import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, PartyPopper, RotateCcw } from 'lucide-react'
import { Section, Title, Rise, Btn, go } from './ui'
import { sfx } from '../lib/audio'
import { confetti, hearts, firework } from '../lib/fx'
export const Hero = () => {
  useEffect(() => { window.scrollTo(0, 0); const t = setTimeout(() => { sfx.win(); confetti(); hearts() }, 300); return () => clearTimeout(t) }, [])
  return <Section id="hero">
    <h1 className="hand text-6xl sm:text-8xl md:text-9xl leading-tight shimmer">
      {['HAPPY', 'BIRTHDAY,', 'PUNAM!'].map((w, i) => <motion.span key={w} className="block" initial={{ opacity: 0, scale: .3, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .2 + i * .35, type: 'spring', stiffness: 120 }}>{w}</motion.span>)}</h1>
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="max-w-xl mt-8 text-lg sm:text-xl text-white/90">Today is all about celebrating someone truly special. May your day be as beautiful as your heart!</motion.p>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-10"><Btn onClick={() => go('wishes')}>Continue <ChevronDown size={18} /></Btn></motion.div>
  </Section>
}
const wishes = ['Another year of beautiful possibilities, new adventures, endless happiness, and countless reasons to smile.',
  'May every dream you carry come closer to reality. May life surprise you with beautiful moments, genuine happiness, success, and peace.',
  'Keep smiling, keep shining, and always stay wonderful.']
export const Wishes = () => <Section id="wishes"><Title>Birthday Wishes</Title>
  <div className="max-w-2xl space-y-5">{wishes.map((w, i) => <Rise key={i} delay={i * .3} className="glass p-6"><p className="hand text-2xl sm:text-3xl leading-relaxed">{w}</p></Rise>)}
    <Rise delay={.3}><p className="hand text-4xl sm:text-5xl shimmer pt-4">Wishing you the happiest birthday, Punam!</p></Rise></div></Section>
export const Celebration = () => {
  const [c, setC] = useState(null)
  const start = () => {
    if (c !== null && c > 0) return
    setC(3); sfx.tap()
    ;[2, 1].forEach((n, k) => setTimeout(() => { setC(n); sfx.tap() }, (k + 1) * 1000))
    setTimeout(() => { setC(0); sfx.win(); confetti(); hearts(); for (let k = 0; k < 8; k++) setTimeout(firework, k * 450) }, 3000)
  }
  const col = ['#f472b6', '#a78bfa', '#fbbf24', '#60a5fa', '#34d399', '#fb7185']
  return <Section id="celebrate">
    {col.concat(col).map((b, i) => <div key={i} aria-hidden className="absolute -bottom-24" style={{ left: `${6 + i * 8}%`, animation: `rise ${9 + (i % 4) * 2}s linear ${-i * 1.7}s infinite` }}>
      <div className="w-12 h-16 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] opacity-80" style={{ background: b, boxShadow: 'inset -6px -6px 12px rgba(0,0,0,.15)' }} /><div className="w-px h-14 bg-white/60 mx-auto" /></div>)}
    <Rise className="relative z-10"><h2 className="hand text-4xl sm:text-6xl mb-8 max-w-2xl drop-shadow-lg">Today is your day, Punam. Enjoy every second of it!</h2></Rise>
    <div className="relative z-10 h-28 flex items-center justify-center">
      {c ? <motion.div key={c} initial={{ scale: 2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="hand text-8xl">{c}</motion.div> : <Btn onClick={start}><PartyPopper size={18} /> {c === 0 ? 'Celebrate again' : 'Start the countdown'}</Btn>}
    </div>
  </Section>
}
export const Finale = ({ onReplay }) => <Section id="finale" className="bg-gradient-to-b from-transparent via-purple-950/50 to-purple-950/80">
  <Rise><h2 className="hand text-6xl sm:text-8xl shimmer mb-8">Happy Birthday, Punam!</h2></Rise>
  <Rise delay={.6} className="glass p-6 sm:p-10 max-w-2xl space-y-4 text-lg sm:text-xl leading-relaxed">
    <p>May your journey ahead be filled with happiness, success, beautiful opportunities, and unforgettable experiences. May you always have the courage to chase your dreams and the strength to overcome every challenge.</p>
    <p>Never stop smiling, never stop growing, and always remember that you deserve all the happiness in the world.</p>
    <p className="hand text-3xl">Have the most wonderful birthday!</p></Rise>
  <Rise delay={1.2} className="mt-10"><Btn onClick={onReplay}><RotateCcw size={18} /> Replay the Experience</Btn></Rise>
</Section>
