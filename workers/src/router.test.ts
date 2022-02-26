import { Router } from './router'
import makeServiceWorkerEnv from 'service-worker-mock'
import { PingRoute } from "./api/ping"
import { ContactUsRoute } from './api/contact-us'

declare const global: any

describe('router', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  describe('Routing', () => {
    test('responds with 404 to unknown route', async () => {
      const result = await new Router().handle(new Request('/', { method: 'GET' }))
      expect(result.status).toEqual(404)
      const text = await result.text()
      expect(text).toEqual('Not Found')
    })

    test('imports all routes', () => {
      const router = new Router()
      expect(router.routes[0]).toBeInstanceOf(PingRoute)
      expect(router.routes[1]).toBeInstanceOf(ContactUsRoute)
      expect(router.routes).toHaveLength(2)
    })

    it('responds with the correct headers for basic OPTIONS requests', async () => {
      const result = await new Router().handle(new Request('/', { method: 'OPTIONS' }))
      expect(result.headers.get('Allow')).toEqual('GET, HEAD, POST, OPTIONS')
    })

    it('responds with the correct headers for CORS preflight requests', async () => {
      const headers = new Headers()
      headers.append('Origin', 'http://localhost:3000')
      headers.append('Access-Control-Request-Method', 'POST')
      headers.append('Access-Control-Request-Headers', 'Content-Type')

      const result = await new Router().handle(new Request('/', {
        method: 'OPTIONS',
        headers
      }))
      expect(result.headers.get('Access-Control-Allow-Origin')).toEqual('*')
      expect(result.headers.get('Access-Control-Allow-Methods')).toEqual('GET, HEAD, POST, OPTIONS')
      expect(result.headers.get('Access-Control-Max-Age')).toEqual('86400')
      expect(result.headers.get('Access-Control-Allow-Headers')).toEqual('Content-Type')
    })
  })

  describe('correctly routes to /ping', () => {
    test('GET', async () => {
      const result = await new Router().handle(new Request('/api/ping', { method: 'GET' }))
      expect(result.status).toEqual(200)
      const text = await result.text()
      expect(text).toEqual('pong')
    })

    test('POST', async () => {
      const result = await new Router().handle(new Request('/api/ping', { method: 'POST' }))
      expect(result.status).toEqual(404)
    })
  })

  describe('it sends a 500 when the server throws an error', () => {
    const mockHandler = {
      handle: jest.fn(() => {
        throw new Error('mock error')
      })
    }
    const mockRoute = {
      match: () => mockHandler
    }

    test('responds with 500 with server error message', async () => {
      const router = new Router()
      router.routes = [mockRoute]
      const result = await router.handle(new Request('/api', { method: 'GET' }))
      expect(result.status).toEqual(500)
      const text = await result.text()
      expect(text).toEqual('mock error')
    })

    test('responds with 500 with generic error message', async () => {
      mockHandler.handle = jest.fn(() => {
        throw 'hello'
      })
      const router = new Router()
      router.routes = [mockRoute]
      const result = await router.handle(new Request('/api', { method: 'GET' }))
      expect(result.status).toEqual(500)
      const text = await result.text()
      expect(text).toEqual('Internal Server Error')
    })
  })
})
