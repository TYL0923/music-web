import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
const ai: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173',
  timeout: 10000,
})

export default ai

const initInterceptors = () => {
  // ai.interceptors.request.use((config: AxiosRequestConfig) => {
  //   const token = localStorage.getItem('TOKEN')
  //   if (token)
  //     config.headers!.token = token

  //   return config
  // })
  ai.interceptors.response.use(
    (response: AxiosResponse) => {
      // const { data } = response;
      // if(requestCodeMap[data.code]) {
      //   message.error(
      //     requestCodeMap[data.code],
      //     { duration: 2000 }
      //   )
      // }
      // console.log(response.data)
      return response.data
    },
  )
}
initInterceptors()

