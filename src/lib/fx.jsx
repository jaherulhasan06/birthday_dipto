import { useEffect, useRef } from 'react'
let parts = [], ctx, cv, running = false
const COL = ['#ff7eb6', '#c084fc', '#a78bfa', '#f9a8d4', '#fde68a', '#93c5fd', '#ffffff']
const r = (a, b) => a + Math.random() * (b - a)
const pick = a => a[Math.floor(Math.random() * a.length)]
const mk = o => ({ x: 0, y: 0, vx: 0, vy: 0, g: .12, drag: .99, life: 120, s: 8, rot: 0, vr: 0, c: '#fff', k: 'c', ...o })
function loop() {
  if (!ctx) { running = false; return }
  ctx.clearRect(0, 0, cv.width, cv.height)
  parts = parts.filter(p => p.life > 0)
  ctx.textAlign = 'center'
  for (const p of parts) {
    p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= p.drag; p.rot += p.vr; p.life--
    ctx.save(); ctx.globalAlpha = Math.min(1, p.life / 30); ctx.translate(p.x, p.y); ctx.rotate(p.rot)
    if (p.t) { ctx.font = p.s + 'px serif'; ctx.fillText(p.t, 0, 0) }
    else { ctx.fillStyle = p.c
      if (p.k === 'c') ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2)
      else { ctx.shadowColor = p.c; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(0, 0, p.s / 2, 0, 7); ctx.fill() } }
    ctx.restore()
  }
  if (parts.length) requestAnimationFrame(loop); else { running = false; ctx.clearRect(0, 0, cv.width, cv.height) }
}
const add = ps => { parts.push(...ps); if (parts.length > 700) parts = parts.slice(-700); if (!running && ctx) { running = true; requestAnimationFrame(loop) } }
export const confetti = (x = innerWidth / 2, y = innerHeight * .6) => add(Array.from({ length: 110 }, () => {
  const a = r(-Math.PI * .95, -Math.PI * .05), v = r(5, 14)
  return mk({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: r(110, 190), s: r(7, 13), c: pick(COL), rot: r(0, 6), vr: r(-.3, .3) })
}))
export const hearts = () => add(Array.from({ length: 26 }, () =>
  mk({ x: r(0, innerWidth), y: innerHeight + 20, vy: -r(2, 5), vx: r(-.5, .5), g: -.005, drag: 1, life: 240, s: r(18, 34), t: pick(['💖', '💗', '✨', '💜', '🌸']) })))
export const firework = (x = r(innerWidth * .2, innerWidth * .8), y = r(innerHeight * .15, innerHeight * .5)) => {
  const c = pick(COL)
  add(Array.from({ length: 70 }, (_, i) => { const a = (i / 70) * Math.PI * 2, v = r(2, 6)
    return mk({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: .05, drag: .96, life: r(55, 85), s: r(3, 6), c, k: 'd' }) }))
}
export function FxCanvas() {
  const ref = useRef()
  useEffect(() => {
    cv = ref.current; ctx = cv.getContext('2d')
    const rs = () => { cv.width = innerWidth; cv.height = innerHeight }
    rs(); addEventListener('resize', rs)
    return () => { removeEventListener('resize', rs); ctx = null; parts = [] }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-50" />
}
