/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { type Express, type Request, type Response, type Application } from 'express'
import dotenv from 'dotenv'
import { excampleCRUDRoutes } from './apps/routes/excampleCRUDRoute'

const cors = require('cors')

// For env File
dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.routes = excampleCRUDRoutes(app)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server')
})

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
