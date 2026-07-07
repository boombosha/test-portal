<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'ghost'
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)
</script>

<template>
  <button
    class="app-button"
    :class="`app-button--${variant}`"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  padding: 11px 28px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s, opacity 0.18s;
  white-space: nowrap;
}

.app-button--primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 2px 14px rgba(67, 109, 255, 0.22);
}

.app-button--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 5px 20px rgba(67, 109, 255, 0.32);
  background: #3860f0;
}

.app-button--primary:active {
  transform: translateY(0);
}

.app-button--ghost {
  background: none;
  color: var(--accent);
  padding: 0;
  box-shadow: none;
}

.app-button--ghost:hover {
  opacity: 0.7;
}

@media (max-width: 380px) {
  .app-button {
    font-size: 13px;
    padding: 10px 22px;
  }

  .app-button--ghost {
    padding: 0;
    font-size: 13px;
  }
}
</style>
