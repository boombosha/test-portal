<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ActionRow, AppButton } from '@/shared/ui'

const props = defineProps<{
  title: string
  subtitle?: string
  actionLabel: string
  actionTo?: string
}>()

const emit = defineEmits<{
  action: []
}>()

const router = useRouter()

function handleAction() {
  if (props.actionTo) {
    router.push(props.actionTo)
    return
  }
  emit('action')
}
</script>

<template>
  <div class="auth-success">
    <div class="auth-success__spacer" />
    <h2 class="auth-success__title">{{ title }}</h2>
    <p v-if="subtitle" class="auth-success__subtitle" v-html="subtitle" />

    <ActionRow align="start">
      <AppButton @click="handleAction">{{ actionLabel }}</AppButton>
    </ActionRow>
  </div>
</template>

<style scoped>
.auth-success {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.auth-success__spacer {
  height: 18px;
  flex-shrink: 0;
}

.auth-success__title {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.2px;
  margin-bottom: 8px;
  color: var(--text);
}

.auth-success__subtitle {
  font-size: 13px;
  font-weight: 300;
  color: var(--light);
  line-height: 1.65;
  margin-bottom: 4px;
}

.auth-success__subtitle :deep(strong) {
  color: var(--mid);
  font-weight: 400;
}
</style>
