import { Router, Request, Response, NextFunction } from 'express'

type MiddlewareWrapper = (router: Router) => void

export const applyMiddleware = (
  middlewareWrappers: MiddlewareWrapper[],
  router: Router,
) => {
  for (const middlewareWrapper of middlewareWrappers) {
    middlewareWrapper(router)
  }
}

type Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void> | void

type Route = {
  path: string
  method: string
  handler: Handler | Handler[]
}

export const applyRoutes = (
  rootPath: string,
  routes: Route[],
  router: Router,
) => {
  for (const route of routes) {
    const { method, path, handler } = route
    ;(router as any)[method](`${rootPath}${path}`, handler)
  }
}
