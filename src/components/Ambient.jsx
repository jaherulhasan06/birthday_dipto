import { useMemo } from 'react'
export default function Ambient() {
  const items = useMemo(() => Array.from({ length: 34 }, (_, i) => ({ i, h: i < 14, l: Math.random() * 100, d: 12 + Math.random() * 16, dl: -Math.random() * 20, s: 10 + Math.random() * 22 })), [])
  return <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
    {items.map(o => o.h
      ? <span key={o.i} className="absolute left-0 top-0 text-pink-200/50" style={{ left: o.l + '%', fontSize: o.s, animation: `floatUp ${o.d}s linear ${o.dl}s infinite` }}>♥</span>
      : <span key={o.i} className="absolute rounded-full bg-white" style={{ left: o.l + '%', top: Math.random() * 100 + '%', width: 3, height: 3, boxShadow: '0 0 8px 2px #fff', animation: `twinkle ${2 + Math.random() * 3}s ease-in-out ${o.dl}s infinite` }} />)}
  </div>
}
