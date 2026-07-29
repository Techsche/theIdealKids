import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { Homecomponent } from './pages/user-pages/homecomponent/homecomponent';
import { LoginComponent } from './pages/user-pages/login-component/login-component';
import { SignupComponent } from './pages/user-pages/signup-component/signup-component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: Homecomponent },
      //   { path: 'about', component: AboutComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: SignupComponent },
    ],
  },
];
