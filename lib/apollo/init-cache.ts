import { InMemoryCache } from 'apollo-boost'

export const initCache = (cache: InMemoryCache) => {
  cache.writeData({
    data: {}
  })

  return cache
}
