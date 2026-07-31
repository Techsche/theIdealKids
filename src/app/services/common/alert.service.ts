import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  success(message: string, title: string = 'Success') {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  error(message: string, title: string = 'Error') {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }

  warning(message: string, title: string = 'Warning') {
    Swal.fire({
      title,
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  }

  confirm(message: string, title: string = 'Confirm'): Promise<boolean> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => result.isConfirmed);
  }
}
