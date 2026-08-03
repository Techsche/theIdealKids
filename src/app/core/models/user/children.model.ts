export interface Children {
  id: string;

  first_name: string;

  last_name: string;

  age: number;

  gender: string;

  grade: string;

  school: string;

  school_city: string;

  grade_info: GradeInfo | null;

  competitionList: Competition[] | null;

  pendingCompetitionList: Competition[] | null;
}

export interface GradeInfo {
  name: string;

  grade: string;
}

export interface Competition {
  id?: string;

  name?: string;

  [key: string]: any;
}
