export interface VolunteerCategory {
  id: string;

  pageName: string;

  pageUrl: string;

  displayAt: string;

  content: string;

  isExternalLink: boolean;

  externalLink: string | null;

  links: VolunteerCategoryLink[];
}

export interface VolunteerCategoryLink {
  id: string;

  title: string;

  url: string;

  isExternalLink: boolean;
}
