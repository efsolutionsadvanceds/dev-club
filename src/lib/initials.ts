export function getInitials(nome: string): string {
  const words = nome.trim().split(/\s+/)
  if (words.length === 1) return nome.slice(0, 2).toUpperCase()
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}