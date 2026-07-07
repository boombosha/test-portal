<script setup lang="ts">
import { BokehBackground } from '@/shared/ui'
import AuthCardLeft from './AuthCardLeft.vue'
import AuthCardRight from './AuthCardRight.vue'

defineProps<{
  heading: string
  email?: string
  showEmailChip?: boolean
}>()
</script>

<template>
  <BokehBackground />
  <div class="auth-page">
    <div class="auth-card">
      <AuthCardLeft
        :heading="heading"
        :email="email"
        :show-email-chip="showEmailChip"
      />
      <AuthCardRight>
        <slot />
      </AuthCardRight>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 100vh;
}

.auth-card {
  width: 100%;
  max-width: 860px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 16px 48px rgba(0, 0, 0, 0.07);
  display: flex;
  overflow: hidden;
  min-height: 440px;
}

@media (max-width: 640px) {
  .auth-page {
    padding: 0;
    align-items: flex-start;
  }

  .auth-card {
    flex-direction: column;
    border-radius: 0;
    box-shadow: none;
    border: none;
    min-height: 100vh;
    min-height: 100dvh;
  }
}
</style>
