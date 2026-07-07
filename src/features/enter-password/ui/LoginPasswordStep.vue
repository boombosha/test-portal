<script setup lang="ts">
import { ref } from 'vue'
import { validatePassword } from '@/entities/auth'
import { PasswordInput, ActionRow, AppButton, AppLink } from '@/shared/ui'

const password = defineModel<string>({ default: '' })

defineProps<{
  forgotTo?: string
}>()

const emit = defineEmits<{
  submit: []
  back: []
}>()

const error = ref(false)

function handleSubmit() {
  error.value = !validatePassword(password.value)
  if (!error.value) emit('submit')
}
</script>

<template>
  <div class="password-step">
    <PasswordInput
      v-model="password"
      placeholder="Пароль"
      autocomplete="current-password"
      :error="error"
      @input="error = false"
      @keydown.enter.prevent="handleSubmit"
    />
    <p v-if="error" class="field-error">Введите пароль</p>
    <AppLink v-if="forgotTo" :to="forgotTo" class="forgot-link">Забыли пароль?</AppLink>

    <div class="spacer" />

    <ActionRow align="spread">
      <AppButton variant="ghost" @click="emit('back')">Назад</AppButton>
      <AppButton @click="handleSubmit">Войти</AppButton>
    </ActionRow>
  </div>
</template>

<style scoped>
.password-step {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-error {
  font-size: 12px;
  color: var(--error);
  margin-bottom: 8px;
}

.forgot-link {
  font-size: 12px;
  margin-top: 8px;
  display: inline-block;
}

.spacer {
  flex: 1;
}
</style>
