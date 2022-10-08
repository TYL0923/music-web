import { AxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    validityTime?: number,
    disableCache?: boolean
  }

  export interface AxiosInstance {
    get<T = Res>(url: string, config?: AxiosRequestConfig): Promise<T>,
    post<T = Res>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>,
  }
}