import { TemplateResult, nothing } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';

export type TemplateNothing = typeof nothing;
export type Template = TemplateResult | TemplateNothing;

export interface Theme {
  "primary-color": string;
  "text-primary-color": string;
  "accent-color": string;
}
export interface Themes {
  default_theme: string;
  darkMode: boolean;
  themes: {
    [key: string]: Theme;
  };
}
export interface Area {
  area_id: string;
  icon?: string;
  name?: string;
}
export interface MyHomeAssistant extends HomeAssistant {
  areas: Record<string, Area>;
  themes: Themes
}

export interface PowerOutageScheduleCardConfig {
  title: string;
  empty_text: string;
  hide_past_hours: boolean;
  queue_entity: string;
  today_entity: string;
  tomorrow_entity: string;
}

export interface PowerOutageSchedule {
  eventDate: string;
  scheduleApprovedSince: string;
  hours: Record<number, number>;
}

export interface ScheduleGraphColors {
  background: string;
  text: string;
  green: string;
  red: string;
  yellow: string;
}