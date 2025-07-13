import express from "express";
import cors from "cors";
import { createClient } from "redis";
import { error } from "console";
import { encodeBase62 } from "./services/base62-encoder.js";

const app = express();

app.use(cors());
app.use(express.json());

// initializing Redis
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  console.log("Redis client connected.");
});

redisClient.on("error", () => {
  console.log("Redis connection Failed.");
});

// triggering the connection
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(error);
  }
})();

// endpoint for creating shorturl from long url

app.post("/shorten", async (req, res) => {
  const {originalUrl}=req.body;
  

  if (!originalUrl)
    res.json({ status: false, error: "Please pass the long URL." });
  else {
    try {
      const id = await redisClient.incr("global_counter");
      const shortUrlId = encodeBase62(id); //short url id

      await redisClient.hSet("urls", shortUrlId, originalUrl);

      res.json({
        status: true,
        data: shortUrlId,
      });
    } catch (e) {
      console.log(e.message);
    }
  }
});

//endpoint for long url to short url

app.get("/get-og-url/:shortUrlId", async (req, res) => {
  const shortUrlId = req.params.shortUrlId;

  const ogUrl = await redisClient.hGet("urls", shortUrlId);
  res.json({
      "status":true,
      data:ogUrl
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000.");
});
