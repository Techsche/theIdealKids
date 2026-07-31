export interface LoginRequest {

  email: string;

  password: string;

}

export interface LoginResponse {

  success: boolean;

  message: string;

  token: string | null;

  name: string | null;

  roles: string[] | null;

  secondary_name: string | null;

}