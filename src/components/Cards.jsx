import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smile, Heart, Sparkles, Sun, HeartHandshake, Shield, Flower2, PartyPopper, Camera, Star } from 'lucide-react'
import { Section, Title, Rise } from './ui'
import { sfx } from '../lib/audio'
import { confetti } from '../lib/fx'
const items = [[Smile, 'Your beautiful smile', 'It lights up every room you walk into.'], [Heart, 'Your kind heart', 'Your kindness makes the world a softer place.'],
  [Sparkles, 'Your unique personality', 'There is simply no one else like you.'], [Sun, 'Your positive energy', 'You bring brightness wherever you go.'],
  [HeartHandshake, 'Your caring nature', 'You make people feel seen and valued.'], [Shield, 'Your strength', 'You face challenges with grace and courage.'],
  [Flower2, 'Your beautiful spirit', 'Gentle, graceful and full of light.'], [PartyPopper, 'The happiness you spread', 'Your joy is wonderfully contagious.'],
  [Camera, 'Your ability to make moments memorable', 'Even simple moments become special.'], [Star, 'Simply being yourself', 'And that is more than enough.']]
function Card({ n, Icon, title, text, onFlip }) {
  const [f, setF] = useState(false)
  const face = 'absolute inset-0 glass flex flex-col items-center justify-center p-4 gap-2 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]'
  return <Rise delay={(n % 4) * .08}>
    <div className="h-48 [perspective:1000px] cursor-pointer" onClick={() => { sfx.tap(); if (!f) onFlip(); setF(!f) }}>
      <motion.div animate={{ rotateY: f ? 180 : 0 }} transition={{ duration: .6 }} className="relative w-full h-full [transform-style:preserve-3d]">
        <div className={face}><span className="hand text-3xl text-pink-100">{n + 1}</span><Icon size={34} className="text-pink-100" /><span className="text-xs text-white/80">Tap to reveal</span></div>
        <div className={face + ' [transform:rotateY(180deg)] bg-white/25'}><Icon size={24} /><h3 className="hand text-2xl leading-tight">{title}</h3><p className="text-sm text-white/90">{text}</p></div>
      </motion.div>
    </div>
  </Rise>
}
export default function Cards() {
  const [seen, setSeen] = useState(0)
  const flip = () => { const s = seen + 1; setSeen(s); if (s === 10) confetti() }
  return <Section id="cards"><Title>10 Things That Make You Special</Title>
    <p className="mb-8 text-white/80">{seen}/10 revealed</p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl w-full">
      {items.map(([I, t, x], i) => <Card key={i} n={i} Icon={I} title={t} text={x} onFlip={flip} />)}</div>
  </Section>
}
