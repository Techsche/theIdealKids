import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'child/edit/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'student-attendance/:registerId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'student-competition/:eventId/:studentId/:registrationNo',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
