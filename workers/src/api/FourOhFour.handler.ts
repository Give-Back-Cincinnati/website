import { IRouteHandler } from '../router'

export class FourOhFourHandler implements IRouteHandler {
    handle(): Promise<Response> {
        return Promise.resolve(new Response('Not Found', { status: 404 }))
    }
}
