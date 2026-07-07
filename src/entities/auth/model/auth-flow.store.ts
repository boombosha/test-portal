import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthFlowType } from './types'

export const useAuthFlowStore = defineStore('authFlow', () => {
  const flow = ref<AuthFlowType | null>(null)
  const email = ref('')
  const otpCode = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  function reset() {
    flow.value = null
    email.value = ''
    otpCode.value = ''
    password.value = ''
    passwordConfirm.value = ''
  }

  function start(nextFlow: AuthFlowType) {
    reset()
    flow.value = nextFlow
  }

  return {
    flow,
    email,
    otpCode,
    password,
    passwordConfirm,
    reset,
    start,
  }
})
