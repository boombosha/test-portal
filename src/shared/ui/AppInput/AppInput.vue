<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })

defineProps<{
  error?: boolean
}>()
</script>

<template>
  <input
    v-model="model"
    class="app-input"
    :class="{ 'app-input--error': error }"
    v-bind="$attrs"
  />
</template>

<style scoped>
.app-input {
  width: 100%;
  padding: 15px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 300;
  color: var(--text);
  background: #fff;
  transition: border-color 0.18s, box-shadow 0.18s;
  outline: none;
  margin-bottom: 4px;
}

.app-input::placeholder {
  color: #c0c6d0;
  font-weight: 300;
}

.app-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(67, 109, 255, 0.08);
}

.app-input--error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.06);
}

@media (max-width: 640px) {
  .app-input {
    font-size: 16px;
    padding: 14px 15px;
  }
}
</style>
