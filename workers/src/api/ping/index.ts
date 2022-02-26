import { IRoute, IRouteHandler, RequestContext } from "../../router"
import { PingRouteGetHandler } from "./GET";

export class PingRoute implements IRoute {
    match(req: RequestContext): IRouteHandler | null {
        if (req.url.pathname === "/api/ping") {
            switch (req.req.method) {
                case "GET":
                    return new PingRouteGetHandler();
                default:
                    return null
            }
        }
        return null
    }
}
