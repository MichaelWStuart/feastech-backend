import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './auth-router'
import errorHandler from './error-handler'

const app = express()

app
  .use(cors({ origin: 'http://localhost:8081', credentials: true }))
  .use(bodyParser.json())
  .use(router)
  .use(errorHandler)
  .listen(process.env.PORT || 8080, () => console.log('server on port 8080'))
