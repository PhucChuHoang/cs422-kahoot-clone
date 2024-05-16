/* eslint-disable no-unused-vars */
import AxiosHttpService from './AxiosHttpService';

export interface IAuthenticationService {
  login(request: AuthenticationRequest): Promise<boolean>;
  register(request: AuthenticationRequest): Promise<boolean>;
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

  async login(request: AuthenticationRequest): Promise<boolean> {
    const response = await this.axiosService.post<
      AuthenticationResponse,
      AuthenticationRequest
    >('/login', request);
    if (
      response.username !== request.username ||
      response.password_hash !== request.password
    ) {
      throw new Error('Invalid username or password');
    }
    return true;
  }

  async register(request: AuthenticationRequest): Promise<boolean> {
    const response = await this.axiosService.post<
      AuthenticationResponse,
      AuthenticationRequest
    >('/register', request);
    if (
      response.username !== request.username ||
      response.password_hash !== request.password
    ) {
      throw new Error('Invalid username or password');
    }
    return true;
  }
}
