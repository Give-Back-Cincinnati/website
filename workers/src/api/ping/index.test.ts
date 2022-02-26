import { CreateRequestContext } from "../../router";
import { PingRoute } from "./index";
import { PingRouteGetHandler } from "./GET";
import makeServiceWorkerEnv from "service-worker-mock";

declare const global: any

describe('/api/ping', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  it('should return null when the route doesn\'t match', () => {
    const req = new CreateRequestContext(new Request('/api/404'))
    const res = new PingRoute().match(req)
    expect(res).toBe(null)
  })

  it('should return null if the route matches and the method doesn\'t match', () => {
    const req = new CreateRequestContext(new Request('/api/ping', { method: 'POST' }))
    const res = new PingRoute().match(req)
    expect(res).toBe(null)
  })

  it('should return a handler when the route & method match', () => {
    const req = new CreateRequestContext(new Request('/api/ping', { method: 'GET' }))
    const res = new PingRoute().match(req)
    expect(res).toBeInstanceOf(PingRouteGetHandler)
  })
})
