class StoryService {
  constructor(hackerNewsService) {
    this.hackerNewsService = hackerNewsService;
  }

  async getStoriesPaginated(
    pageNo = 1,
    pageSize = 12,
    sort = "desc",
    pattern = ""
  ) {
    try {
      const storyIds = await this.hackerNewsService.getStoryIds();
      const sortedIds = sort === "asc" ? storyIds.reverse() : storyIds;
      const stories = await this.hackerNewsService.getStoryDetails(sortedIds);

      const filteredStories = stories
        .filter((story) => story && story.url)
        .filter(
          (story) =>
            story.title &&
            story.title.toLowerCase().includes(pattern.toLowerCase())
        );

      const startIndex = (pageNo - 1) * pageSize;
      const endIndex = startIndex + parseInt(pageSize, 10);
      const paginatedStories = filteredStories.slice(startIndex, endIndex);

      return {
        stories: paginatedStories,
        totalEntries: filteredStories.length,
        totalPages: Math.ceil(filteredStories.length / pageSize),
      };
    } catch (error) {
      throw error;
    }
  }
}

export default StoryService;
