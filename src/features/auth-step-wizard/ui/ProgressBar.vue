<script setup lang="ts">
defineProps<{
  total: number
  current: number
  hidden?: boolean
}>()
</script>

<template>
  <div class="progress" :style="{ opacity: hidden ? 0 : 1 }">
    <div
      v-for="step in total"
      :key="step"
      class="progress__line"
      :class="{ 'progress__line--active': step <= current }"
    />
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  gap: 6px;
  margin-bottom: 40px;
  transition: opacity 0.3s;
}

.progress__line {
  height: 2px;
  flex: 1;
  border-radius: 2px;
  background: #e5e7eb;
  transition: background 0.4s ease;
}

.progress__line--active {
  background: linear-gradient(90deg, var(--blue), var(--purple));
}
</style>
