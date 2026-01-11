export const delay = ms => new Promise(r => setTimeout(r, ms))

export function runtime(seconds) {
  seconds = Number(seconds)
  const d = Math.floor(seconds / 86400)
  const h = Math.floor(seconds / 3600) % 24
  const m = Math.floor(seconds / 60) % 60
  const s = Math.floor(seconds) % 60
  return `${d}d ${h}h ${m}m ${s}s`
}

