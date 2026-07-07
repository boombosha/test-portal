<script setup lang="ts">
import { LOGO_ALT, LOGO_URL } from '@/shared/config/constants'
import { EmailChip } from '@/shared/ui/EmailChip'

defineProps<{
  heading: string
  email?: string
  showEmailChip?: boolean
}>()
</script>

<template>
  <aside class="auth-card-left">
    <img class="auth-card-left__logo" :src="LOGO_URL" :alt="LOGO_ALT" />
    <h1 class="auth-card-left__heading">{{ heading }}</h1>
    <EmailChip :email="email ?? ''" :visible="showEmailChip" />
  </aside>
</template>

<style scoped>
.auth-card-left {
  width: 38%;
  flex-shrink: 0;
  padding: 52px 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid var(--border);
  background: #fff;
}

.auth-card-left__logo {
  height: 32px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  object-position: left center;
  display: block;
  margin-bottom: 36px;
}

.auth-card-left__heading {
  font-size: 30px;
  font-weight: 400;
  letter-spacing: -0.3px;
  color: var(--text);
  line-height: 1.15;
}

@media (max-width: 640px) {
  .auth-card-left {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 28px 24px 20px;
  }

  .auth-card-left__heading {
    font-size: 22px;
  }

  .auth-card-left__logo {
    height: 26px;
    max-width: 150px;
    margin-bottom: 10px;
  }
}

@media (max-width: 380px) {
  .auth-card-left {
    padding: 22px 18px 16px;
  }
}
</style>
