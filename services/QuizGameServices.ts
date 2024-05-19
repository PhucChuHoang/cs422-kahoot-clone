/* eslint-disable no-unused-vars */
import AxiosHttpService from './AxiosHttpService';

export interface IQuizGameServices {
  connect(request: QuizGameSessionConnectionRequest): Promise<string>;
  submitAnswer(): Promise<string>;
}

export class QuizGameService implements IQuizGameServices {
  private axiosService = AxiosHttpService.getInstance();
  private static instance: QuizGameService;

  private constructor() {}

  static getInstance(): QuizGameService {
    if (!QuizGameService.instance) {
      QuizGameService.instance = new QuizGameService();
    }

    return QuizGameService.instance;
  }

  async connect(request: QuizGameSessionConnectionRequest): Promise<string> {
    try {
      const response = await this.axiosService.post<
        QuizGameSessionConnectionResponse,
        QuizGameSessionConnectionRequest
      >('/join/session', request);
      return response.message;
    } catch (error) {
      throw new Error('No Room Found');
    }
  }

  async submitAnswer(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
