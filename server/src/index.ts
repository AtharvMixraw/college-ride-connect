import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import 'express-async-errors'
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

import errorHandlerMiddleware from "./middlewares/error-handler"
import notFound from "./middlewares/not-found"
import connectDB from "./db/connect"

import authRouter from "./routers/authRouter"

dotenv.config();

const app: Express = express();

app.use(express.json())
app.use(cors())

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Welcome to the server");
})
app.use("/api/v1/auth", authRouter)

// Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "College Ride Connect API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["./routers/*.ts"],
}
const spacs = swaggerJSDoc(options)
app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(spacs))

app.use(errorHandlerMiddleware)
app.use(notFound)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start()