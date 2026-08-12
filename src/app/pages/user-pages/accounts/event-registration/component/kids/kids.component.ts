import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

import { forkJoin } from 'rxjs';
import { ChildDetailsModal } from '../../modals/child-details-modal/child-details-modal';
import { CompetitionModal } from '../../modals/competition-modal/competition-modal';
import { GradeInfo, StudentInfo } from '../../../../../../core/models/user/registered-event.model';
import { Children, Competition } from '../../../../../../core/models/user/children.model';
import { EventDetails } from '../../../../../../core/models/user/event-details.model';
import { UserService } from '../../../../../../services/user/user.service';
import { EventService } from '../../../../../../services/user/event.service';
import { ChildrenService } from '../../../../../../services/user/children.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Grade } from '../../../../../../core/models/user/grade.model';
import { ILocation } from '../../../../../../core/models/user/location.model';
import { CompetitionService } from '../../../../../../services/user/competition.service';

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.scss',
})
export class KidsComponent implements OnInit {
  @Output() validationChanged = new EventEmitter<boolean>();
  @Input() event: EventDetails | null = null;

  validationCompleted: boolean = false;

  loading = signal(true);

  selectedLocation: string = '';

  eventId: string = '';

  studentId: string = '';

  gradeList: Grade[] | [] = [];

  locationList: ILocation[] | [] = [];

  registeredKids: any[] | [] = [];

  currentUserKids: any[] | [] = [];

  studentCompList: any[] | [] = [];

  eventCompetitions: any[] | [] = [];

  eventRooms: any[] | [] = [];

  pendingCompetionbyUser: any[] | [] = [];

  regCompetitionsforStudent: any[] | [] = [];

  studenList: any[] | [] = [];

  selectedValues: string[] = [];

  regPendingCompLength: number = 0;

  private eventService = inject(EventService);
  private userService = inject(UserService);
  private childrenService = inject(ChildrenService);
  private competitionService = inject(CompetitionService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.eventId = this.event?.id ?? '';

    if (this.eventId) {
      this.loadData();
    }
  }

  loadData() {
    this.loading.set(true);
    forkJoin({
      location: this.userService.getLocations(), // Get all locations
      grades: this.childrenService.getAllGrades(), // Get all grades
      registeredKids: this.eventService.getUserRegistedKids(this.eventId), // Get all user registed kids for this event
      studentCompList: this.eventService.getStudentswithRegCompetitions(this.eventId),
      eventCompetitions: this.competitionService.getEventCompetitions(this.eventId),
      eventRooms: this.eventService.getAllEventRooms(this.eventId),
      currentUserKids: this.childrenService.getChildren(), // Get all user kids/Student
      pendingCompetionbyUser: this.competitionService.getRegPendingCompetitionsByUser(this.eventId),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.gradeList = response.grades;
          this.locationList = this.filterLocations(response.location);

          this.selectedLocation = '-1';

          this.registeredKids = response.registeredKids;
          this.studentCompList = response.studentCompList;

          this.eventCompetitions = response.eventCompetitions;
          this.eventRooms = response.eventRooms;
          this.pendingCompetionbyUser = response.pendingCompetionbyUser;

          this.currentUserKids = this.checkKidRegistered(response.currentUserKids);
          // this.regCompetitionsforStudent = this.competitionService.getRegCompetitionsforStudent(
          //   this.eventId,
          //   this.studentId,
          // );
          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
        },
      });
  }

  private filterLocations(locations: ILocation[]): any[] {
    if (!this.event) {
      return [];
    }

    if (this.event.summer_run) {
      return locations.filter(
        (location) => location.country === this.event?.country_code && location.type === 'Run type',
      );
    }

    return locations.filter(
      (location) =>
        location.country === this.event?.country_code && location.type === 'Talent event type',
    );
  }

  checkKidRegistered(allKids: any[]): any[] {
    // No registered kids for this event
    if (!this.registeredKids || this.registeredKids.length === 0) {
      this.validatePage();

      return allKids;
    }

    // --------------------------------------------------
    // Check every kid against the registered kids
    // --------------------------------------------------

    allKids.forEach((kid) => {
      const registeredKid = this.registeredKids.find(
        (registration) => registration.student_id === kid.id,
      );

      // Kid is not registered for this event
      if (!registeredKid) {
        return;
      }

      // --------------------------------------------------
      // Restore previously selected location
      // --------------------------------------------------

      if (registeredKid.location_id && this.selectedLocation === '-1') {
        this.selectedLocation = registeredKid.location_id;
      }

      // --------------------------------------------------
      // Mark kid as registered
      // --------------------------------------------------

      kid.isRegisted = true;

      // --------------------------------------------------
      // Store registration completion status
      // --------------------------------------------------

      kid.isRegistrationCompleted = registeredKid.registration_completed;

      // --------------------------------------------------
      // Add incomplete registration to selected kids
      // --------------------------------------------------

      if (!kid.isRegistrationCompleted) {
        if (!this.selectedValues.includes(registeredKid.student_id)) {
          this.selectedValues.push(registeredKid.student_id);
        }
      }

      // --------------------------------------------------
      // Competition event
      // --------------------------------------------------

      if (!this.event?.summer_run) {
        // ----------------------------------------------
        // Get pending competitions for this student
        // ----------------------------------------------

        this.competitionService
          .getRegPendingCompetitionsBystudent(this.eventId, kid.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response: any[]) => {
            if (response && response.length > 0) {
              kid.ispendingCompetiton = true;
            }
          });

        // ----------------------------------------------
        // Get student's competition information
        // ----------------------------------------------

        const studentInfo = this.studentCompList.find((student) => student.id === kid.id);

        if (studentInfo) {
          kid.competitionList = studentInfo.competitionList;

          kid.pendingCompetitionList = studentInfo.pendingCompetitionList;
        }

        // ----------------------------------------------
        // Check whether all competitions are registered
        // ----------------------------------------------

        this.competitionService
          .getRegCompetitionsforStudent(this.eventId, kid.id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((response: any) => {
            if (response && response[0] && response[0].hasAllCompetitionsRegistered) {
              kid.hasAllCompetitionsRegistered = response[0].hasAllCompetitionsRegistered;
            }
          });
      }
    });

    // --------------------------------------------------
    // Validate Kids page
    // --------------------------------------------------

    this.validatePage();

    // --------------------------------------------------
    // Sort students
    // --------------------------------------------------

    // 1. Fully registered kids
    this.studenList = allKids.filter((kid) => kid.isRegisted && kid.isRegistrationCompleted);

    // 2. Add kids who are not registered
    this.studenList = allKids
      .filter((kid) => !kid.isRegisted && !kid.isRegistrationCompleted)
      .concat(this.studenList);

    // 3. Add registered but incomplete kids
    this.studenList = allKids
      .filter((kid) => kid.isRegisted && !kid.isRegistrationCompleted)
      .concat(this.studenList);

    // --------------------------------------------------
    // Return final student list
    // --------------------------------------------------

    return this.studenList;
  }

  validatePage(): void {
    if (this.selectedValues && this.selectedValues.length > 0 && this.selectedLocation !== '-1') {
      this.validationCompleted = true;
    } else if (
      (this.selectedValues && this.selectedValues.length > 0) ||
      this.selectedLocation === ''
    ) {
      this.validationCompleted = true;
    } else if (this.regPendingCompLength > 0) {
      this.validationCompleted = true;
    } else {
      this.validationCompleted = false;
    }

    // Tell EventRegistrationComponent
    // whether the Next button should be enabled
    this.validationChanged.emit(this.validationCompleted);
  }

  updateSelectedLocation(event: any) {
    this.selectedLocation = event.target.value;
    this.validatePage();
  }

  // UI selection update for kids
  updateSelectedStudents(event: any) {
    //summer run
    if (event.target.checked) {
      if (!this.selectedValues.includes(event.target.value)) {
        this.selectedValues.push(event.target.value);
      }
    } else {
      if (this.selectedValues.includes(event.target.value)) {
        this.selectedValues.splice(this.selectedValues.indexOf(event.target.value), 1);
      }
    }
    this.validatePage();
  }

  showStudentDetails(id: string) {}
  updateAndShowStudentDetails(id: string) {}
}
