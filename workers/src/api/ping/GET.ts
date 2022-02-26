import { IRouteHandler } from "../../router";

export class PingRouteGetHandler implements IRouteHandler {
    public async handle(): Promise<Response> {
        return new Response("pong", { status: 200 })
    }
}
