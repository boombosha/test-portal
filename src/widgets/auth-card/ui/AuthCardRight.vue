<template>
  <section class="auth-card-right">
    <slot />
  </section>
</template>

<style scoped>
.auth-card-right {
  flex: 1;
  padding: 52px 52px;
  display: flex;
  flex-direction: column;
  background: #fff;
}

@media (max-width: 640px) {
  .auth-card-right {
    padding: 28px 24px;
  }
}

@media (max-width: 380px) {
  .auth-card-right {
    padding: 22px 18px;
  }
}
</style>
