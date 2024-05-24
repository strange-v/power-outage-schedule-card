import localize from './localize';
import {
  PowerOutageScheduleCardConfig,
} from './types'

export default function buildConfig(
  config?: Partial<PowerOutageScheduleCardConfig>
): PowerOutageScheduleCardConfig {
  if (!config) {
    throw new Error(localize('error.invalid_config'));
  }

  if (!config.queue_entity || !config.today_entity || !config.tomorrow_entity) {
    throw new Error(localize('error.missing_entity'));
  }

  return {
    queue_entity: config.queue_entity,
    today_entity: config.today_entity,
    tomorrow_entity: config.tomorrow_entity,
    title: config.title ?? '',
    empty_text: config.empty_text ?? 'No data yet',
    hide_past_hours: config.hide_past_hours ?? true
  };
}