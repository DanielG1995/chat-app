import axios from "axios"
import { getTokenFromCookie } from "../utlis/helpers"

export const publicApi = async (url: string, payload?: { [key: string]: string }) => {
    try {
        if (payload) {
           return axios.post(`${import.meta.env.VITE_URL_API_GETWAY}${url}`, payload)
        }
        return await axios.get(`${import.meta.env.VITE_URL_API_GETWAY}${url}`)
    } catch (error) {

    }
}

export const privateApi = async (url: string, payload?: { [key: string]: string }) => {
    try {
        const token = getTokenFromCookie()
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        if (payload) {
            return axios.post(`${import.meta.env.VITE_URL_API_GETWAY}${url}`, payload, headers)
        }
        return await axios.get(`${import.meta.env.VITE_URL_API_GETWAY}${url}`, headers)
    } catch (error) {
        throw new Error(error as string)
    }
}