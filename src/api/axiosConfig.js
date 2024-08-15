import axios from "axios"
import { isHyperlink } from '@/lib/isHyperlink'

// Define the base URL for backend API
const BASE_URL = 'http://localhost:5000';

const AXIOS_BASE = axios.create({
    baseURL: BASE_URL,
  })

const JSON_CLIENT = isHyperlink(BASE_URL) ? AXIOS_BASE : false

export default JSON_CLIENT
