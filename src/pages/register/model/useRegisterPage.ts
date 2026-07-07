import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, useAuthFlowStore } from '@/entities/auth'
import { useStepWizard } from '@/features/auth-step-wizard'

const HEADINGS = ['Регистрация', 'Подтверждение', 'Пароль', 'Готово']

export function useRegisterPage() {
  const router = useRouter()
  const authFlow = useAuthFlowStore()
  const wizard = useStepWizard(4, HEADINGS)

  const email = ref('')
  const password = ref('')
  const passwordConfirm = ref('')
  const acceptTerms = ref(false)
  const acceptMarketing = ref(false)
  const termsRef = ref<{ validate: () => boolean } | null>(null)

  async function submitEmail() {
    if (!termsRef.value?.validate()) return
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
    await authApi.register({
      email: email.value,
      password: password.value,
      acceptTerms: acceptTerms.value,
      acceptMarketing: acceptMarketing.value,
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
    acceptTerms,
    acceptMarketing,
    termsRef,
    submitEmail,
    submitOtp,
    submitPassword,
    goToLogin,
  }
}
