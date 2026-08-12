export interface User {
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
  reset_password_token: string;

  created_at: number;
  updated_at: number;
  lastLogin_at: number;

  facebookProfile: string | null;
  social_access_token: string | null;
  paymentGateWay: string | null;

  authorities: string[];
  username: string;
  password: string;

  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  disabled: boolean;

  _mobile: boolean;
  _social_sign_up: boolean;
  _email_validated: boolean;
  _active: boolean;
}
