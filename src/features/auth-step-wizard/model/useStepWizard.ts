import { computed, ref } from 'vue'

export type StepDirection = 'forward' | 'back'

export function useStepWizard(totalSteps: number, headings: string[] = []) {
  const currentStep = ref(1)
  const direction = ref<StepDirection>('forward')

  const heading = computed(() => headings[currentStep.value - 1] ?? '')
  const showProgress = computed(() => currentStep.value <= totalSteps)
  const isLastContentStep = computed(() => currentStep.value === totalSteps)

  function goTo(step: number, nextDirection: StepDirection = 'forward') {
    if (step < 1 || step > totalSteps) return
    direction.value = nextDirection
    currentStep.value = step
  }

  function goNext() {
    goTo(currentStep.value + 1, 'forward')
  }

  function goBack() {
    goTo(currentStep.value - 1, 'back')
  }

  return {
    currentStep,
    direction,
    heading,
    showProgress,
    isLastContentStep,
    totalSteps,
    goTo,
    goNext,
    goBack,
  }
}
