import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, Title, Btn } from './ui'
import { sfx } from '../lib/audio'
import { confetti, firework } from '../lib/fx'
const Q = [['What do people traditionally do before blowing out birthday candles?', ['Sing a lullaby', 'Make a wish', 'Take a nap', 'Count backwards'], 1],
  ['Which treat is the classic centrepiece of a birthday party?', ['Cake', 'Soup', 'Salad', 'Toast'], 0],
  ['What song is sung while the cake arrives?', ['Jingle Bells', 'Twinkle Twinkle', 'Happy Birthday to You', 'Row Your Boat'], 2],
  ['What is usually hiding inside a party piñata?', ['Candy and treats', 'Socks', 'Spaghetti', 'Pebbles'], 0],
  ['Which of these is NOT usually found at a birthday party?', ['Balloons', 'Confetti', 'Gifts', 'A snow shovel'], 3]]
export default function Quiz() {
  const [i, setI] = useState(0), [score, setScore] = useState(0), [pick, setPick] = useState(null)
  const done = i >= Q.length
  const choose = k => { if (pick !== null) return; setPick(k); const ok = k === Q[i][2]; ok ? (sfx.right(), setScore(s => s + 1)) : sfx.wrong() }
  const next = () => { const n = i + 1; setPick(null); setI(n); if (n >= Q.length) { sfx.win(); confetti(); [0, 300, 600].forEach(t => setTimeout(firework, t)) } }
  const reset = () => { setI(0); setScore(0); setPick(null) }
  return <Section id="quiz"><Title>Birthday Challenge!</Title>
    <div className="glass p-6 sm:p-8 max-w-xl w-full">
      <AnimatePresence mode="wait"><motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: .35 }}>
        {!done ? <>
          <div className="flex justify-between text-sm text-white/80 mb-4"><span>Question {i + 1} of {Q.length}</span><span>Score: {score}</span></div>
          <h3 className="text-xl font-medium mb-5">{Q[i][0]}</h3>
          <div className="grid gap-3">{Q[i][1].map((o, k) => {
            const right = pick !== null && k === Q[i][2], wrong = pick === k && k !== Q[i][2]
            return <motion.button key={k} whileTap={{ scale: .97 }} onClick={() => choose(k)} className={`rounded-xl px-4 py-3 border cursor-pointer text-left transition-colors ${right ? 'bg-emerald-500/70 border-emerald-200' : wrong ? 'bg-rose-500/70 border-rose-200' : 'bg-white/10 border-white/30 hover:bg-white/25'}`}>{o}</motion.button> })}</div>
          {pick !== null && <div className="mt-5 flex items-center justify-between gap-3"><span>{pick === Q[i][2] ? '🎉 Correct!' : '😄 Oops, not quite!'}</span><Btn onClick={next}>{i === Q.length - 1 ? 'See score' : 'Next'}</Btn></div>}
        </> : <div className="py-4"><div className="text-6xl mb-3">🏆</div>
          <h3 className="hand text-4xl mb-2">You scored {score} / {Q.length}!</h3>
          <p className="mb-6 text-white/90">{score === Q.length ? 'Perfect! A true party expert!' : score >= 3 ? 'Great job! Party ready!' : 'Every party needs a good sport. Well played!'}</p><Btn onClick={reset}>Play again</Btn></div>}
      </motion.div></AnimatePresence>
    </div>
  </Section>
}
