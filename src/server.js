import {} from 'dotenv/config'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './auth-router'
import errorHandler from './error-handler'

mongoose.connect(process.env.DB_URI)

express()
  .use(cookieParser())
  .use(cors({ origin: process.env.FRONT_END_URL, credentials: true }))
  .use(bodyParser.json())
  .use(router)
  .use(errorHandler)
  .listen(process.env.PORT || 8080, () => console.log('server on port 8080'))
