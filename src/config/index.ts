import { initCache } from './cache'
import { initDb } from './db'
import { Logger } from './logger'

export const initDependencies = async (): Promise<void> => {
  try {
    await initCache()
    await initDb()
  } catch (err) {
    Logger.warn('Failed to initialize dependencies!')
  }
}
