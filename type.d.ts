/* eslint-disable no-unused-vars */
type Question = {
  id?: string;
  quiz_id?: string;
  text: string;
  options: QuestionAnswer[];
};

type QuestionAnswer = {
  id?: string;
  question_id?: string;
  text: string;
  is_correct: boolean;
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
  title: string;
  user_id: string;
  questions: Question[];
};

type QuizRequest = {
  title?: string;
  questions?: Question[];
};

type QuizResponse = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  questions: Question[];
};
