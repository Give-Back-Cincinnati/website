import { IRoute, IRouteHandler, RequestContext } from "../../router"
import { ContactUsPostHandler } from "./POST"

export class ContactUsRoute implements IRoute {
    match(req: RequestContext): IRouteHandler | null {
        if (req.url.pathname === "/api/contact-us") {
            switch (req.req.method) {
                case 'POST':
                    return new ContactUsPostHandler()
                default:
                    return null
            }
        }
        return null
    }
}
