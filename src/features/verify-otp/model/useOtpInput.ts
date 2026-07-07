import { computed, onMounted, ref } from 'vue'
import { OTP_LENGTH } from '@/shared/config/constants'

export function useOtpInput(length = OTP_LENGTH) {
  const digits = ref<string[]>(Array.from({ length }, () => ''))
  const hasError = ref(false)
  const inputRefs = ref<HTMLInputElement[]>([])

  const code = computed(() => digits.value.join(''))
  const isComplete = computed(() => code.value.length === length)

  function setRef(el: HTMLInputElement | null, index: number) {
    if (el) inputRefs.value[index] = el
  }

  function focusAt(index: number) {
    inputRefs.value[index]?.focus()
  }

  function clearError() {
    hasError.value = false
  }

  function reset() {
    digits.value = Array.from({ length }, () => '')
    hasError.value = false
  }

  function handleInput(index: number, event: Event) {
    const target = event.target as HTMLInputElement
    const value = target.value.replace(/\D/g, '')
    digits.value[index] = value ? value[value.length - 1] : ''
    clearError()

    if (value && index < length - 1) {
      focusAt(index + 1)
    }
  }

  function handleKeydown(index: number, event: KeyboardEvent) {
    if (event.key === 'Backspace' && !digits.value[index] && index > 0) {
      focusAt(index - 1)
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      focusAt(index - 1)
    }
    if (event.key === 'ArrowRight' && index < length - 1) {
      focusAt(index + 1)
    }
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault()
    const text = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, length)

    text.split('').forEach((char, index) => {
      digits.value[index] = char
    })

    const nextEmpty = digits.value.findIndex((digit) => !digit)
    focusAt(nextEmpty >= 0 ? nextEmpty : length - 1)
    clearError()
  }

  function validate() {
    hasError.value = !isComplete.value
    return !hasError.value
  }

  onMounted(() => {
    focusAt(0)
  })

  return {
    digits,
    hasError,
    code,
    isComplete,
    setRef,
    handleInput,
    handleKeydown,
    handlePaste,
    validate,
    reset,
    focusAt,
    clearError,
  }
}
