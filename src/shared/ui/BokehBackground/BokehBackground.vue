<script setup lang="ts">
const blobs = [
  { w: 700, h: 600, x: 0, y: 0, c: 'rgba(96,165,250,.05)', d: 20, dl: 0 },
  { w: 800, h: 700, x: 45, y: 20, c: 'rgba(139,92,246,.04)', d: 24, dl: 6 },
  { w: 600, h: 550, x: 8, y: 45, c: 'rgba(30,106,225,.04)', d: 18, dl: 3 },
  { w: 650, h: 580, x: 55, y: 50, c: 'rgba(96,165,250,.04)', d: 22, dl: 9 },
  { w: 550, h: 490, x: 70, y: 2, c: 'rgba(109,40,217,.035)', d: 26, dl: 12 },
]
</script>

<template>
  <div class="bokeh" aria-hidden="true">
    <div
      v-for="(blob, index) in blobs"
      :key="index"
      class="blob"
      :style="{
        width: `${blob.w}px`,
        height: `${blob.h}px`,
        left: `${blob.x}%`,
        top: `${blob.y}%`,
        background: blob.c,
        animationDuration: `${blob.d}s`,
        animationDelay: `${blob.dl}s`,
      }"
    />
  </div>
</template>

<style scoped>
.bokeh {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  animation: bp ease-in-out infinite;
}

@keyframes bp {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.04) translateY(-10px);
  }
}
</style>
