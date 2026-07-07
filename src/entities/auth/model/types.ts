export interface LoginDto {
  email: string
  password: string
}

export interface RegisterDto {
  email: string
  password: string
  acceptTerms: boolean
  acceptMarketing: boolean
}

export interface ForgotPasswordDto {
  email: string
  code: string
  password: string
}

export interface PasswordStrengthResult {
  level: 0 | 1 | 2 | 3 | 4
  label: string
}

export type AuthFlowType = 'login' | 'register' | 'forgot-password'
