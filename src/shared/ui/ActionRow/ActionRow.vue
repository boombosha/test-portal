<script setup lang="ts">
withDefaults(
  defineProps<{
    align?: 'end' | 'spread' | 'start'
  }>(),
  {
    align: 'end',
  },
)
</script>

<template>
  <div class="action-row" :class="`action-row--${align}`">
    <slot />
  </div>
</template>

<style scoped>
.action-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
}

.action-row--end {
  justify-content: flex-end;
}

.action-row--spread {
  justify-content: space-between;
}

.action-row--start {
  justify-content: flex-start;
}

@media (max-width: 640px) {
  .action-row {
    margin-top: 20px;
  }
}
</style>
