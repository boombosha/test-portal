import type { App } from 'vue'
import { createPinia } from 'pinia'
import { router } from '../router'

export function setupProviders(app: App) {
  app.use(createPinia())
  app.use(router)
}

export { router } from '../router'
