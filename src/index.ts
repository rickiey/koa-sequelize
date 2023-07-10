import { main } from "./app"
import { ConnectDB } from "./db"
import { Initialize } from "./models/init"
const seq = ConnectDB()
Initialize(seq)
main(3000)
