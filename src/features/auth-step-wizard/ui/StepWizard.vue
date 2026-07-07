<script setup lang="ts">
import { computed } from 'vue'
import type { StepDirection } from '../model/useStepWizard'

const props = defineProps<{
  currentStep: number
  direction: StepDirection
}>()

defineEmits<{
  'after-enter': []
}>()

const slotName = computed(() => `step-${props.currentStep}`)
</script>

<template>
  <div class="step-wizard">
    <Transition
      :name="direction === 'back' ? 'step-back' : 'step-forward'"
      mode="out-in"
      @after-enter="$emit('after-enter')"
    >
      <div :key="currentStep" class="step">
        <slot :name="slotName" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.step-wizard {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.step {
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>

<style>
.step-forward-enter-active,
.step-forward-leave-active,
.step-back-enter-active,
.step-back-leave-active {
  transition:
    opacity 0.26s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.26s cubic-bezier(0.22, 1, 0.36, 1);
}

.step-forward-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.step-forward-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.step-back-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.step-back-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
