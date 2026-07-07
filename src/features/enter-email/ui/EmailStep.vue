<script setup lang="ts">
import { ref } from 'vue'
import { validateEmail } from '@/entities/auth'
import { AppInput, ActionRow, AppButton, AppLink } from '@/shared/ui'

const email = defineModel<string>({ default: '' })

defineProps<{
  secondaryLabel?: string
  secondaryTo?: string
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: []
  secondary: []
}>()

const error = ref(false)

function handleSubmit() {
  error.value = !validateEmail(email.value)
  if (!error.value) emit('submit')
}

function clearError() {
  error.value = false
}
</script>

<template>
  <div class="email-step">
    <AppInput
      v-model="email"
      type="email"
      placeholder="Адрес электронной почты"
      autocomplete="email"
      inputmode="email"
      autofocus
      :error="error"
      @input="clearError"
      @keydown.enter.prevent="handleSubmit"
    />
    <p v-if="error" class="field-error">Введите корректный адрес почты</p>

    <slot />

    <div class="spacer" />

    <ActionRow align="spread">
      <AppLink v-if="secondaryTo" :to="secondaryTo">{{ secondaryLabel }}</AppLink>
      <AppButton v-else-if="secondaryLabel" variant="ghost" @click="emit('secondary')">
        {{ secondaryLabel }}
      </AppButton>
      <AppButton @click="handleSubmit">{{ submitLabel ?? 'Далее' }}</AppButton>
    </ActionRow>
  </div>
</template>

<style scoped>
.email-step {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-error {
  font-size: 12px;
  font-weight: 400;
  color: var(--error);
  margin-bottom: 8px;
}

.spacer {
  flex: 1;
}
</style>
