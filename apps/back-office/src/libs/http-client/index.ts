import axios from "axios";

export const httpClient = (() => {
  let _authorization = "";

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_CORE_API_URL}/admins`,
    headers: {
      Authorization: "",
    },
    withCredentials: true,
    paramsSerializer: {
      serialize: (params) => {
        const searchParams = new URLSearchParams();

        Object.keys(params).forEach((key) => {
          const value = params[key];

          if (Array.isArray(value)) {
            value.forEach((v) => searchParams.append(key, v));
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, value);
          }
        });

        return searchParams.toString();
      },
    },
  });

  axiosInstance.interceptors.request.use((config) => {
    if (_authorization) {
      config.headers.Authorization = _authorization;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response.data.data;
    },
    (error) => {
      return Promise.reject(error.response.data.data);
    },
  );

  return {
    setAuthorization: (accessToken: string) => {
      _authorization = accessToken;
    },
    removeAuthorization: () => {
      _authorization = "";
    },

    async get<T>(
      url: string,
      options?: {
        params?: any;
        paramsSerializer?: {
          serialize: (params: Record<string, any>) => string;
        };
      },
    ): Promise<T> {
      return axiosInstance.get(url, options);
    },

    async post<T>(url: string, data?: any): Promise<T> {
      return axiosInstance.post(url, data, { timeout: 300000 });
    },

    async put<T>(url: string, data?: any): Promise<T> {
      return axiosInstance.put(url, data);
    },

    async delete<T>(url: string): Promise<T> {
      return axiosInstance.delete(url);
    },
  };
})();
