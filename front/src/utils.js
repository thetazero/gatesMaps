export function formatTime(seconds) {
  seconds = Math.round(seconds)
  return `${seconds}s`
}

export function niceNumber(num, afterzero) {
  if (num === 0) return `0.${'0'.repeat(afterzero)}`
  let r = Math.floor(num * (10 ** afterzero)) / (10 ** afterzero)
  let digits = Math.ceil(r)
  digits = Math.log(digits) * Math.LOG10E + 1 | 0
  if (String(r).length === digits + 1) return String(r)
  if (String(r).length > digits + 1) return `${r}`.padEnd(digits + afterzero + 1, '0')
  return `${r}.`.padEnd(digits + afterzero + 1, '0')
}