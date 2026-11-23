let ac, on = false, timer
const A = () => ac || (ac = new (window.AudioContext || window.webkitAudioContext)())
function tone(f, d = .3, type = 'sine', v = .08, at = 0) {
  try { const a = A(), o = a.createOscillator(), g = a.createGain(), t = a.currentTime + at
    o.type = type; o.frequency.value = f
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + d)
    o.connect(g).connect(a.destination); o.start(t); o.stop(t + d + .05) } catch {}
}
const arp = (fs, step, type = 'triangle', v = .1) => fs.forEach((f, i) => tone(f, .4, type, v, i * step))
export const sfx = {
  open: () => arp([523, 659, 784, 1047], .09),
  win: () => arp([659, 784, 988, 1319, 1568], .08),
  tap: () => tone(740, .12, 'sine', .06),
  right: () => arp([660, 880], .09),
  wrong: () => arp([300, 220], .12, 'sawtooth', .04),
  blow: () => tone(180, .5, 'sawtooth', .03),
}
// "Happy Birthday" melody: [semitones above C4, beats]
const M = [[0,.75],[0,.25],[2,1],[0,1],[5,1],[4,2],[0,.75],[0,.25],[2,1],[0,1],[7,1],[5,2],[0,.75],[0,.25],[12,1],[9,1],[5,1],[4,1],[2,2],[10,.75],[10,.25],[9,1],[5,1],[7,1],[5,2]]
export function music(enable) {
  clearTimeout(timer); on = enable; if (!enable) return
  try { A().resume() } catch {}
  let i = 0
  const step = () => {
    if (!on) return
    const [n, b] = M[i]; tone(261.63 * 2 ** (n / 12), b * .5 + .25, 'triangle', .05)
    i = (i + 1) % M.length; timer = setTimeout(step, b * 500 + (i === 0 ? 2500 : 0))
  }
  step()
}
