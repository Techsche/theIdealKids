import { CommonModule, formatDate } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EMPTY, forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Attendance } from '../../../../../../core/models/user/attendance.model';
import { RegisteredEvent } from '../../../../../../core/models/user/registered-event.model';
import { ToastrAlertService } from '../../../../../../services/common/toastr.services';
import { EventService } from '../../../../../../services/user/event.service';

@Component({
  selector: 'app-attendance.component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
})
export class AttendanceComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly eventService = inject(EventService);

  private readonly toastr = inject(ToastrAlertService);

  private readonly destroyRef = inject(DestroyRef);

  loading = signal(true);

  searchText = '';

  registeredStudent!: RegisteredEvent;

  // event!: EventDetails;

  attendance: Attendance[] = [];

  filteredAttendance: Attendance[] = [];

  ngOnInit(): void {
    this.loadAttendance();
  }

  private loadAttendance(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const registerId = params.get('registerId');
          if (!registerId) {
            this.toastr.error('Invalid registration.');
            return EMPTY;
          }

          return this.eventService.getRegisteredStudentByEvent(registerId);
        }),

        switchMap((student) => {
          this.registeredStudent = student;

          return forkJoin({
            // event: this.eventService.getEvent(student.event_id),
            attendance: this.eventService.getStudentAttendance(
              student.event_id,
              student.student_id,
            ),
          });
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: ({ attendance }) => {
          this.loading.set(false);
          // this.event = event;
          this.attendance = attendance ?? [];
          this.filteredAttendance = [...this.attendance];
        },
        error: () => {
          this.toastr.error('Unable to load attendance details.');
        },
      });
  }

  onSearch(): void {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.filteredAttendance = [...this.attendance];
      return;
    }

    this.filteredAttendance = this.attendance.filter((item) => {
      const date = formatDate(item.subevent_date, 'dd MMM yyyy', 'en-US').toLowerCase();

      const status = item.present ? 'present' : 'absent';

      return date.includes(keyword) || status.includes(keyword);
    });
  }

  get presentCount(): number {
    return this.attendance.filter((x) => x.present).length;
  }

  get absentCount(): number {
    return this.attendance.filter((x) => !x.present).length;
  }

  get attendancePercentage(): number {
    if (!this.attendance.length) {
      return 0;
    }

    return Math.round((this.presentCount / this.attendance.length) * 100);
  }
}
