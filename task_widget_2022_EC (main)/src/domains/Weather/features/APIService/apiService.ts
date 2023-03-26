import {$fetch} from "ohmyfetch";
import type {FetchOptions} from 'ohmyfetch'
import type {$Fetch} from "ohmyfetch"

import type {IAPIConfig, IInterceptors, PathChunks} from './apiTypes'
import type {apiNames} from './apiSettings'

import type {IapiNameSet} from './apiTypes'
import {apiNamePride} from './apiSettings'
import {VITE_WEATHER_URL} from "./constants"


export const CommonInterceptors: IInterceptors = {
  async onRequest({}: any) {
    // console.log('onRequest =====')
    console.log('')
  },
  async onResponseError({request, options, response}: any) {
    console.log('onResponseError  ====', response.status)
  }
}

export class apiService {
  apiNameSet: IapiNameSet                 //{setName, EapiWay, apiMethod, apiPath: 'user/^/common/^', commonQuery}
  fullPath: string = ''
  currentFetchInstance: $Fetch | null = null

  static commonFetchInstance: $Fetch = $fetch.create(<FetchOptions>{
    ...{baseURL: VITE_WEATHER_URL},
    ...CommonInterceptors
  })

  static authFetchInstance: $Fetch | null = null

  constructor(apiName: apiNames, pathChunks: PathChunks) {
    //choose the settings
    this.apiNameSet = apiNamePride[apiName]

    //make fullPath - if url include the :id
    if (!this.apiNameSet.apiPath.includes('^'))
      this.fullPath = this.apiNameSet.apiPath
    else
      this.fullPath = apiService.replaceStigmentsInThePath(this.apiNameSet.apiPath, pathChunks)

    //make Fetch_instance
    if (this.apiNameSet.EapiWay === 'regular')
      this.currentFetchInstance = apiService.commonFetchInstance

  }

  async send(body: any, querySet: any) {
    if (this.currentFetchInstance)
      return await this.currentFetchInstance(this.fullPath, {
        method: this.apiNameSet.apiMethod,
        body,
        params: {...querySet, ...this.apiNameSet.commonQuery}
      })
  }

  static replaceStigmentsInThePath(path: string, pathChunks: PathChunks) {
    let pathSigments = path.split('^')

    if (pathSigments.length - 1 > pathChunks.length)
      console.error('== wrong_with_replaceStigmentsInThePath ==')

    let fullPath = ''
    pathSigments.forEach((item, ind) => {
      fullPath = fullPath + item + (pathChunks[ind] || '')
    })

    return fullPath
  }

  // static createExclusiveficFetchInstance(config: {}, interceptors = new CommonInterceptors()) {
  //
  // }

  static loseAuth() {
    this.authFetchInstance = null
  }

  static observeTheAuth() {

  }

}

// how to use it:
// let response_200 = this.$api('GET_TOURIST__id', pathChunks).send('body', {myQuery: 'go', })










