import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface SelectedImage {
  id: number;
  file: File;
  preview: string;
}

@Component({
  selector: 'app-create-banner',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-banner.html',
  styleUrl: './create-banner.scss',
})
export class CreateBanner implements OnInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  // =========================================================
  // FORM
  // =========================================================

  bannerForm!: FormGroup;

  // =========================================================
  // LOADING
  // =========================================================

  loading = false;

  // =========================================================
  // SUBMITTED
  // =========================================================

  submitted = false;

  // =========================================================
  // IMAGE SETTINGS
  // =========================================================

  selectedImages: SelectedImage[] = [];

  imageError = '';

  readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];

  readonly minWidth = 1200;

  readonly minHeight = 400;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.bannerForm = this.fb.group({
      redirectUrl: ['', [Validators.required]],
      bannerText: [''],
      bannerDescription: ['', []],
    });
  }

  // =========================================================
  // FORM GETTERS
  // =========================================================

  get f() {
    return this.bannerForm.controls;
  }

  // =========================================================
  // IMAGE SELECT
  // =========================================================

  onImageSelected(event: Event): void {
    this.imageError = '';

    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const files = Array.from(input.files);

    files.forEach((file) => {
      this.validateAndAddImage(file);
    });

    /*
     * Allows selecting the same image again
     * after removing it.
     */

    input.value = '';
  }

  // =========================================================
  // VALIDATE IMAGE
  // =========================================================

  private validateAndAddImage(file: File): void {
    // ---------------------------------------------------------
    // FILE TYPE
    // ---------------------------------------------------------

    if (!this.allowedImageTypes.includes(file.type)) {
      this.imageError = `${file.name}: Only JPG, JPEG, PNG and WebP images are allowed.`;

      return;
    }

    // ---------------------------------------------------------
    // DUPLICATE IMAGE
    // ---------------------------------------------------------

    const duplicate = this.selectedImages.some(
      (image) =>
        image.file.name === file.name &&
        image.file.size === file.size &&
        image.file.lastModified === file.lastModified,
    );

    if (duplicate) {
      this.imageError = `${file.name}: This image has already been selected.`;

      return;
    }

    // ---------------------------------------------------------
    // CREATE PREVIEW URL
    // ---------------------------------------------------------

    const previewUrl = URL.createObjectURL(file);

    const image = new Image();

    // ---------------------------------------------------------
    // IMAGE LOADED
    // ---------------------------------------------------------

    image.onload = () => {
      // -------------------------------------------------------
      // DIMENSION VALIDATION
      // -------------------------------------------------------

      if (image.width < this.minWidth || image.height < this.minHeight) {
        this.imageError =
          `${file.name}: Image must be at least ` + `${this.minWidth} × ${this.minHeight}px.`;

        URL.revokeObjectURL(previewUrl);

        return;
      }

      // -------------------------------------------------------
      // ADD IMAGE
      // -------------------------------------------------------

      const selectedImage: SelectedImage = {
        id: Date.now() + Math.random(),

        file,

        preview: previewUrl,
      };

      this.selectedImages.push(selectedImage);

      this.imageError = '';
    };

    // ---------------------------------------------------------
    // INVALID IMAGE
    // ---------------------------------------------------------

    image.onerror = () => {
      this.imageError = `${file.name}: Invalid or corrupted image.`;

      URL.revokeObjectURL(previewUrl);
    };

    image.src = previewUrl;
  }

  // =========================================================
  // REMOVE IMAGE
  // =========================================================

  removeImage(id: number): void {
    const image = this.selectedImages.find((item) => item.id === id);

    if (image) {
      URL.revokeObjectURL(image.preview);
    }

    this.selectedImages = this.selectedImages.filter((item) => item.id !== id);

    this.imageError = '';
  }

  // =========================================================
  // CREATE BANNER
  // =========================================================

  createBanner(): void {
    this.submitted = true;

    this.imageError = '';

    // ---------------------------------------------------------
    // FORM VALIDATION
    // ---------------------------------------------------------

    if (this.bannerForm.invalid) {
      this.bannerForm.markAllAsTouched();

      return;
    }

    // ---------------------------------------------------------
    // IMAGE VALIDATION
    // ---------------------------------------------------------

    if (this.selectedImages.length === 0) {
      this.imageError = 'Please select at least one banner image.';

      return;
    }

    // ---------------------------------------------------------
    // START LOADING
    // ---------------------------------------------------------

    this.loading = true;

    // ---------------------------------------------------------
    // FORM DATA
    // ---------------------------------------------------------

    const formData = new FormData();

    formData.append('redirect_url', this.bannerForm.value.redirectUrl.trim());

    formData.append('text', this.bannerForm.value.bannerText.trim());

    formData.append('description', this.bannerForm.value.bannerDescription.trim());

    // ---------------------------------------------------------
    // ADD IMAGES
    // ---------------------------------------------------------

    this.selectedImages.forEach((image) => {
      formData.append('images', image.file);
    });

    // =========================================================
    // API CALL
    // =========================================================
    //
    // Replace this with your actual service:
    //
    // this.bannerService.createBanner(formData)
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe({
    //
    //     next: () => {
    //
    //       this.loading = false;
    //
    //       this.router.navigate([
    //         '/admin/homepage/banner'
    //       ]);
    //
    //     },
    //
    //     error: (error) => {
    //
    //       this.loading = false;
    //
    //       console.error(
    //         'Banner creation failed',
    //         error
    //       );
    //
    //     }
    //
    //   });
    // =========================================================

    /*
     * Temporary:
     * Remove this when connecting API.
     */

    console.log('Banner Form:', this.bannerForm.getRawValue());

    console.log('Selected Images:', this.selectedImages);

    console.log('FormData:', formData);

    this.loading = false;
  }

  // =========================================================
  // RESET FORM
  // =========================================================

  resetForm(): void {
    // ---------------------------------------------------------
    // REVOKE PREVIEW URLS
    // ---------------------------------------------------------

    this.selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));

    // ---------------------------------------------------------
    // RESET FORM
    // ---------------------------------------------------------

    this.bannerForm.reset();

    // ---------------------------------------------------------
    // RESET VARIABLES
    // ---------------------------------------------------------

    this.selectedImages = [];

    this.imageError = '';

    this.submitted = false;

    this.loading = false;
  }

  // =========================================================
  // CANCEL
  // =========================================================

  cancel(): void {
    this.resetForm();

    this.router.navigate(['/admin/banners']);
  }

  // =========================================================
  // DESTROY
  // =========================================================

  ngOnDestroy(): void {
    this.selectedImages.forEach((image) => URL.revokeObjectURL(image.preview));
  }
}
