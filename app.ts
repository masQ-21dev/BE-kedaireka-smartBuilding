import express, { type Express } from 'express'
import dotenv from 'dotenv'
import { CONFIG } from './apps/config'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { appRouterV2 } from './apps/routes'
import cors from 'cors'
import http from 'http'
import { Server as SocketIo } from 'socket.io'
import { CONSOLE } from './apps/utilities/log'
import socket from './apps/soket'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mqttClient } from './apps/mqtt'

// For env File
dotenv.config()

const app: Express = express()
const port = CONFIG.port
const server = http.createServer(app)

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
  CONSOLE.info(`[${req.method}] - ${req.url} - ${req.ip} - ${new Date().toISOString()} `)
  next()
})
app.use('/public', express.static('public'))

app.routes = appRouterV2(app)

app.listen(port, () => {
  console.log(`Server is Fire at ${CONFIG.appUrl}:${port}/api/v2`)
})
// mqtt subcribe
mqttClient.subscribe('topik/test')

mqttClient.on('message', (topic, message) => {
  console.log(message.toString())
})

// mqtt publish
mqttClient.publish('topik/test', 'Halo dari server Express!')
// mqtt publish
mqttClient.publish('topik/test', 'Halo dari server ws')
// init socket
const io = new SocketIo(server, { path: '/ws' })
socket.init(io)
