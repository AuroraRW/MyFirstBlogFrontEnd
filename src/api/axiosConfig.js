import axios from "axios"
import { isHyperlink } from '@/lib/isHyperlink'

const BASE_URL = process.env.DOTNET_SERVER_URL

const AXIOS_BASE = axios.create({
    baseURL: BASE_URL,
  })

// const JSON_CLIENT = isHyperlink(BASE_URL) ? AXIOS_BASE : false
const JSON_CLIENT = BASE_URL ? AXIOS_BASE : axios.create({ baseURL: 'http://localhost:5000' })


export default JSON_CLIENT
