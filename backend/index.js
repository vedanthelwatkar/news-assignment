import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import NodeCache from "node-cache";
import CacheService from "./services/CacheService.js";
import HackerNewsService from "./services/HackerNewsService.js";
import StoryService from "./services/StoryService.js";

dotenv.config();

const cache = new NodeCache({ stdTTL: 300 });
const cacheService = new CacheService(cache);
const hackerNewsService = new HackerNewsService(axios, cacheService);
const storyService = new StoryService(hackerNewsService);

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get("/api/stories", async (request, response) => {
  const { pageNo, pageSize, sort, pattern } = request.query;

  try {
    const result = await storyService.getStoriesPaginated(
      pageNo,
      pageSize,
      sort,
      pattern
    );
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));
