import { PingRoute } from './api/ping'
import { ContactUsRoute } from "./api/contact-us"
import { FourOhFourHandler } from "./api/FourOhFour.handler"

export interface RequestContext {
    req: Request
    url: URL
}

export interface IRouter {
    handle (req: Request): Promise<Response>
    route (req: RequestContext): IRouteHandler
}

export interface IRoute {
    match (req: RequestContext): IRouteHandler | null
}

export interface IRouteHandler {
    handle (req: RequestContext): Promise<Response>
}

export class CreateRequestContext implements RequestContext {
    req: Request
    url: URL

    constructor (req: Request) {
        this.req = req
        this.url = new URL(req.url)
    }
}

export class Router implements IRouter {
    routes: IRoute[] = []

    constructor() {
        this.routes = [
            new PingRoute(),
            new ContactUsRoute(),
        ]
    }

  // handle preflight OPTIONS request -> modified from an example in workers docs
  // https://developers.cloudflare.com/workers/examples/cors-header-proxy
  handleOptions(request: Request): Response {
    // Make sure the necessary headers are present
    // for this to be a valid pre-flight request
    const headers = request.headers;
    if (
      headers.get("Origin") !== null &&
      headers.get("Access-Control-Request-Method") !== null &&
      headers.get("Access-Control-Request-Headers") !== null
    ){
      // Handle CORS pre-flight request.
      // If you want to check or reject the requested method + headers
      // you can do that here.
      const respHeaders = new Headers()
      {
        respHeaders.append("Access-Control-Allow-Origin", "*")
        respHeaders.append("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS")
        respHeaders.append("Access-Control-Max-Age", "86400")
        const accessControlRequestHeaders = request.headers.get("Access-Control-Request-Headers")
        if (accessControlRequestHeaders) {
          // Allow all future content Request headers to go back to browser
          // such as Authorization (Bearer) or X-Client-Name-Version
          respHeaders.append("Access-Control-Allow-Headers", accessControlRequestHeaders)
        }
      }

      return new Response(null, {
        headers: respHeaders,
      })
    }
    else {
      // Handle standard OPTIONS request.
      // If you want to allow other HTTP Methods, you can do that here.
      return new Response(null, {
        headers: {
          Allow: "GET, HEAD, POST, OPTIONS",
        },
      })
    }
  }

    async handle (req: Request): Promise<Response> {
        try {
            if (req.method === 'OPTIONS') {
                return this.handleOptions(req)
            }
            const requestContext = new CreateRequestContext(req)
            const routeHandler = this.route(requestContext)
            return routeHandler.handle(requestContext)
        } catch (e: unknown) {
            if (e instanceof Error) {
                return Promise.resolve(new Response(e.message, { status: 500 }))
            } else {
                return Promise.resolve(new Response('Internal Server Error', { status: 500 }))
            }
        }
    }

    route (req: RequestContext): IRouteHandler {
        for (const route of this.routes) {
            const handler = route.match(req)
            if (handler) {
                return handler
            }
        }
        return new FourOhFourHandler()
    }
}
