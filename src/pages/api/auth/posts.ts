import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const apiRes = await fetch('http://localhost:5000/posts', {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    })

    const data = await apiRes.json()
    res.status(apiRes.status).json(data)
  } catch (err: any) {
    console.error('/api/posts error:', err)
    res.status(500).json({ errors: ['Internal server error'] })
  }
}
