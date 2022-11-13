/* eslint-disable @typescript-eslint/no-explicit-any */
import FetchError from '@/utils/FetchError'
import env from '@/env'
import { isEmpty as lodashIsEmpty } from 'lodash'

interface IFetcherArgs {
    method: string
    url: string
    data?: object
    auth?: string
    nextApi?: boolean
    queryParams?: Record<string, string>
    contentType?: string
}

const fetcher = async (args: IFetcherArgs): Promise<any> => {
    const { method, url, data, auth, nextApi } = args
    const headers: HeadersInit = {}
    if (args.contentType) {
        headers['Content-Type'] = args.contentType
    }
    if (auth) {
        headers['x-apisports-key'] = auth
    }
    let pathUrl: string
    if (nextApi) {
        pathUrl = `${url}`
    } else {
        pathUrl = `${env.API}${url}`
    }
    if (args.queryParams) {
        pathUrl += `?${new URLSearchParams(args.queryParams).toString()}`
    }

    const response = await fetch(pathUrl, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined
    })

    const responseData = await response.json()

    if (!response.ok) {
        throw new FetchError(response.status, response.statusText, responseData ? responseData : null)
    }

    if (!lodashIsEmpty(responseData.errors)) {
        throw new FetchError(response.status, 'ApiError', responseData ? responseData : null)
    }

    return responseData
}

export default fetcher