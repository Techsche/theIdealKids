// services/user.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';

import { Children } from '../../core/models/user/children.model';
import { Grade } from '../../core/models/user/grade.model';

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  private http = inject(HttpClient);

  private apiUrl = environment.base;

  constructor() {}

  getChildren(): Observable<Children[]> {
    return this.http.get<Children[]>(`${this.apiUrl}api/session/students`);
  }

  getAllGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}api/grades`);
  }

  createChild(childData: any): Observable<Children> {
    return this.http.post<Children>(`${this.apiUrl}api/session/student/create`, childData);
  }

  getChildById(childId: string): Observable<Children> {
    return this.http.get<Children>(`${this.apiUrl}api/session/getstudent/${childId}`);
  }

  updateChild(childId: string, childData: any): Observable<Children> {
    return this.http.put<Children>(
      `${this.apiUrl}api/session/student/update/${childId}`,
      childData,
    );
  }

  deleteChild(childId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/session/student/delete/${childId}`);
  }
}
