<script setup lang="ts">
import { ref } from 'vue'
import { validatePassword, validatePasswordMatch } from '@/entities/auth'
import { PasswordInput, PasswordStrength, ActionRow, AppButton } from '@/shared/ui'

const password = defineModel<string>({ default: '' })
const confirm = defineModel<string>('confirm', { default: '' })

defineProps<{
  passwordPlaceholder?: string
  confirmPlaceholder?: string
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: []
  back: []
}>()

const passwordError = ref(false)
const confirmError = ref(false)

function handleSubmit() {
  passwordError.value = !validatePassword(password.value)
  confirmError.value = !validatePasswordMatch(password.value, confirm.value)

  if (!passwordError.value && !confirmError.value) {
    emit('submit')
  }
}
</script>

<template>
  <div class="set-password-step">
    <PasswordInput
      v-model="password"
      :placeholder="passwordPlaceholder ?? 'Придумайте пароль'"
      autocomplete="new-password"
      :error="passwordError"
      @input="passwordError = false"
    />
    <PasswordStrength :password="password" />
    <p v-if="passwordError" class="field-error">Пароль должен быть не менее 8 символов</p>

    <PasswordInput
      v-model="confirm"
      class="set-password-step__confirm"
      :placeholder="confirmPlaceholder ?? 'Повторите пароль'"
      autocomplete="new-password"
      :error="confirmError"
      @input="confirmError = false"
      @keydown.enter.prevent="handleSubmit"
    />
    <p v-if="confirmError" class="field-error">Пароли не совпадают</p>

    <div class="spacer" />

    <ActionRow align="spread">
      <AppButton variant="ghost" @click="emit('back')">Назад</AppButton>
      <AppButton @click="handleSubmit">{{ submitLabel ?? 'Готово' }}</AppButton>
    </ActionRow>
  </div>
</template>

<style scoped>
.set-password-step {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.set-password-step__confirm {
  margin-top: 4px;
}

.field-error {
  font-size: 12px;
  color: var(--error);
  margin-bottom: 8px;
}

.spacer {
  flex: 1;
}
</style>
