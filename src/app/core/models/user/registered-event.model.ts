export interface RegisteredEvent {
  id: string;
  event_id: string;
  location_id: string;
  student_id: string;
  competition_id: string | null;

  registration_completed: boolean;
  register_number: number;
  payment_transaction_id: string | null;

  created_at: number;

  event: EventInfo;
  student: StudentInfo;

  eventCompetition: EventCompetition | null;
  location: LocationInfo | null;
  user: UserInfo | null;
  slot: SlotInfo | null;
  room: RoomInfo | null;
  competition: CompetitionInfo | null;
  register: RegisterInfo | null;

  competitions: CompetitionInfo[] | null;
  attendance: AttendanceInfo | null;
  studentAttendanceList: StudentAttendance[] | null;

  totalPresent: number;

  competition_date: number | null;
  competitionDates: number[] | null;

  slot_id: string | null;

  registered: boolean;
}

export interface EventInfo {
  start_date: number;
  name: string;

  summer_run: boolean;
  is_multiDate: boolean;

  address: string;

  judge_IDs: string[] | null;

  eventCompetitions: EventCompetition[] | null;

  is_published: boolean;

  event_dates: EventDate[] | null;

  subEvents: SubEvent[];

  registration_close_date: number;

  run_time: string;

  award_ceremony_time: string | null;

  award_ceremony_time_string: string | null;

  minimum_donation: number;

  comp_min_donation: number;

  description: string;

  event_description: string;

  country_code: string;

  state: string;

  competition: CompetitionInfo | null;

  current_round: number | null;

  slots: SlotInfo[] | null;

  total_slots: number | null;

  total_reg_slots: number | null;

  judgeList: UserInfo[] | null;

  competition_date: number | null;

  roomList: RoomInfo[] | null;

  completed: boolean;
}

export interface SubEvent {
  sub_event_number: number;
  event_date: number;
  description: string | null;
}

export interface EventDate {
  event_date: number;
  description: string | null;
}

export interface StudentInfo {
  id: string;

  first_name: string;

  last_name: string;

  age: number;

  gender: string;

  grade: string;

  school: string;

  school_city: string;

  grade_info: any;

  competitionList: CompetitionInfo[] | null;

  pendingCompetitionList: CompetitionInfo[] | null;
}

export interface EventCompetition {
  id?: string;

  name?: string;

  description?: string;
}

export interface CompetitionInfo {
  id?: string;

  name?: string;

  description?: string;
}

export interface AttendanceInfo {
  id?: string;

  attendance_date?: number;

  status?: string;
}

export interface StudentAttendance {
  id?: string;

  attendance_date?: number;

  status?: string;
}

export interface SlotInfo {
  id?: string;

  slot_name?: string;

  start_time?: string;

  end_time?: string;
}

export interface RoomInfo {
  id?: string;

  room_name?: string;
}

export interface LocationInfo {
  id?: string;

  name?: string;

  address?: string;

  country?: string;

  type?: string;
}

export interface UserInfo {
  id?: string;

  name?: string;

  email?: string;
}

export interface RegisterInfo {
  id?: string;
}
