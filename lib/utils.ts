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
  headers: {
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});

export function isTokenExpired(token: string) {
  try {
    const decoded = jwtDecode.jwtDecode(token);
    if (decoded.exp) {
      return Date.now() >= decoded.exp * 1000;
    }
  } catch (err) {
    console.log('Error decoding token: ', err);
    return true;
  }
}
