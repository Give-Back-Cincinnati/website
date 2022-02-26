import {IRouteHandler, RequestContext} from "../../router"
import { Analytics } from "../../config/analytics"
import config from "../../config"

interface IContactUsData {
    name: string
    email: string
    type: string
    subject: string
    message: string
    recaptchaToken: string
}

interface GRecaptchaResponse {
    success: boolean
    score: number
    challenge_ts: string // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    hostname: string // the hostname of the site where the reCAPTCHA was solved
    action: string // optional
}

export class ContactUsPostHandler implements IRouteHandler {
    public async handle (req: RequestContext): Promise<Response> {
      try {
          const body = await req.req.json() as IContactUsData
          const recaptchaResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${config.RECAPTCHA_SECRET_KEY}&response=${body.recaptchaToken}`, {
            method: 'POST',
          })
          const gRecaptchaResponse = await recaptchaResponse.json() as GRecaptchaResponse
          if (!gRecaptchaResponse.success || gRecaptchaResponse.score < 0.5) {
            return new Response(null, { status: 403 })
          }

          const [ firstName, lastName ] = body.name.split(/\s(?!.*\s)/)

          await Analytics.track(
            'Contact Us',
            'workers',
            {
              firstName,
              lastName: lastName || firstName,
              email: body.email,
              type: body.type,
              subject: body.subject,
              message: body.message,
              leadSource: 'Web',
              status: 'New',
              company: 'Give Back Cincinnati'
            }
          )

          return new Response('Created', { status: 201 })
      } catch (e) {
          return new Response(null, { status: 500 })
      }
    }
}
