import { LitElement, CSSResultGroup, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { register } from 'swiper/element/bundle';
import buildConfig from './config';
import localize from './localize';
import styles from './styles.css';
import {
  Template,
  MyHomeAssistant,
  PowerOutageScheduleCardConfig,
  PowerOutageSchedule,
  ScheduleGraphColors,
  PowerOutageCardAction,
} from './types'
import {
  getScheduleGraph,
} from './resources'

register();

@customElement('power-outage-schedule-card')
export class PowerOutageScheduleCard extends LitElement {
  @property({ attribute: false })
  public hass!: MyHomeAssistant;
  @state()
  private config!: PowerOutageScheduleCardConfig;

  static get styles(): CSSResultGroup {
    return styles;
  }

  setConfig(config: PowerOutageScheduleCardConfig) {
    this.config = buildConfig(config);
  }

  getCardSize(): Number {
    return 3;
  }

  protected render(): Template {
    if (!this.hass || !this.config)
      return nothing;

    const colors = this.getGraphColors();
    const queue = this.state(this.config.queue_entity);

    const header = this.config.title
      ? html`<div class="header">${this.config.title}</div>`
      : nothing;
    const today = this.getSchedule(queue, this.config.today_entity, colors);
    const tomorrow = this.getSchedule(queue, this.config.tomorrow_entity, colors);

    return html`
      <ha-card>
        ${header}
        <swiper-container>
          <swiper-slide>${today}</swiper-slide>
          <swiper-slide>${tomorrow}</swiper-slide>
        </swiper-container>
      </ha-card>
    `;
  }

  private getSchedule(queue: string, id: string, colors: ScheduleGraphColors): Template {
    const data = this.getQueueData(id);
    const day = this.getRelativeDate(data.eventDate);
    const dayLocal = localize(`common.${day}`);
    const hidePast = this.config.hide_past_hours && day == 'Today';
    const graph = getScheduleGraph(queue, dayLocal!, data.hours, hidePast, colors);
    const reload = this.getReloadIcon();

    if (!data.scheduleApprovedSince) {
      return html`
      <swiper-slide>
      <div class="schedule empty">
        ${this.config.empty_text}
        ${reload}
      </div>
      </swiper-slide>
      `;
    }

    const approvedSince = localize('common.approved_since');

    return html`
      <swiper-slide>
      <div class="schedule">
        ${graph}
        <div class="footer">
          <div class="actions">${reload}</div>
          <div class="approved">${approvedSince}: ${data.scheduleApprovedSince}</div>
        </div>
      </div>
      </swiper-slide>
    `;
  }

  private getQueueData(id: string): PowerOutageSchedule {
    const data: PowerOutageSchedule = {
      eventDate: '',
      scheduleApprovedSince: '',
      hours: {}
    };
    const state = this.state(id);
    const values = state.split(';');

    if (values.length < 3)
      return data;

    data.eventDate = values.shift()!;
    data.scheduleApprovedSince = values.shift()!;

    values.forEach(v => {
      if (!v)
        return;

      const [hour, value] = v.split(':');

      data.hours[Number(hour)] = Number(value);
    })
    return data;
  }

  private getReloadIcon(): Template {
    if (!this.config.reload_action)
      return nothing;
    return html`<div class="action-reload" @click=${this.onReload}><ha-icon icon="mdi:refresh"></ha-icon></div>`;
  }

  private onReload() {
    if (this.config.reload_action)
      this.callService(this.config.reload_action);
  }

  getGraphColors(): ScheduleGraphColors {
    const darkMode = this.hass.themes.darkMode;
    return {
      background: darkMode ? '#1d1d1d' : '#fff',
      text: darkMode ? '#eee' : '#000',
      green: '#34D058',
      red: '#F04F5A',
      yellow: '#FFCA2C',
    };
  }

  getRelativeDate(date: string) {
    const inputDate = new Date(date);
    const currentDate = new Date();

    const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    const differenceInTime = inputDateOnly.getTime() - currentDateOnly.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays === 0) {
      return "Today";
    } else if (differenceInDays === 1) {
      return "Tomorrow";
    } else if (differenceInDays === -1) {
      return "Yesterday";
    } else {
      return date;
    }
  }

  private callService(action: PowerOutageCardAction) {
    const { service, service_data, target } = action;
    const [domain, name] = service.split('.');
    
    this.hass.callService(domain, name, {
      ...service_data,
      entity_id: target,
    });
  }

  private state(id: string): string {
    return this.hass.states[id].state;
  }
}