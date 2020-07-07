import { Router, Request, Response, NextFunction } from 'express'

type MiddlewareWrapper = (router: Router) => void

export const applyMiddleware = (
  middlewareWrappers: MiddlewareWrapper[],
  router: Router,
): void => {
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
): void => {
  for (const route of routes) {
    const { method, path, handler } = route
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(router as any)[method](`${rootPath}${path}`, handler)
  }
}
