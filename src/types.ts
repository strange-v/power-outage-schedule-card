import {
  HassServiceTarget,
} from 'home-assistant-js-websocket';
import { HomeAssistant } from 'custom-card-helpers';
import { TemplateResult, nothing } from 'lit';

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

export interface PowerOutageCardAction {
  service: string;
  service_data?: Record<string, unknown>;
  target?: HassServiceTarget;
}

export interface PowerOutageScheduleCardConfig {
  title: string;
  empty_text: string;
  hide_past_hours: boolean;
  queue_entity: string;
  today_entity: string;
  tomorrow_entity: string;
  reload_action?: PowerOutageCardAction;
}

export interface Time {
  hour: number;
  minute: number;
}
export interface PowerOutagePeriod {
  from: Time;
  to: Time;
  state: number;
}
export interface PowerOutageSchedule {
  eventDate: string;
  scheduleApprovedSince: string;
  periods: PowerOutagePeriod[];
}

export interface ScheduleGraphColors {
  background: string;
  text: string;
  green: string;
  green_past: string;
  red: string;
  red_past: string;
  yellow: string;
  yellow_past: string;
}