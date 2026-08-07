export interface UpcomingEvents {
  success: boolean;
  message: string;

  id: string;
  name: string;

  start_date: number;
  registration_close_date: number;

  run_time: string;
  award_ceremony_time: string | null;

  summer_run: boolean;
  is_multiDate: boolean;

  address: string;

  eventCompetitions: UpcomingEventCompetition[] | null;
  subEvents: SubEvent[] | null;

  is_published: boolean;

  country_code: string;
  state: string;

  description: string;
  event_description: string;

  minimum_donation: number;
  comp_min_donation: number;

  user_id: string;

  created_at: number;
  updated_at: number;
}

export interface UpcomingEventCompetition {
  competition_Id: string;
  current_round: number;
  competition_date: number;

  competitionDates: unknown[] | null;
  scoreInfoList: unknown[] | null;

  selected: boolean;
  completed: boolean;
}

export interface SubEvent {
  sub_event_number: number;
  event_date: number;
  description: string | null;
}
