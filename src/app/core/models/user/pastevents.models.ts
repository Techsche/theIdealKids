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


