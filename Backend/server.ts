import express from "express"
import cors from "cors"
import connect from "./database"
import { config } from "dotenv"
import { DeleteRoutes, GetRoutes, PostRoutes } from "./routes"

config()
const app = express()
app.use(express.json())
app.use(cors({origin: '*'}))

connect(process.env.DBPATH!).then(() => app.listen(process.env.PORT!, () => {
    for(let path of Object.keys(GetRoutes)) {
        app.get(`/${path}`, async (_, res) => {
            try {
                res.status(200).send(await GetRoutes[path as keyof typeof GetRoutes]())
            } catch (err: any) {
                res.status(500).send(err.message)
            }
        })
        console.log(`Added get route: /${path}`)
    }
    for(let path of Object.keys(PostRoutes)) {
        app.post(`/${path}`, async (req, res) => {
            try {
                res.status(200).send(await PostRoutes[path as keyof typeof PostRoutes](req.body))
            } catch (err: any) {
                res.status(500).send(err.message)
            }
        })
        console.log(`Added post route: /${path}`)
    }
    for(let path of Object.keys(DeleteRoutes)) {
        app.delete(`/${path}`, async (req, res) => {
            try {
                res.status(200).send(await DeleteRoutes[path as keyof typeof DeleteRoutes](req.body))
            } catch (err: any) {
                res.status(500).send(err.message)
            }
        })
        console.log(`Added delete route: /${path}`)
    }
    console.log(`Server running on port ${process.env.PORT!}`)
}))
