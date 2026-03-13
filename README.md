# Power outage schedule card

Power outage schedule card for Home Assistant. The card is designed to work with the information provided by svitlo.oe.if.ua (see data retrieval example). It shows the schedule for today and tomorrow (if provided).

![Power outage schedule card example](/images/POS.gif)

## Installation

### HACS

This card can be installed using [HACS](https://hacs.xyz/) (Home Assistant Community Store) custom repositories.

1. Install HACS.
1. Go to HACS -> Frontend -> Custom repositories (in the menu).
1. Set the repository to `https://github.com/strange-v/power-outage-schedule-card` and the category to `Lovelace`.
1. Click Explore & download repositories and search for `power outage schedule card`.
1. Select the card and click download.
1. Accept reload.

### Manual

1. Download `power-outage-schedule-card.js` file from the [latest-release](https://github.com/strange-v/power-outage-schedule-card/releases/latest) or `dist` folder.
1. Put `power-outage-schedule-card.js` file into your `config/www` folder (this can be done through the "File editor" addon if HA OS is used).
1. Add a reference to `power-outage-schedule-card.js` in Lovelace resources.
   1. Go to dashboard.
   2. Click edit and open the three dots menu.
   3. Click Manage resources.
   4. Click Add Resource.
   5. Set the URL to `/local/power-outage-schedule-card.js` and the Resource type to `JavaScript module`

## Configuration

1. Add REST sensors using `schedule-by-search`

    ```yaml
    rest:
      - resource: "https://be-svitlo.oe.if.ua/schedule-by-search"
        scan_interval: 1800
        method: POST
        headers:
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0"
          "Accept": "*/*"
          "Accept-Language": "en-US,en;q=0.5"
          "Accept-Encoding": "gzip, deflate, br, zstd"
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          "Origin": "https://svitlo.oe.if.ua"
          "Connection": "keep-alive"
          "Referer": "https://svitlo.oe.if.ua/"
        payload: "accountNumber=YOUR_ACCOUNT_NUMBER&userSearchChoice=pob&address="
        sensor:
        - name: "OE Queue"
          unique_id: 3ac7ab5e3ce64c558f86dd6c9c600677
          availability_template: >-
            {{ value_json is defined and value_json is mapping and value_json.current is defined }}
          value_template: >-
            {% set data = value_json.current %}
            {% if data.hasQueue | default('no') == 'yes' and data.queue is defined and data.subQueue is defined %}
              {{ data.queue }}.{{ data.subQueue }}
            {% else %}
              unknown
            {% endif %}
        - name: "OE Today"
          unique_id: 5fd8c49686d04772be7d51c2ccdba1f5
          availability_template: >-
            {{ value_json is defined and value_json is mapping and value_json.schedule is defined and value_json.current is defined }}
          value_template: >-
            {% set today = now().strftime('%d.%m.%Y') %}
            {% set rows = value_json.schedule | selectattr('eventDate', 'equalto', today) | list %}
            {% if rows | length > 0 %}
              {% set row = rows | last %}
              {% set queue_key = (value_json.current.queue | string) ~ '.' ~ (value_json.current.subQueue | string) %}
              {% set queue = row.queues.get(queue_key, []) %}
              {{ row.eventDate }};{{ row.scheduleApprovedSince }};
              {%- for period in queue %}{{ period.from }}-{{ period.to }}-{{ period.status }};{%- endfor %}
            {% else %}
              unknown
            {% endif %}
        - name: "OE Tomorrow"
          unique_id: c8450a42626a4769a5f612d16f3dfc70
          availability_template: >-
            {{ value_json is defined and value_json is mapping and value_json.schedule is defined and value_json.current is defined }}
          value_template: >-
            {% set tomorrow = (now() + timedelta(days=1)).strftime('%d.%m.%Y') %}
            {% set rows = value_json.schedule | selectattr('eventDate', 'equalto', tomorrow) | list %}
            {% if rows | length > 0 %}
              {% set row = rows | last %}
              {% set queue_key = (value_json.current.queue | string) ~ '.' ~ (value_json.current.subQueue | string) %}
              {% set queue = row.queues.get(queue_key, []) %}
              {{ row.eventDate }};{{ row.scheduleApprovedSince }};
              {%- for period in queue %}{{ period.from }}-{{ period.to }}-{{ period.status }};{%- endfor %}
            {% else %}
              unknown
            {% endif %}
    ```

1. Replace `YOUR_ACCOUNT_NUMBER` with your own account number. Do not publish real account data in shared configs.

1. Configure the card using YAML (the UI editor is unsupported)

    ```yaml
    type: custom:power-outage-schedule-card
    queue_entity: sensor.oe_queue
    today_entity: sensor.oe_today
    tomorrow_entity: sensor.oe_tomorrow
    hide_past_hours: true
    title: Power outage schedule
    empty_text: The schedule for hourly outages will be published by the end of the day.
    reload_action:
      service: homeassistant.update_entity
      target:
        entity_id: sensor.oe_queue
    ```

## Notifications

![Notification: power outage schedule added](/images/notification_schedule_added.png) ![Notification: power outage schedule changed](/images/notification_schedule_changed.png)

[Read more](/notifications/) about how to configure notifications.
