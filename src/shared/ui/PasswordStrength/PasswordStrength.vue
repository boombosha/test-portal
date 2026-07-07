<script setup lang="ts">
import { computed } from 'vue'
import { calcPasswordStrength } from '@/entities/auth'

const props = defineProps<{
  password: string
}>()

const strength = computed(() => calcPasswordStrength(props.password))
</script>

<template>
  <div v-if="password.length >= 8" class="password-strength">
    <div class="password-strength__bar">
      <div
        v-for="segment in 4"
        :key="segment"
        class="password-strength__segment"
        :class="segment <= strength.level ? `password-strength__segment--${strength.level}` : ''"
      />
    </div>
    <div
      class="password-strength__label"
      :class="`password-strength__label--${strength.level}`"
    >
      {{ strength.label }}
    </div>
  </div>
</template>

<style scoped>
.password-strength__bar {
  display: flex;
  gap: 3px;
  margin: 6px 0 3px;
}

.password-strength__segment {
  flex: 1;
  height: 2px;
  border-radius: 2px;
  background: #e5e7eb;
  transition: background 0.3s;
}

.password-strength__segment--1 {
  background: #ef4444;
}

.password-strength__segment--2 {
  background: #f97316;
}

.password-strength__segment--3 {
  background: #eab308;
}

.password-strength__segment--4 {
  background: #22c55e;
}

.password-strength__label {
  font-size: 11px;
  font-weight: 400;
  color: var(--light);
  min-height: 12px;
  margin-bottom: 6px;
  line-height: 1;
}

.password-strength__label--1 {
  color: #ef4444;
}

.password-strength__label--2 {
  color: #f97316;
}

.password-strength__label--3 {
  color: #eab308;
}

.password-strength__label--4 {
  color: #22c55e;
}
</style>
