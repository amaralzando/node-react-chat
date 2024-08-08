import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());
app.use(cors());

app.use(router);

//Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error.",
  });
});

app.listen(port, () =>
  console.log("Server running on port..." + port + "!!!!!!")
);
