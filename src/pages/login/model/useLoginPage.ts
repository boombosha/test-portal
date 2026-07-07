import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authApi, useAuthFlowStore } from '@/entities/auth'
import { useStepWizard } from '@/features/auth-step-wizard'

const HEADINGS = ['Войти', 'Добро пожаловать!']

export function useLoginPage() {
  const router = useRouter()
  const authFlow = useAuthFlowStore()
  const wizard = useStepWizard(2, HEADINGS)

  const email = ref('')
  const password = ref('')

  async function submitEmail() {
    authFlow.email = email.value
    wizard.goNext()
  }

  async function submitLogin() {
    await authApi.login({ email: email.value, password: password.value })
    router.push('/')
  }

  return {
    ...wizard,
    email,
    password,
    submitEmail,
    submitLogin,
  }
}
