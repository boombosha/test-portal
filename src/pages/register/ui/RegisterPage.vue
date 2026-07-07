<script setup lang="ts">
import { computed } from 'vue'
import { AuthCard } from '@/widgets/auth-card'
import { ProgressBar, StepWizard } from '@/features/auth-step-wizard'
import { EmailStep } from '@/features/enter-email'
import { OtpStep } from '@/features/verify-otp'
import { SetPasswordStep } from '@/features/enter-password'
import { TermsCheckboxes } from '@/features/accept-terms'
import { AuthSuccessStep } from '@/features/auth-success'
import { useRegisterPage } from '../model/useRegisterPage'

const {
  currentStep,
  direction,
  heading,
  email,
  password,
  passwordConfirm,
  acceptTerms,
  acceptMarketing,
  termsRef,
  submitEmail,
  submitOtp,
  submitPassword,
  goBack,
  goToLogin,
} = useRegisterPage()

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
          secondary-label="Уже есть аккаунт?"
          secondary-to="/login"
          @submit="submitEmail"
        >
          <TermsCheckboxes
            ref="termsRef"
            v-model:accept-terms="acceptTerms"
            v-model:accept-marketing="acceptMarketing"
          />
        </EmailStep>
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
          @back="goBack"
          @submit="submitPassword"
        />
      </template>

      <template #step-4>
        <AuthSuccessStep
          title="Добро пожаловать!"
          :subtitle="`Аккаунт для <strong>${email}</strong> создан.`"
          action-label="Перейти в Mobilon One"
          action-to="/login"
          @action="goToLogin"
        />
      </template>
    </StepWizard>
  </AuthCard>
</template>
