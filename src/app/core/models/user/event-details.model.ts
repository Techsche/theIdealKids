import { SubEvent, UserInfo } from './registered-event.model';

export interface EventDetails {
  id: string;

  name: string;

  address: string;

  description: string;

  event_description: string;

  start_date: number;

  registration_close_date: number;

  run_time: string;

  award_ceremony_time: string | null;

  minimum_donation: number;

  comp_min_donation: number;

  country_code: string;

  state: string;

  summer_run: boolean;

  is_multiDate: boolean;

  is_published: boolean;

  created_at: number;

  updated_at: number;

  user_id: string;

  message?: string;

  success?: boolean;

  subEvents: SubEvent[];

  eventCompetitions: EventCompetition[] | null;
}
export interface EventCompetition {
  competition_Id: string;

  competition_date: number;

  competition_name?: string;

  competition_description?: string;

  competition_short_description?: string;

  competition?: Competition | null;
}

export interface Competition {
  id: string;

  created_at?: string;

  updated_at?: string;

  name: string;

  message?: string;

  short_description: string;

  gradeList: string[];

  criterias: CompetitionCriteria[] | null;

  user_id: string;

  user_name?: string;

  user?: UserInfo | null;

  success?: boolean;
}
export interface CompetitionCriteria {
  name: string;

  visible: boolean;

  maxScore: number;
}
