<script setup lang="ts">
import { ref } from 'vue'

const acceptTerms = defineModel<boolean>('acceptTerms', { default: false })
const acceptMarketing = defineModel<boolean>('acceptMarketing', { default: false })

const error = ref(false)

function validate() {
  error.value = !acceptTerms.value
  return !error.value
}

defineExpose({ validate })
</script>

<template>
  <div class="terms">
    <label class="terms__row">
      <input v-model="acceptTerms" type="checkbox" @change="error = false" />
      <span>
        Я соглашаюсь с условиями <a href="#">оферты</a> и даю согласие на обработку
        <a href="#">персональных данных</a>
      </span>
    </label>

    <label class="terms__row">
      <input v-model="acceptMarketing" type="checkbox" />
      <span>Я согласен на получение <a href="#">информационных материалов</a></span>
    </label>

    <p v-if="error" class="terms__error">Необходимо принять условия оферты</p>
  </div>
</template>

<style scoped>
.terms {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.terms__row {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  cursor: pointer;
}

.terms__row input {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: var(--blue);
  cursor: pointer;
}

.terms__row span {
  font-size: 12px;
  font-weight: 300;
  color: var(--mid);
  line-height: 1.65;
}

.terms__row a {
  color: var(--blue);
  text-decoration: none;
  font-weight: 400;
  transition: opacity 0.15s;
}

.terms__row a:hover {
  opacity: 0.7;
}

.terms__error {
  font-size: 12px;
  color: var(--error);
  margin-top: 4px;
}

@media (max-width: 640px) {
  .terms {
    margin-top: 12px;
  }
}
</style>
