import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrAlertService {
  private toastr = inject(ToastrService);
  private platformId = inject(PLATFORM_ID);

  success(message: string, title: string = 'Success') {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.success(message);
    }
  }

  error(message: string, title: string = 'Error') {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.error(message, title);
    }
  }

  warning(message: string, title: string = 'Warning') {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.warning(message, title);
    }
  }

  info(message: string, title: string = 'Info') {
    if (isPlatformBrowser(this.platformId)) {
      this.toastr.info(message, title);
    }
  }
}
