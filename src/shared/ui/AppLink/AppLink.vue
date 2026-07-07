<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to?: string
  href?: string
}>()
</script>

<template>
  <RouterLink v-if="to" :to="to" class="app-link">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" class="app-link">
    <slot />
  </a>
  <button v-else type="button" class="app-link app-link--button">
    <slot />
  </button>
</template>

<style scoped>
.app-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--accent);
  text-decoration: none;
  transition: opacity 0.18s;
}

.app-link--button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.app-link:hover {
  opacity: 0.7;
}
</style>
