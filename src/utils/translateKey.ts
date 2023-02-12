export function translateKey(key: string) {
  return key === ' ' ? 'SPACE' : key.toUpperCase()
}
