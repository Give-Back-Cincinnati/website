import { ContactUsPostHandler } from './POST';
import makeServiceWorkerEnv from "service-worker-mock"
import { CreateRequestContext } from "../../router"
import { Analytics } from "../../config/analytics"

// jest.mock('../../index/analytics')

declare const global: any

describe.skip('ContactUsRoutePostHandler', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
    jest.resetAllMocks()
  })

  it('should return a 201 response', async () => {
    const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'POST' }))
    const res = await new ContactUsPostHandler().handle(req)
    expect(res.status).toBe(201)
  })

  it('should call the google analytics url', async () => {
    const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'POST' }))
    await new ContactUsPostHandler().handle(req)
    expect(Analytics.track).toHaveBeenCalled()
  })

  describe('Analytics::identify', () => {
    it('is called', async () => {
      const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'POST' }))
      await new ContactUsPostHandler().handle(req)
      expect(Analytics.identify).toHaveBeenCalledTimes(1)
    })
  })

  describe('Analytics::track', () => {
    it('is called', async () => {
      const req = new CreateRequestContext(new Request('/api/contact-us', { method: 'POST' }))
      await new ContactUsPostHandler().handle(req)
      expect(Analytics.track).toHaveBeenCalledTimes(1)
    })
  })



})
