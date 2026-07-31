export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: number;

  type: AlertType;

  message: string;

  autoClose?: boolean;

  duration?: number;
}
