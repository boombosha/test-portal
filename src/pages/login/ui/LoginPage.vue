<script setup lang="ts">
import { AuthCard } from '@/widgets/auth-card'
import { ProgressBar, StepWizard } from '@/features/auth-step-wizard'
import { EmailStep } from '@/features/enter-email'
import { LoginPasswordStep } from '@/features/enter-password'
import { useLoginPage } from '../model/useLoginPage'

const {
  currentStep,
  direction,
  heading,
  email,
  password,
  submitEmail,
  submitLogin,
  goBack,
} = useLoginPage()
</script>

<template>
  <AuthCard
    :heading="heading"
    :email="email"
    :show-email-chip="currentStep === 2"
  >
    <ProgressBar :total="2" :current="currentStep" />

    <StepWizard :current-step="currentStep" :direction="direction">
      <template #step-1>
        <EmailStep
          v-model="email"
          secondary-label="Создать аккаунт"
          secondary-to="/register"
          @submit="submitEmail"
        />
      </template>

      <template #step-2>
        <LoginPasswordStep
          v-model="password"
          forgot-to="/forgot-password"
          @back="goBack"
          @submit="submitLogin"
        />
      </template>
    </StepWizard>
  </AuthCard>
</template>
