import { Context } from "koa"
import { PlatformProperty } from "../models/platform"

export async function hello(ctx: Context) {
    let queryParam = ctx.request.query

    if (!queryParam.name) {
        ctx.response.status = 400
        ctx.body = { ok: 400, msg: "incorrect params" }
        return
    }
    let PlatformPropertys = await PlatformProperty.findAll({ where: { name: queryParam.name } })
    ctx.body = { ok: 0, result: PlatformPropertys }
}
