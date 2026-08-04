import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ChildrenService } from '../../../../services/user/children.service';
import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { Grade } from '../../../../core/models/user/grade.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, switchMap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-child-form-component',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, RouterModule, NgSelectModule],
  templateUrl: './child-form-component.html',
  styleUrl: './child-form-component.scss',
})
export class ChildFormComponent implements OnInit {
  private readonly router = inject(Router);

  private fb = inject(FormBuilder);

  private childrenService = inject(ChildrenService);

  private toastrService = inject(ToastrAlertService);

  private readonly route = inject(ActivatedRoute);

  private readonly destroyRef = inject(DestroyRef);

  loading = signal(false);

  submitted: boolean = false;

  childrenForm!: FormGroup;

  isEditMode = false;

  studentId = '';

  grades: Grade[] = [];

  ngOnInit(): void {
    this.initializeForm();
    this.loadGrades();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.childrenForm = this.fb.group({
      first_name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z].*[\\s]*$')],
      ],

      last_name: [
        '',
        [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z].*[\\s]*$')],
      ],

      age: ['', Validators.required],

      gender: ['', Validators.required],

      grade: ['', Validators.required],

      school: ['', Validators.required],

      school_city: ['', Validators.required],
    });
  }

  private loadGrades(): void {
    this.childrenService
      .getAllGrades()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (grades) => {
          this.grades = grades;
        },
      });
  }

  private checkEditMode(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');

          if (!id) {
            return EMPTY;
          }

          this.isEditMode = true;
          this.studentId = id;
          this.loading.set(true);

          return this.childrenService.getChildById(this.studentId);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (student: any) => {
          this.loading.set(false);
          this.childrenForm.patchValue(student);
        },
        error: () => {
          this.loading.set(false);
          this.toastrService.error('Unable to load student.');
        },
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.childrenForm.invalid) {
      this.childrenForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const request = this.isEditMode
      ? this.childrenService.updateChild(this.studentId, this.childrenForm.value)
      : this.childrenService.createChild(this.childrenForm.value);

    request.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.loading.set(false);

        this.toastrService.success(
          this.isEditMode ? 'Student updated successfully.' : 'Student added successfully.',
        );

        this.router.navigate(['/children']);
      },
      error: () => {
        this.loading.set(false);
        this.toastrService.error('Unable to save student.');
      },
    });
  }

  get f() {
    return this.childrenForm.controls;
  }

  cancel(): void {
    this.childrenForm.reset();
  }
}
