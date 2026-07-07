import type { ForgotPasswordDto, LoginDto, RegisterDto } from '../model/types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const authApi = {
  async sendOtp(email: string) {
    await delay(300)
    console.info('[mock] sendOtp', email)
    return { success: true }
  },

  async verifyOtp(email: string, code: string) {
    await delay(300)
    console.info('[mock] verifyOtp', email, code)
    return { success: code.length === 6 }
  },

  async login({ email, password }: LoginDto) {
    await delay(300)
    console.info('[mock] login', email, password)
    return { success: Boolean(email && password) }
  },

  async register({ email, password }: RegisterDto) {
    await delay(300)
    console.info('[mock] register', email, password)
    return { success: Boolean(email && password) }
  },

  async resetPassword({ email, code, password }: ForgotPasswordDto) {
    await delay(300)
    console.info('[mock] resetPassword', email, code, password)
    return { success: Boolean(email && code && password) }
  },
}
