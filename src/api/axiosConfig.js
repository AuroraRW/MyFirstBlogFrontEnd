import axios from "axios"
import { isHyperlink } from '@/lib/isHyperlink'


const BASE_URL = process.env.DOTNET_SERVER_URL || 'http://localhost:5000/api';


const AXIOS_BASE = axios.create({
    baseURL: BASE_URL,
    timeout: 3400,
  });


const Api_Client = isHyperlink(BASE_URL) ? AXIOS_BASE : false


export default Api_Client
