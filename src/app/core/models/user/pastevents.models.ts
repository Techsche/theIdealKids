export interface WeeklyRun {
  title: string;
  location?: string;
  pictureUrl?: string;
}

export interface EventItem {
  title: string;
  date: string;
  description?: string;
  type: 'run' | 'talent' | 'speech' | 'general';
  pictureUrl?: string;
  weeks?: WeeklyRun[];
}

export interface YearEvents {
  year: number;
  events: EventItem[];
}

export interface UpcomingEvent {
  title: string;
  date: string;
  location: string;
  status: 'Open' | 'Coming Soon' | 'Closed';
  registrationUrl?: string;
}
