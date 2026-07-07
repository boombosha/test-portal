<script setup lang="ts">
import { ref } from 'vue'
import { AppInput } from '@/shared/ui/AppInput'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })

defineProps<{
  error?: boolean
}>()

const visible = ref(false)
</script>

<template>
  <div class="password-input">
    <AppInput
      v-model="model"
      :type="visible ? 'text' : 'password'"
      :error="error"
      v-bind="$attrs"
    />
    <button
      type="button"
      class="password-input__toggle"
      :style="{ opacity: visible ? 0.4 : 1 }"
      @click="visible = !visible"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 17 17"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M1 8.5C1 8.5 4 3 8.5 3S16 8.5 16 8.5 13 14 8.5 14 1 8.5 1 8.5z" />
        <circle cx="8.5" cy="8.5" r="2.5" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.password-input {
  position: relative;
  margin-bottom: 4px;
}

.password-input :deep(.app-input) {
  margin-bottom: 0;
  width: 100%;
}

.password-input__toggle {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px;
  color: var(--xlight);
  transition: color 0.18s;
  display: flex;
  align-items: center;
}

.password-input__toggle:hover {
  color: var(--light);
}
</style>
