import { onScopeDispose, ref } from 'vue'

export function useCountdown(initialSeconds: number) {
  const secondsLeft = ref(0)
  const isActive = ref(false)
  let timerId: ReturnType<typeof setInterval> | null = null

  function clear() {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
    isActive.value = false
  }

  function start(seconds = initialSeconds) {
    clear()
    secondsLeft.value = seconds
    isActive.value = seconds > 0

    if (!isActive.value) return

    timerId = setInterval(() => {
      secondsLeft.value -= 1
      if (secondsLeft.value <= 0) {
        clear()
        secondsLeft.value = 0
      }
    }, 1000)
  }

  onScopeDispose(clear)

  return { secondsLeft, isActive, start, clear }
}
