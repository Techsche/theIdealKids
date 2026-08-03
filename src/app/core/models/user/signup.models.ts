// models/create-user.model.ts

export interface CreateUserRequest {
  name: string;
  email: string;
  secondary_name: string;
  secondary_email: string;
  mobileNo: string;
  password: string;
  confirmPassword: string;
}
