import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as jwtDecode from 'jwt-decode';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function isTokenExpired(token: string) {
  try {
    console.log('Token: ', token);
    const decoded = jwtDecode.jwtDecode(token);
    if (decoded.exp) {
      return Date.now() >= decoded.exp * 1000;
    }
  } catch (err) {
    console.log('Error decoding token: ', err);
    return true;
  }
}
