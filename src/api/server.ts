import express, { type Request, type Response } from "express";
import { search } from "../utils/elasticsearch/elasticsearch-utils";
import { SERVER_PORT } from "../config";
const app = express();
const port = SERVER_PORT;

/**
 * @route GET /search
 * @description
 * Searches for articles where the given concept appears as a `cause_concept_name`
 * in at least one relationship. Boosts article scores if the concept also appears in:
 *
 * - `title` (boost: 1.0)
 * - `tags` (boost: 0.51)
 * - `abstract` (boost: 0.1)
 *
 * Final score is the sum of these boosts. Results are sorted by score in descending order.
 *
 * @queryParam {string} term - The concept to search for (e.g., "coffee").
 */
app.get("/search", async (req: Request, res: Response) => {
  const conceptParam = req.query.term;
  if (typeof conceptParam !== "string" || conceptParam.trim() === "") {
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
  (err: Error, req: Request, res: Response) => {
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
