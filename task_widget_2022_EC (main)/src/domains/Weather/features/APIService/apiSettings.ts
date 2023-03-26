import type {IapiNamePride, IapiWayPride} from "./apiTypes"
// import {CommonInterceptors} from './apiService'
import {VITE_WEATHER_KEY} from "./constants"

export enum EapiWay {   // ~ FetchInstance, Новый тип надо дополнительно прописывать в коде apiService
  regular = 'regular',
  Authorization = 'Authorization',
  exclusive ='exclusive'
}

export const weatherQuery = {appid: VITE_WEATHER_KEY}
// export const commonQuery = {appid: '1d299b7969f7973a569cfa11e2330b5d'}

export const apiNamePride: IapiNamePride = {
  FETCH_WEATHER: {
    setName: 'FETCH_WEATHER',
    apiMethod: 'get',
    EapiWay: EapiWay.regular,
    apiPath: '/weather',
    commonQuery: weatherQuery
  },

}


export type apiNames = keyof typeof apiNamePride


export const apiWayPride: IapiWayPride = {
  regular: {
    config: {},
    // interceptorSet: CommonInterceptors      // wrong way to add new CommonInterceptors()
  },
  auth: {
    config: {headers: {auth: 'beer 5'}},
    // interceptorSet:  CommonInterceptors
  }
}



