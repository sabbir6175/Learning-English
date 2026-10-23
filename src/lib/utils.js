export const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
export const normalize = (s) => s.trim().toLowerCase().replace(/\s+/g, ' ')
export const todayKey = () => new Date().toISOString().slice(0, 10)
export const yesterdayKey = () => new Date(Date.now() - 864e5).toISOString().slice(0, 10)
