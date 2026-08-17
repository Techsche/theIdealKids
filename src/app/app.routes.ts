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
import { ChangePasswordComponent } from './pages/user-pages/accounts/change-password-component/change-password-component';
import { ChildrenComponent } from './pages/user-pages/accounts/children-component/children-component';
import { ChildFormComponent } from './pages/user-pages/accounts/child-form-component/child-form-component';
import { CurrentEventInfoComponent } from './pages/user-pages/accounts/current-event-info-component/current-event-info-component';
import { AttendanceComponent } from './pages/user-pages/accounts/my-events-component/component/attendance.component/attendance.component';
import { CompetitionComponent } from './pages/user-pages/accounts/my-events-component/component/competition.component/competition.component';
import { HighSchoolVolunteerProfile } from './pages/user-pages/accounts/high-school-volunteer-profile/high-school-volunteer-profile';
import { EventRegistrationComponent } from './pages/user-pages/accounts/event-registration/event-registration.component';

import { Dashboard } from './pages/admin-pages/dashboard/dashboard';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CreateBanner } from './pages/admin-pages/banners/create-banner/create-banner';
import { Banners } from './pages/admin-pages/banners/banners';
import { AdminUsers } from './pages/admin-pages/user-management/admin-users/admin-users';
import { SignedupUsers } from './pages/admin-pages/user-management/signedup-users/signedup-users';
import { HighSchoolVolunteers } from './pages/admin-pages/volunteers/high-school-volunteers/high-school-volunteers';
import { AddUser } from './pages/admin-pages/user-management/add-user/add-user';
import { MergeUsers } from './pages/admin-pages/user-management/merge-users/merge-users';
import { Locations } from './pages/admin-pages/location/locations/locations';
import { AddLocations } from './pages/admin-pages/location/add-locations/add-locations';
import { AddCategories } from './pages/admin-pages/volunteers/add-categories/add-categories';
import { VolunteerCategories } from './pages/admin-pages/volunteers/volunteer-categories/volunteer-categories';
import { AddEvent } from './pages/admin-pages/events/add-event/add-event';
import { Grades } from './pages/admin-pages/grade/grades/grades';

export const routes: Routes = [
  // =========================================================
  // USER APPLICATION
  // =========================================================

  {
    path: '',
    component: UserLayoutComponent,

    children: [
      {
        path: '',
        component: Homecomponent,
      },

      {
        path: 'about',
        component: AboutComponent,
      },

      {
        path: 'events',
        component: EventsComponent,
      },

      {
        path: 'ideal-tips',
        component: IdealTipsComponent,
      },

      {
        path: 'forms',
        component: FromsComponent,
      },

      // -------------------------------------------------------
      // AUTH
      // -------------------------------------------------------

      {
        path: 'login',
        component: LoginComponent,
        canActivate: [guestGuard],
      },

      {
        path: 'register',
        component: SignupComponent,
      },

      {
        path: 'volunteer-signup',
        component: VolunteerSignupComponent,
      },

      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },

      // -------------------------------------------------------
      // USER ACCOUNT
      // -------------------------------------------------------

      {
        path: 'my-events',
        component: MyEventsComponent,
        canActivate: [authGuard],
      },

      {
        path: 'student-attendance/:registerId',
        component: AttendanceComponent,
        canActivate: [authGuard],
      },

      {
        path: 'student-competition/:eventId/:studentId/:registrationNo',
        component: CompetitionComponent,
        canActivate: [authGuard],
      },

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },

      {
        path: 'high-school-volunteer-profile',
        component: HighSchoolVolunteerProfile,
        canActivate: [authGuard],
      },

      {
        path: 'children',
        component: ChildrenComponent,
        canActivate: [authGuard],
      },

      {
        path: 'child/add',
        component: ChildFormComponent,
        canActivate: [authGuard],
      },

      {
        path: 'child/edit/:id',
        component: ChildFormComponent,
        canActivate: [authGuard],
      },

      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [authGuard],
      },

      // -------------------------------------------------------
      // EVENTS
      // -------------------------------------------------------

      {
        path: 'event/:eventId',
        component: CurrentEventInfoComponent,
      },

      {
        path: 'register-event/:id',
        component: EventRegistrationComponent,
        canActivate: [authGuard],
      },
    ],
  },

  // =========================================================
  // ADMIN APPLICATION
  // =========================================================

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'banners',
        component: Banners,
      },
      {
        path: 'create-banner',
        component: CreateBanner,
      },

      // Usermanagement

      {
        path: 'user-management/users',
        component: AdminUsers,
      },

      {
        path: 'user-management/add-user',
        component: AddUser,
      },

      {
        path: 'user-management/signedup-users',
        component: SignedupUsers,
      },

      {
        path: 'user-management/merge-users',
        component: MergeUsers,
      },

      // Locations

      {
        path: 'location/locations',
        component: Locations,
      },

      {
        path: 'location/add-location',
        component: AddLocations,
      },

      // Event

      {
        path: 'event/add-event',
        component: AddEvent,
      },

      {
        path: 'event/events',
        component: EventsComponent,
      },

      // Volunteers

      {
        path: 'volunteers/high-school-volunteers',
        component: HighSchoolVolunteers,
      },

      {
        path: 'volunteers/add-category',
        component: AddCategories,
      },

      {
        path: 'volunteers/categories',
        component: VolunteerCategories,
      },

      // Grades

      {
        path: 'grade/grades',
        component: Grades,
      },

      // Competitions

      // {
      //   path: 'competitions',
      //   component: AdminCompetitionsComponent,
      // },
    ],
  },

  // =========================================================
  // FALLBACK
  // =========================================================

  {
    path: '**',
    redirectTo: '',
  },
];
