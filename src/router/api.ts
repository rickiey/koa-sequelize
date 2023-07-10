import Router from "@koa/router"

import { hello } from "./hello"

export function APIrouters(): Router {
    const router = new Router({ prefix: "/api" })
    router.get("/hello", hello)

    return router
}
