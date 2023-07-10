import Koa, { Context, Next } from "koa"
import parser from "@koa/bodyparser"
import json from "koa-json"
import KoaLogger from "koa-logger"
import cors from "@koa/cors"
import { APIrouters } from "./router/api"

async function setXrespTime(ctx: Context, next: Next) {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
}

export function main(port: number) {
    const app = new Koa()

    app.use(
        parser({
            enableTypes: ["json"],
            encoding: "utf8",
            jsonLimit: 1024 * 1024 * 50, // 50 MB
            onError(err: any, ctx) {
                console.log(err)
                ctx.throw(422, "body parse error")
            }
        })
    )
    app.use(setXrespTime)
        .use(json({ pretty: false }))
        .use(KoaLogger())
        .use(cors())
    let router = APIrouters()
    app.use(router.routes()).use(router.allowedMethods())
    app.listen(port, () => {
        console.log(`🚀 Server listening http://0.0.0.0:${port}/ 🚀`)
    })
}
