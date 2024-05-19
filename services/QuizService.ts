/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import AxiosHttpService from './AxiosHttpService';

export interface IQuizService {
  getQuizzes(id: string, request: QuizRequest): Promise<Question[]>;
  createQuiz(request: QuizRequest): Promise<void>;
  updateQuiz(request: QuizRequest): Promise<void>;
  deleteQuiz(id: string): Promise<void>;
  getAllQuizzes(): Promise<QuizSession[] | undefined>;
}

export class QuizService implements IQuizService {
  private axiosService = AxiosHttpService.getInstance();
  private static instance: QuizService;

  private constructor() {}

  static getInstance(): QuizService {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService();
    }

    return QuizService.instance;
  }

  async getQuizzes(id: string, request: QuizRequest): Promise<Question[]> {
    try {
      const response = await this.axiosService.get<Question[]>(`/quiz/${id}`);
      return response;
    } catch (error) {
      throw new Error('Failed to fetch quizzes');
    }
  }

  async createQuiz(request: QuizRequest): Promise<void> {
    try {
      await this.axiosService.post<QuizResponse, QuizRequest>(
        '/create/quiz',
        request,
      );
    } catch (error) {
      throw new Error('Failed to create quiz');
    }
  }

  async updateQuiz(request: QuizRequest): Promise<void> {
    try {
      await this.axiosService.put<QuizResponse, QuizRequest>(
        '/quizzes',
        request,
      );
    } catch (error) {
      throw new Error('Failed to update quiz');
    }
  }

  async deleteQuiz(id: string): Promise<void> {
    try {
      await this.axiosService.delete<QuizRequest>(`/quiz/${id}`);
    } catch (error) {
      throw new Error('Failed to delete quiz');
    }
  }

  async getAllQuizzes(): Promise<QuizSession[] | undefined> {
    try {
      const response = await this.axiosService.get<QuizSession[]>('/quiz/all');
      if (response.length === 0) {
        return undefined;
      }
      return response;
    } catch (error) {
      throw new Error('Failed to fetch quizzes');
    }
  }
}
