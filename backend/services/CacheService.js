class CacheService {
  constructor(cacheImplementation) {
    this.cache = cacheImplementation;
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    return this.cache.set(key, value);
  }
}

export default CacheService;
