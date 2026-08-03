export interface ChangePasswordRequest {
  oldPassword: string;

  newPassword: string;

  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;

  message: string;
}
