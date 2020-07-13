import { searchRoutes } from './search/routes'
import { authRoutes } from './auth/routes'

export const v1Routes = [...searchRoutes, ...authRoutes]
