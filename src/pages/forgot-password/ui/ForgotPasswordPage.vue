<script setup lang="ts">
import { computed } from 'vue'
import { AuthCard } from '@/widgets/auth-card'
import { ProgressBar, StepWizard } from '@/features/auth-step-wizard'
import { EmailStep } from '@/features/enter-email'
import { OtpStep } from '@/features/verify-otp'
import { SetPasswordStep } from '@/features/enter-password'
import { AuthSuccessStep } from '@/features/auth-success'
import { useForgotPasswordPage } from '../model/useForgotPasswordPage'

const {
  currentStep,
  direction,
  heading,
  email,
  password,
  passwordConfirm,
  submitEmail,
  submitOtp,
  submitPassword,
  goBack,
  goToLogin,
} = useForgotPasswordPage()

const showProgress = computed(() => currentStep.value <= 3)
const showEmailChip = computed(() => currentStep.value >= 2)
</script>

<template>
  <AuthCard
    :heading="heading"
    :email="email"
    :show-email-chip="showEmailChip"
  >
    <ProgressBar
      :total="3"
      :current="Math.min(currentStep, 3)"
      :hidden="!showProgress"
    />

    <StepWizard :current-step="currentStep" :direction="direction">
      <template #step-1>
        <EmailStep
          v-model="email"
          secondary-label="Назад ко входу"
          secondary-to="/login"
          @submit="submitEmail"
        />
      </template>

      <template #step-2>
        <OtpStep
          :email="email"
          @back="goBack"
          @submit="submitOtp"
          @resend="() => {}"
        />
      </template>

      <template #step-3>
        <SetPasswordStep
          v-model="password"
          v-model:confirm="passwordConfirm"
          password-placeholder="Новый пароль"
          submit-label="Сохранить"
          @back="goBack"
          @submit="submitPassword"
        />
      </template>

      <template #step-4>
        <AuthSuccessStep
          title="Пароль обновлён"
          subtitle="Теперь вы можете войти с новым паролем."
          action-label="Войти"
          action-to="/login"
          @action="goToLogin"
        />
      </template>
    </StepWizard>
  </AuthCard>
</template>
