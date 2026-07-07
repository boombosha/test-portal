import type { PasswordStrengthResult } from '../model/types'

const LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: 'Слабый',
  2: 'Средний',
  3: 'Хороший',
  4: 'Отличный',
}

export function calcPasswordStrength(password: string): PasswordStrengthResult {
  if (password.length < 8) {
    return { level: 0, label: '' }
  }

  const hasLetter = /[A-Za-zА-Яа-яЁё]/.test(password)
  const hasDigit = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-zА-Яа-яЁё0-9]/.test(password)

  let level: 1 | 2 | 3 | 4

  if (password.length >= 12 && hasLetter && hasDigit && hasSpecial) {
    level = 4
  } else if (password.length >= 10 && hasSpecial) {
    level = 3
  } else if (password.length >= 8 && hasLetter && hasDigit) {
    level = 2
  } else {
    level = 1
  }

  return { level, label: LABELS[level] }
}
