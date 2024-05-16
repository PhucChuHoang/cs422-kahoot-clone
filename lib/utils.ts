import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const API_BASE_URL: string = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});
