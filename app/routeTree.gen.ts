/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as PortfolioIdImport } from './routes/portfolio/$id'
import { Route as AuthSignUpSplatImport } from './routes/auth/sign-up.$'
import { Route as AuthSignInSplatImport } from './routes/auth/sign-in.$'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const PortfolioIdRoute = PortfolioIdImport.update({
  id: '/portfolio/$id',
  path: '/portfolio/$id',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignUpSplatRoute = AuthSignUpSplatImport.update({
  id: '/auth/sign-up/$',
  path: '/auth/sign-up/$',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInSplatRoute = AuthSignInSplatImport.update({
  id: '/auth/sign-in/$',
  path: '/auth/sign-in/$',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/portfolio/$id': {
      id: '/portfolio/$id'
      path: '/portfolio/$id'
      fullPath: '/portfolio/$id'
      preLoaderRoute: typeof PortfolioIdImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in/$': {
      id: '/auth/sign-in/$'
      path: '/auth/sign-in/$'
      fullPath: '/auth/sign-in/$'
      preLoaderRoute: typeof AuthSignInSplatImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-up/$': {
      id: '/auth/sign-up/$'
      path: '/auth/sign-up/$'
      fullPath: '/auth/sign-up/$'
      preLoaderRoute: typeof AuthSignUpSplatImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/portfolio/$id': typeof PortfolioIdRoute
  '/auth/sign-in/$': typeof AuthSignInSplatRoute
  '/auth/sign-up/$': typeof AuthSignUpSplatRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/portfolio/$id': typeof PortfolioIdRoute
  '/auth/sign-in/$': typeof AuthSignInSplatRoute
  '/auth/sign-up/$': typeof AuthSignUpSplatRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/portfolio/$id': typeof PortfolioIdRoute
  '/auth/sign-in/$': typeof AuthSignInSplatRoute
  '/auth/sign-up/$': typeof AuthSignUpSplatRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/portfolio/$id' | '/auth/sign-in/$' | '/auth/sign-up/$'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/portfolio/$id' | '/auth/sign-in/$' | '/auth/sign-up/$'
  id:
    | '__root__'
    | '/'
    | '/portfolio/$id'
    | '/auth/sign-in/$'
    | '/auth/sign-up/$'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  PortfolioIdRoute: typeof PortfolioIdRoute
  AuthSignInSplatRoute: typeof AuthSignInSplatRoute
  AuthSignUpSplatRoute: typeof AuthSignUpSplatRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  PortfolioIdRoute: PortfolioIdRoute,
  AuthSignInSplatRoute: AuthSignInSplatRoute,
  AuthSignUpSplatRoute: AuthSignUpSplatRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/portfolio/$id",
        "/auth/sign-in/$",
        "/auth/sign-up/$"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/portfolio/$id": {
      "filePath": "portfolio/$id.tsx"
    },
    "/auth/sign-in/$": {
      "filePath": "auth/sign-in.$.tsx"
    },
    "/auth/sign-up/$": {
      "filePath": "auth/sign-up.$.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
