import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Wind, Mic } from 'lucide-react'
import { Section, Title, Btn } from './ui'
import { sfx } from '../lib/audio'
import { confetti, firework } from '../lib/fx'
const xs = [125, 150, 175]
const Tier = ({ y, w, h, c1, c2 }) => <g>
  <ellipse cx="150" cy={y + h} rx={w / 2} ry="11" fill={c2} /><rect x={150 - w / 2} y={y} width={w} height={h} fill={c1} />
  <ellipse cx="150" cy={y + h} rx={w / 2} ry="11" fill={c1} /><ellipse cx="150" cy={y} rx={w / 2} ry="11" fill="#fff5fb" />
  {Array.from({ length: Math.floor(w / 28) }, (_, i) => <circle key={i} cx={150 - w / 2 + 18 + i * 28} cy={y + h * .55} r="3" fill={['#fde68a', '#fff', '#a78bfa'][i % 3]} />)}</g>
export default function Cake() {
  const [lit, setLit] = useState([false, false, false]), [out, setOut] = useState(false), [mic, setMic] = useState(false), [err, setErr] = useState(false)
  const stopRef = useRef(null), anyLit = lit.some(Boolean)
  useEffect(() => () => stopRef.current?.(), [])
  const light = i => { sfx.tap(); setOut(false); setLit(l => l.map((v, j) => (i === 'all' || i === j ? true : v))) }
  const blow = () => {
    stopRef.current?.(); sfx.blow(); setLit([false, false, false]); setOut(true)
    setTimeout(() => { sfx.win(); confetti(); [0, 250, 500, 800].forEach(t => setTimeout(firework, t)) }, 400)
  }
  async function listen() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true }), a = new AudioContext(), an = a.createAnalyser()
      an.fftSize = 512; a.createMediaStreamSource(s).connect(an)
      const d = new Uint8Array(an.fftSize); let live = true, hits = 0
      stopRef.current = () => { live = false; s.getTracks().forEach(t => t.stop()); a.close(); setMic(false); stopRef.current = null }
      setMic(true); setErr(false)
      const tick = () => {
        if (!live) return
        an.getByteTimeDomainData(d); let sum = 0; for (const v of d) { const x = (v - 128) / 128; sum += x * x }
        hits = Math.sqrt(sum / d.length) > .18 ? hits + 1 : 0
        if (hits > 10) { blow(); return } requestAnimationFrame(tick)
      }
      tick()
    } catch { setErr(true) }
  }
  return <Section id="cake"><Title>Make a Wish, Dipto!</Title>
    <svg viewBox="0 0 300 270" className="w-72 sm:w-96 drop-shadow-2xl" role="img" aria-label="Birthday cake">
      <ellipse cx="150" cy="250" rx="145" ry="18" fill="#e9d5ff" /><ellipse cx="150" cy="244" rx="140" ry="16" fill="#f5f3ff" />
      <Tier y={170} w={230} h={70} c1="#f9a8d4" c2="#db2777" /><Tier y={115} w={165} h={55} c1="#c4b5fd" c2="#7c3aed" /><Tier y={70} w={110} h={45} c1="#fbcfe8" c2="#ec4899" />
      {xs.map((x, i) => <g key={x} onClick={() => light(i)} className="cursor-pointer">
        <rect x={x - 4} y="40" width="8" height="34" rx="2" fill={['#fde68a', '#fff', '#93c5fd'][i]} /><rect x={x - 14} y="12" width="28" height="60" fill="transparent" />
        {lit[i] && <g transform={`translate(${x},40)`}><path className="flame" d="M0 0C-7-5-5-14 0-22 5-14 7-5 0 0z" fill="#fbbf24" stroke="#f97316" /></g>}</g>)}
    </svg>
    <div className="flex flex-wrap gap-3 justify-center mt-8">
      {!anyLit ? <Btn onClick={() => light('all')}><Flame size={18} /> {out ? 'Light them again' : 'Light the candles'}</Btn> : <>
        <Btn onClick={blow}><Wind size={18} /> Blow them out</Btn>
        <Btn onClick={mic ? () => stopRef.current?.() : listen} className="from-purple-500! to-indigo-500!"><Mic size={18} /> {mic ? 'Listening… blow!' : 'Use microphone'}</Btn></>}
    </div>
    {err && <p className="mt-3 text-sm text-pink-100">Microphone isn’t available, so use the button instead.</p>}
    <AnimatePresence>{out && <motion.p initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} className="hand text-4xl sm:text-5xl mt-8 shimmer">May all your wishes come true!</motion.p>}</AnimatePresence>
  </Section>
}
