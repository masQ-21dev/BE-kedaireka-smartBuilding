/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { type Express, type Request, type Response, type Application } from 'express'
import dotenv from 'dotenv'
import { CONFIG } from './apps/config'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { appRouterV2 } from './apps/routes'
const cors = require('cors')

// For env File
dotenv.config()

const app: Express = express()
const port = CONFIG.port

process.env.TZ = 'Asia/jakarta'

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, content-type, Authorization, Content-Type'
  )
  next()
})
app.use('/public', express.static('public'))

app.routes = appRouterV2(app)

app.listen(port, () => {
  console.log(`Server is Fire at ${CONFIG.appUrl}:${port}/api/v2`)
})
