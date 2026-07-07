import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, useAuthFlowStore } from '@/entities/auth'
import { useStepWizard } from '@/features/auth-step-wizard'

const HEADINGS = ['Восстановление', 'Подтверждение', 'Новый пароль', 'Готово']

export function useForgotPasswordPage() {
  const router = useRouter()
  const authFlow = useAuthFlowStore()
  const wizard = useStepWizard(4, HEADINGS)

  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')

  async function submitEmail() {
    authFlow.email = email.value
    await authApi.sendOtp(email.value)
    wizard.goNext()
  }

  async function submitOtp(code: string) {
    authFlow.otpCode = code
    await authApi.verifyOtp(email.value, code)
    wizard.goNext()
  }

  async function submitPassword() {
    await authApi.resetPassword({
      email: email.value,
      code: authFlow.otpCode,
      password: password.value,
    })
    wizard.goNext()
  }

  function goToLogin() {
    router.push('/login')
  }

  return {
    ...wizard,
    email,
    password,
    passwordConfirm,
    submitEmail,
    submitOtp,
    submitPassword,
    goToLogin,
  }
}
