import { PingRouteGetHandler } from "./GET"
import makeServiceWorkerEnv from "service-worker-mock"

declare const global: any


describe('PingRouteGetHandler', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  it('should return a 200 response', async () => {
    const res = await new PingRouteGetHandler().handle()
    expect(res.status).toBe(200)
  })

  it('should return a pong text response', async () => {
    const res = await new PingRouteGetHandler().handle()
    const text = await res.text()
    expect(text).toBe('pong')
  })
})
