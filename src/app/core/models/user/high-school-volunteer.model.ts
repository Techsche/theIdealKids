// models/high-school-volunteer.model.ts

export interface HighSchoolVolunteerRequest {
  name: string;
  email: string;

  school_name: string;
  school_city: string;
  grade: string;

  mobileNo: string;

  password: string;
  confirmPassword: string;

  mom_name: string;
  mom_email: string;
  mom_mobile_number: string;

  dad_name: string;
  dad_email: string;
  dad_mobile_number: string;

  coach_name: string;
  coach_email: string;
  area_of_expertise: string;

  volunteer_categories: number[] | null;
  selectedCategories: number[];
}
