import { PASSWORD_MIN_LENGTH } from '@/shared/config/constants'

export function validatePassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH
}

export function validatePasswordMatch(password: string, confirm: string): boolean {
  return Boolean(password) && password === confirm
}
