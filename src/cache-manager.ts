import FileSystemCache, {IFileSystemCacheOptions} from './file-system-cache'

export interface IYokeCache {
  /**
   * Get a value from the cache.
   */
  get: (key: string) => Promise<any>,

  /**
   * Set a value in the cache.
   */
  set: (key: string, value: any, milliseconds?: number) => Promise<void>

  /**
   * Increase and return a value in the cache by the given number, defaulting to 1.
   *
   * If the key does not exist, sets to zero before performing the operation.
   */
  increment: (key: string, by?: number) => Promise<number>

  /**
   * Decrease and return a value in the cache by the given number, defaulting to 1.
   *
   * If the key does not exist, sets to zero before performing the operation.
   */
  decrement: (key: string, by?: number) => Promise<number>

  /**
   * Delete an item in the cache.
   */
  delete: (key: string) => Promise<void>

  /**
   * Delete all items in the cache.
   */
  flush: () => Promise<void>
}

enum YokeCacheDriver {
  FileSystem
}

type IYokeCacheOptions = IFileSystemCacheOptions

const resolve = <O extends IYokeCacheOptions>(driver: YokeCacheDriver, options: O) => ({
  [YokeCacheDriver.FileSystem]: FileSystemCache(options)
})

const cacheManager = <O extends IYokeCacheOptions>(driver: YokeCacheDriver, options: O) => {
  return resolve(driver, options)
}

export default cacheManager
