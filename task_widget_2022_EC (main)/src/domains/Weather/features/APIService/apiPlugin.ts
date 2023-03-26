import {apiService} from './apiService'
import type {apiNames} from './apiSettings'
import type {PathChunks} from './apiTypes'

// export default {
//   install: (app: any, options: any) => {
//     const api = (apiName: apiNames, pathChunks: PathChunks = []): apiService => new apiService(apiName, pathChunks)
//     app.provide('$api', api)
//   }
// }

//for WebComponents
export const $api = (apiName: apiNames, pathChunks: PathChunks = []): apiService => new apiService(apiName, pathChunks)



