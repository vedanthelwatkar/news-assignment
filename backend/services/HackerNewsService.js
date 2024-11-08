class HackerNewsService {
  constructor(httpClient, cacheService) {
    this.httpClient = httpClient;
    this.cacheService = cacheService;
    this.baseUrl = "https://hacker-news.firebaseio.com/v0";
  }

  async getStoryIds() {
    const cachedIds = this.cacheService.get("storyIds");
    if (cachedIds) {
      console.log("Using cached story IDs");
      return cachedIds;
    }

    try {
      const { data: storyIds } = await this.httpClient.get(
        `${this.baseUrl}/newstories.json`
      );
      this.cacheService.set("storyIds", storyIds);
      return storyIds;
    } catch (error) {
      throw new Error("Failed to fetch story IDs");
    }
  }

  async getStoryDetails(storyIds) {
    const cachedStories = this.cacheService.get("stories");
    if (cachedStories) {
      console.log("Using cached stories");
      return cachedStories;
    }

    try {
      const storyPromises = storyIds.map((id) =>
        this.httpClient
          .get(`${this.baseUrl}/item/${id}.json`)
          .then((res) => res.data)
      );
      const stories = await Promise.all(storyPromises);
      this.cacheService.set("stories", stories);
      return stories;
    } catch (error) {
      throw new Error("Failed to fetch story details");
    }
  }
}

export default HackerNewsService;
