import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"

import errorHandlerMiddleware from "./middlewares/error-handler"
import notFound from "./middlewares/not-found"
import connectDB from "./db/connect"

dotenv.config();

const app: Express = express();

app.use(express.json())
app.use(cors())

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server");
})

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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});