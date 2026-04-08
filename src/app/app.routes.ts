import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { Homecomponent } from './pages/user-pages/homecomponent/homecomponent';

export const routes: Routes = [
    {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', component: Homecomponent },
    //   { path: 'about', component: AboutComponent },
    ]
    
  },

];
