import axios, {
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";
  
  const apiService: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 90000,
  });
  
  apiService.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      config.headers["Accept"] = "application/json";
      const accessToken = `Bearer ${localStorage["accessToken"]}`;
      if (localStorage["accessToken"]) {
        config.headers["authorization"] = accessToken;
        // config.headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log('config', config)
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  apiService.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default apiService;