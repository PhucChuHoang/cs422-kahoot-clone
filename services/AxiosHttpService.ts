import { axiosInstance } from '../lib/utils';

class AxiosHttpService implements HttpService {
  private static instance: AxiosHttpService;
  private constructor() {}

  static getInstance(): AxiosHttpService {
    return this.instance || (this.instance = new AxiosHttpService());
  }

  async get<T>(url: string): Promise<T> {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  }

  async post<T, U extends Record<string, unknown> | undefined>(
    url: string,
    data?: U,
  ): Promise<T> {
    const formData = new FormData();
    Object.entries(data ?? {}).forEach(([key, value]) => {
      formData.append(key, value?.toString() ?? '');
    });

    const response = await axiosInstance.post<T>(url, formData);
    return response.data;
  }
}

export default AxiosHttpService;
