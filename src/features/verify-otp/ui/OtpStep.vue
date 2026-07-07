<script setup lang="ts">
import { watch } from 'vue'
import { OTP_RESEND_SECONDS } from '@/shared/config/constants'
import { useCountdown } from '@/shared/lib/useCountdown'
import { useOtpInput } from '../model/useOtpInput'
import { ActionRow, AppButton } from '@/shared/ui'

const props = defineProps<{
  email: string
}>()

const emit = defineEmits<{
  submit: [code: string]
  back: []
  resend: []
}>()

const {
  digits,
  hasError,
  isComplete,
  setRef,
  handleInput,
  handleKeydown,
  handlePaste,
  validate,
  reset,
} = useOtpInput()

const { secondsLeft, isActive, start } = useCountdown(OTP_RESEND_SECONDS)

watch(
  () => props.email,
  () => {
    reset()
    start()
  },
  { immediate: true },
)

function handleSubmit() {
  if (!validate()) return
  emit('submit', digits.value.join(''))
}

function handleResend() {
  reset()
  start()
  emit('resend')
}
</script>

<template>
  <div class="otp-step">
    <p class="otp-step__hint">
      Код отправлен на <strong>{{ email }}</strong>
    </p>

    <div class="otp-step__grid">
      <input
        v-for="(digit, index) in digits"
        :key="index"
        :ref="(el) => setRef(el as HTMLInputElement | null, index)"
        :value="digit"
        type="text"
        maxlength="1"
        inputmode="numeric"
        autocomplete="off"
        class="otp-step__digit"
        :class="{
          'otp-step__digit--filled': digit,
          'otp-step__digit--error': hasError,
        }"
        @input="handleInput(index, $event)"
        @keydown="handleKeydown(index, $event)"
        @paste="handlePaste"
        @keydown.enter.prevent="isComplete && handleSubmit()"
      />
    </div>

    <p v-if="hasError" class="field-error">Введите код из письма</p>

    <div class="resend-row">
      Не получили письмо?
      <button
        type="button"
        class="resend-btn"
        :disabled="isActive"
        @click="handleResend"
      >
        Отправить снова
        <span v-if="isActive">({{ secondsLeft }})</span>
      </button>
    </div>

    <div class="spacer" />

    <ActionRow align="spread">
      <AppButton variant="ghost" @click="emit('back')">Назад</AppButton>
      <AppButton @click="handleSubmit">Далее</AppButton>
    </ActionRow>
  </div>
</template>

<style scoped>
.otp-step {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.otp-step__hint {
  font-size: 13px;
  font-weight: 300;
  color: var(--light);
  margin-bottom: 12px;
}

.otp-step__hint strong {
  color: var(--mid);
  font-weight: 400;
}

.otp-step__grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-bottom: 4px;
}

.otp-step__digit {
  width: 100%;
  aspect-ratio: 1;
  text-align: center;
  padding: 0;
  font-size: 20px;
  font-weight: 400;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fff;
  color: var(--text);
  outline: none;
  transition: border-color 0.18s, box-shadow 0.18s;
  caret-color: var(--accent);
}

.otp-step__digit:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(67, 109, 255, 0.08);
}

.otp-step__digit--filled {
  border-color: rgba(67, 109, 255, 0.25);
  background: #fafcff;
}

.otp-step__digit--error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.05);
}

.field-error {
  font-size: 12px;
  color: var(--error);
  margin-bottom: 8px;
}

.resend-row {
  font-size: 12px;
  font-weight: 300;
  color: var(--light);
  margin-top: 12px;
}

.resend-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  transition: opacity 0.18s;
}

.resend-btn:hover:not(:disabled) {
  opacity: 0.7;
}

.resend-btn:disabled {
  color: var(--light);
  cursor: default;
  font-weight: 300;
}

.spacer {
  flex: 1;
}

@media (max-width: 640px) {
  .otp-step__grid {
    gap: 6px;
  }
}

@media (max-width: 380px) {
  .otp-step__grid {
    gap: 4px;
  }
}
</style>
