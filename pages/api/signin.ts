import { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/utils/fetcher'
import { storeToken } from '@/utils/cookies'

interface IFetchResponseLoginSuccess {
    response: {
        account: {
            email: string
        }
    }
}

interface IRequestBody {
    token: string
}

type TResponseJson = {
    data: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<TResponseJson>): Promise<void> {
    if (req.method === 'POST') {
        const { token }: IRequestBody = req.body

        const response = await fetcher({
            method: 'GET',
            url: '/status',
            auth: token,
        }) as IFetchResponseLoginSuccess

        if (response.response.account.email) {
            storeToken(res, token)
            return res.json({ data: token })
        } else {
            return res.status(500).json({ data: 'No token' })
        }
    }
}