import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import Ambient from './components/Ambient'
import Gift from './components/Gift'
import Letter from './components/Letter'
import Cards from './components/Cards'
import Cake from './components/Cake'
import Quiz from './components/Quiz'
import { Hero, Wishes, Celebration, Finale } from './components/Sections'
import { FxCanvas, confetti, hearts } from './lib/fx'
import { sfx, music } from './lib/audio'
export default function App() {
  const [stage, setStage] = useState('closed'), [on, setOn] = useState(false), [run, setRun] = useState(0)
  const open = () => {
    if (stage !== 'closed') return
    setStage('opening'); sfx.open(); music(true); setOn(true)
    setTimeout(() => { confetti(); hearts() }, 500); setTimeout(() => setStage('open'), 2200)
  }
  const toggle = () => { music(!on); setOn(!on) }
  const replay = () => { setStage('closed'); setRun(r => r + 1); window.scrollTo({ top: 0 }) }
  return <>
    <Ambient /><FxCanvas />
    <button onClick={toggle} aria-label={on ? 'Turn music off' : 'Turn music on'} className="fixed top-4 right-4 z-40 glass! rounded-full! p-3 glass cursor-pointer">{on ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
    <main key={run} className="relative z-10">
      {stage !== 'open' ? <Gift onOpen={open} opening={stage === 'opening'} /> : <>
        <Hero /><Wishes /><Letter /><Cards /><Cake /><Quiz /><Celebration /><Finale onReplay={replay} /></>}
    </main>
  </>
}
