import request from "supertest";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import NodeCache from "node-cache";
import axios from "axios";
import CacheService from "../services/CacheService.js";
import HackerNewsService from "../services/HackerNewsService.js";
import StoryService from "../services/StoryService.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const cache = new NodeCache({ stdTTL: 300 });
const cacheService = new CacheService(cache);
const hackerNewsService = new HackerNewsService(axios, cacheService);
const storyService = new StoryService(hackerNewsService);

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

describe("GET /api/stories", () => {
  it("should return paginated stories", (done) => {
    request(app)
      .get("/api/stories?pageNo=1&pageSize=5&sort=desc&pattern=")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);

        expect(response.body).toBeDefined();
        expect(response.body.stories).toBeDefined();
        expect(response.body.totalEntries).toBeDefined();
        expect(response.body.totalPages).toBeDefined();
        done();
      });
  });

  it("should return 500 if there is an error", (done) => {
    spyOn(storyService, "getStoriesPaginated").and.throwError("Test error");

    request(app)
      .get("/api/stories?pageNo=1&pageSize=5&sort=desc&pattern=")
      .expect("Content-Type", /json/)
      .expect(500)
      .end((err, response) => {
        if (err) return done(err);

        expect(response.body).toBeDefined();
        expect(response.body.error).toBe("Test error");
        done();
      });
  });
});
