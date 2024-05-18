/* eslint-disable no-unused-vars */
import AxiosHttpService from './AxiosHttpService';

export interface IAuthenticationService {
  login(request: AuthenticationRequest): Promise<string>;
  register(request: AuthenticationRequest): Promise<string>;
}

export class AuthenticationService implements IAuthenticationService {
  private axiosService = AxiosHttpService.getInstance();
  private static instance: AuthenticationService;

  private constructor() {}

  static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }

    return AuthenticationService.instance;
  }

  async login(request: AuthenticationRequest): Promise<string> {
    try {
      const response = await this.axiosService.post<
        AuthenticationResponse,
        AuthenticationRequest
      >('/login', request);
      return response.access_token;
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  }

  async register(request: AuthenticationRequest): Promise<string> {
    try {
      const response = await this.axiosService.post<
        AuthenticationResponse,
        AuthenticationRequest
      >('/register', request);
      return response.access_token;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }
}
