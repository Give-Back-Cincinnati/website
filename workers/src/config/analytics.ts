import config from '../config'

class SegmentAnalytics {
  private readonly enabled: boolean

  constructor() {
    this.enabled = true //config.NODE_ENV === 'production' // if not production, disable analytics.
  }

  createHeaders () {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${config.SEGMENT_WRITE_KEY}` // write key is already base64 encoded
    }
  }

  async track (eventName: string, userId: string, properties = {}, integrations = {}) {
    if (!this.enabled) return
    await fetch('https://api.segment.io/v1/track', {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify({
        userId,
        event: eventName,
        properties,
        integrations
      })
    })
  }

  async identify (userId: string, traits = {}, integrations = {}) {
    if (!this.enabled) return
    await fetch('https://api.segment.io/v1/identify', {
      method: 'POST',
      headers: this.createHeaders(),
      body: JSON.stringify({
        userId: 'worker',
        traits,
        integrations
      })
    })
  }
}

export const Analytics = new SegmentAnalytics()
