import { Sequelize } from "sequelize"
import "dotenv/config"

export function ConnectDB(): Sequelize {
    if (!process.env.DB_URL) {
        throw "DB_URL not found, please check .env file"
    }
    const dbUrl: string = process.env.DB_URL!
    const sequelize = new Sequelize(dbUrl, {
        logging: false
    })

    sequelize.authenticate().catch(e => {
        console.log(e)
        throw e
    })
    // try {
    //     await sequelize.authenticate()
    //     console.log("Connection has been established successfully.")
    //     return sequelize
    // } catch (error) {
    //     console.error("Unable to connect to the database:", error)
    // }

    return sequelize
}
