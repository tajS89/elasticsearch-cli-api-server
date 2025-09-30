import express, { type Request, type Response, type NextFunction } from "express";
import { search } from "../utils/elasticsearch/elasticsearch-utils";
import { SERVER_PORT } from "../config";
const app = express();
const port = SERVER_PORT;

app.get("/search", async (req: Request, res: Response) => {
  const conceptParam = req.query.term;
  if (conceptParam === undefined || typeof conceptParam !== "string") {
    return res.status(400).send({
      error: "Query param 'concept' must be a string",
    });
  }

  const concept: string = conceptParam;
  const result = await search(concept);
  res.status(200).json(result);
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ status: 404, message: "Not Found" });
});

app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Unhandled Error:", err.stack || err);

    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
