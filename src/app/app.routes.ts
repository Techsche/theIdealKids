import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { Homecomponent } from './pages/user-pages/homecomponent/homecomponent';
import { LoginComponent } from './pages/user-pages/login-component/login-component';
import { SignupComponent } from './pages/user-pages/signup-component/signup-component';
import { VolunteerSignupComponent } from './pages/user-pages/volunteer-signup-component/volunteer-signup-component';
import { ForgotPasswordComponent } from './pages/user-pages/forgot-password-component/forgot-password-component';
import { AboutComponent } from './pages/user-pages/about-component/about-component';
import { IdealTipsComponent } from './pages/user-pages/ideal-tips-component/ideal-tips-component';
import { FromsComponent } from './pages/user-pages/froms-component/froms-component';
import { EventsComponent } from './pages/user-pages/events-component/events-component';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';
import { MyEventsComponent } from './pages/user-pages/accounts/my-events-component/my-events-component';
import { ProfileComponent } from './pages/user-pages/accounts/profile-component/profile-component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: Homecomponent },
      { path: 'about', component: AboutComponent },
      { path: 'events', component: EventsComponent },
      { path: 'ideal-tips', component: IdealTipsComponent },
      { path: 'forms', component: FromsComponent },

      { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
      { path: 'register', component: SignupComponent },
      { path: 'volunteer-signup', component: VolunteerSignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },

      { path: 'my-events', component: MyEventsComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

      // Must be the last child route
      { path: '**', redirectTo: '' },
    ],
  },
];
