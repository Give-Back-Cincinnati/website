import { Router } from './router'

addEventListener('fetch', async (event) => {
  const response = new Router().handle(event.request)
  event.respondWith(response)
})
