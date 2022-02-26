import { CreateRequestContext } from "../../router"
import makeServiceWorkerEnv from "service-worker-mock"
import { ContactUsRoute } from "./index"
import { ContactUsPostHandler } from "./POST"

declare const global: any

describe('/api/contact-us', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  it('should return null when the route doesn\'t match', () => {
    const req = new CreateRequestContext(new Request('/api/404'))
    const res = new ContactUsRoute().match(req)
    expect(res).toBe(null)
  })

  it('should return null if the route matches and the method doesn\'t match', () => {
    const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'GET' }))
    const res = new ContactUsRoute().match(req)
    expect(res).toBe(null)
  })

  it('should return a handler when the route and method match', () => {
    const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'POST' }))
    const res = new ContactUsRoute().match(req)
    expect(res).toBeInstanceOf(ContactUsPostHandler)
  })

})
