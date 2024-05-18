/* eslint-disable no-unused-vars */
type Quiz = {
  question: string;
  answers: string[];
};

type RecordValue = string | Blob | File | number | boolean | null;

interface HttpService {
  get<T>(url: string): Promise<T>;
  post<T, U extends Record<string, unknown>>(url: string, data?: U): Promise<T>;
}

type AuthenticationRequest = {
  username: string;
  password: string;
  email?: string;
};

type AuthenticationResponse = {
  status: number;
  access_token: string;
};

type QuizSession = {
  id: string;
  name: string;
  creator_id: string;
  list_quizzes: Quiz[];
};
