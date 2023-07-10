import { Sequelize } from "sequelize"
import { init } from "./platform"
export function Initialize(seq: Sequelize) {
    init(seq)
}
