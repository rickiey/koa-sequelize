import Koa, { Context, Next } from "koa"
import parser from "@koa/bodyparser"
import Router from "@koa/router"
import json from "koa-json"
import KoaLogger from "koa-logger"
import cors from "@koa/cors"

async function setXrespTime(ctx: Context, next: Next) {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set("X-Response-Time", `${ms}ms`)
}

// response
async function hello(ctx: Context) {
    console.log(JSON.parse(JSON.stringify(ctx.request.query)))
    console.log(ctx.request.body)
    let x = 10 / 0
    // throw "test error handle"
    ctx.body = { ok: "fine" }
}

function main(port: number) {
    const app = new Koa()
    const router = new Router({ prefix: "/api" })
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
    router.post("/hello", hello)

    app.use(router.routes()).use(router.allowedMethods())

    app.listen(port, () => {
        console.log(`🚀 Server listening http://0.0.0.0:${port}/ 🚀`)
    })
}

main(3000)
