export interface IUserProfile {
  success: boolean;
  message: string;

  id: string;
  location_id: string;

  name: string;
  email: string;

  secondary_name: string;
  secondary_email: string;

  mobileNo: string;

  role: string;

  remaining_login_retry_number: number;

  created_at: number;
  updated_at: number;
  lastLogin_at: number;

  username: string;

  authorities: string[];

  _active: boolean;
  _email_validated: boolean;
}
