import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment.prod';
import { EventDetails } from '../../core/models/user/event-details.model';
import { RegisteredEvent, StudentInfo } from '../../core/models/user/registered-event.model';
import { Attendance } from '../../core/models/user/attendance.model';
import { UpcomingEvents } from '../../core/models/user/upcoming-events.models';
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
   * Get all user kids/Student
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

  /**
   * Get Upcoming Event
   */
  getUpcomingEvent(): Observable<UpcomingEvents[]> {
    return this.http.get<UpcomingEvents[]>(`${this.apiUrl}api/upcoming/event`);
  }

  /**
   * Get Event By Id
   */
  getUpcomingEventById(id: string): Observable<EventDetails> {
    return this.http.get<EventDetails>(`${this.apiUrl}api/event/${id}`);
  }

  /**
   * Get all user registed kids for a particular event
   */
  getUserRegistedKids(event_id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}api/session/register/event/${event_id}`);
  }

  getStudentswithRegCompetitions(event_id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/session/students/registered/competitions/${event_id}`,
    );
  }

  getAllEventRooms(event_id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/eventRooms/${event_id}`);
  }
}
