import axios from 'axios'
import { isHyperlink } from '@/lib/isHyperlink'

const BASE_URL = process.env.NEXT_PUBLIC_DOTNET_SERVER_URL

const AXIOS_BASE = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const JSON_CLIENT = isHyperlink(BASE_URL) ? AXIOS_BASE : false

export default JSON_CLIENT
