# Notifications about schedule added or changed

I like getting updates about changes in the power outage schedule, so I can update my plans accordingly. There are two types of notifications:

- Schedule added
- Schedule changes

Each notification consists of automation and script.

## Schedule added automation

```yaml
alias: Power outage schedule added
description: Notifies when a power schedule for today or tomorrow is added
trigger:
  - platform: state
    entity_id:
      - sensor.today
    to: null
    id: today
    for:
      hours: 0
      minutes: 0
      seconds: 5
    from: none
  - platform: state
    entity_id:
      - sensor.tomorrow
    to: null
    id: tomorrow
    for:
      hours: 0
      minutes: 0
      seconds: 5
    from: none
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id:
              - today
        sequence:
          - data:
              day: today
              current: "{{ trigger.to_state.state }}"
              previous: "{{ trigger.from_state.state }}"
            action: script.notify_power_outage_schedule_added
      - conditions:
          - condition: trigger
            id:
              - tomorrow
        sequence:
          - data:
              day: tomorrow
              current: "{{ trigger.to_state.state }}"
              previous: "{{ trigger.from_state.state }}"
            action: script.notify_power_outage_schedule_added
mode: single
```

## Schedule changed automation

```yaml
alias: Power outage schedule changed
description: Notifies when an existing schedule for today or tomorrow changes
trigger:
  - platform: state
    entity_id:
      - sensor.today
    to: null
    id: today
    for:
      hours: 0
      minutes: 0
      seconds: 5
  - platform: state
    entity_id:
      - sensor.tomorrow
    to: null
    id: tomorrow
    for:
      hours: 0
      minutes: 0
      seconds: 5
condition: []
action:
  - choose:
      - conditions:
          - condition: trigger
            id:
              - today
        sequence:
          - data:
              day: today
              current: "{{ trigger.to_state.state }}"
              previous: "{{ trigger.from_state.state }}"
            action: script.notify_power_outage_schedule_changed
      - conditions:
          - condition: trigger
            id:
              - tomorrow
        sequence:
          - data:
              day: tomorrow
              current: "{{ trigger.to_state.state }}"
              previous: "{{ trigger.from_state.state }}"
            action: script.notify_power_outage_schedule_changed
mode: single
```

### Scripts

All needed scripts are in [scripts.yaml](scripts.yaml).
