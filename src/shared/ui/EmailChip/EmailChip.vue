<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  email: string
  visible?: boolean
}>()

const initial = computed(() => props.email.trim().charAt(0).toUpperCase() || 'A')
</script>

<template>
  <div class="email-chip" :class="{ 'email-chip--visible': visible && email }">
    <div class="email-chip__avatar">{{ initial }}</div>
    <span>{{ email }}</span>
  </div>
</template>

<style scoped>
.email-chip {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 14px;
  padding: 5px 12px 5px 6px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 400;
  color: var(--mid);
  background: #fafafa;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.email-chip--visible {
  opacity: 1;
  pointer-events: auto;
}

.email-chip__avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--blue), var(--purple));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #fff;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .email-chip {
    display: none;
  }
}
</style>
