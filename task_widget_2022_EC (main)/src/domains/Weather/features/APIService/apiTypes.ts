import type {EapiWay} from './apiSettings'

export interface IapiNameSet {
  setName: string
  EapiWay: EapiWay
  apiMethod: string
  apiPath: string
  commonQuery?: {[s: string]: string}
}

export interface IapiNamePride {
  [setName: string]: IapiNameSet
}


export interface IapiWaySet {
  config: {[t: string]: any},
  // interceptorSet: IInterceptors
}

export interface IapiWayPride {
  [s: string]: IapiWaySet
}

export type PathChunks = Array<string>

export interface IAPIConfig {
  headers?: {[index: string]: string}
  method?: string
  body?: {[index: string]: string}
  params?: {[index: string]: string}
}

export interface IInterceptors {
  onRequest?({request, options}: any) :void,
  onRequestError?({request, options, error}: any) :void,
  onResponse?({request, options, response}: any) :void,
  onResponseError({request, options, response}: any) :void
}





