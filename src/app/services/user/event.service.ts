import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { EventDetails } from '../../core/models/user/event-details.model';
import { RegisteredEvent, StudentInfo } from '../../core/models/user/registered-event.model';
import { Attendance } from '../../core/models/user/attendance.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private http = inject(HttpClient);

  private readonly apiUrl = environment.base;

  constructor() {}

  /**
   * Get My Events List
   */
  getMyEvents(): Observable<RegisteredEvent[]> {
    return this.http.get<RegisteredEvent[]>(`${this.apiUrl}api/session/user/registered/event`);
  }

  /**
   * Get My Events Details
   */
  getRegisteredStudentByEvent(id: string): Observable<RegisteredEvent> {
    return this.http.get<RegisteredEvent>(
      `${this.apiUrl}api/session/user/registered/event/student/${id}`,
    );
  }

  /**
   * Get Event Details
   */
  getEvent(eventId: string): Observable<EventDetails> {
    return this.http.get<EventDetails>(`${this.apiUrl}api/event/${eventId}`);
  }

  /**
   * Get Student Attendance
   */
  getStudentAttendance(eventId: string, studentId: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      `${this.apiUrl}api/session/user/registered/student/attendance/${eventId}/${studentId}/`,
    );
  }

  /**
   * Get Student
   */
  getStudent(studentId: string): Observable<StudentInfo> {
    return this.http.get<StudentInfo>(`${this.apiUrl}/api/session/getstudent/${studentId}`);
  }

  /**
   * Get Competition List for Student
   */
  getRegCompetitionListforStudent(
    eventId: string,
    studentId: string,
  ): Observable<RegisteredEvent[]> {
    return this.http.get<RegisteredEvent[]>(
      `${this.apiUrl}api/session/register/competitionList/${eventId}/${studentId}`,
    );
  }
}
