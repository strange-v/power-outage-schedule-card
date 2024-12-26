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

1. Go to `Settings` - `Devices & Services` - `Helpers` and create a new `Text` helper named "OE Queue",  set the value to "2.2" (will be updated later)
1. Add REST sensors for today and tomorrow

    ```yaml
    rest:
      - resource: "https://be-svitlo.oe.if.ua/schedule-by-queue"
        scan_interval: 1800
        headers:
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0"
          "Accept": "*/*"
          "Accept-Language": "en-US,en;q=0.5"
          "Accept-Encoding": "gzip, deflate, br, zstd"
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          "Origin": "https://svitlo.oe.if.ua"
          "Connection": "keep-alive"
          "Referer": "https://svitlo.oe.if.ua/"
        params:
          "queue": >
            {{ states('input_text.oe_queue') }}
        method: GET
        sensor:
        - name: "OE Today"
          unique_id: 5fd8c49686d04772be7d51c2ccdba1f5
          value_template: >-
            {% set today = now().strftime('%d.%m.%Y') %}
            {% set data = value_json | selectattr("eventDate", "equalto", today) | list %}
            {% if data | length > 0 %}
              {% set data = data | last %}
              {% set queue = data.queues[states('input_text.oe_queue')] %}
              {{ data.eventDate }};{{ data.scheduleApprovedSince }};
              {%- for period in queue %}{{ period.from }}-{{ period.to }}-{{ period.status }};{%- endfor %}
            {% else %}
              unknown
            {% endif %}
        - name: "OE Tomorrow"
          unique_id: c8450a42626a4769a5f612d16f3dfc70
          value_template: >-
            {% set tomorrow = (now() + timedelta(days=1)).strftime('%d.%m.%Y') %}
            {% set data = value_json | selectattr("eventDate", "equalto", tomorrow) | list %}
            {% if data | length > 0 %}
              {% set data = data | last %}
              {% set queue = data.queues[states('input_text.oe_queue')] %}
              {{ data.eventDate }};{{ data.scheduleApprovedSince }};
              {%- for period in queue %}{{ period.from }}-{{ period.to }}-{{ period.status }};{%- endfor %}
            {% else %}
              unknown
            {% endif %}
    ```

1. Configure automatic update of the OE Queue
    1. Add a new rest sensor

        ```yaml
        - resource: "https://be-svitlo.oe.if.ua/GavGroupByAccountNumber"
          scan_interval: 3600
          headers:
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:126.0) Gecko/20100101 Firefox/126.0"
            "Accept": "*/*"
            "Accept-Language": "en-US,en;q=0.5"
            "Accept-Encoding": "gzip, deflate, br, zstd"
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            "Origin": "https://svitlo.oe.if.ua"
            "Connection": "keep-alive"
            "Referer": "https://svitlo.oe.if.ua/"
          params:
            "accountNumber": "XXXXXXXX"
            "userSearchChoice": "pob"
            "address": ""
          method: POST
          sensor:
          - name: "OE Queue"
            unique_id: 3ac7ab5e3ce64c558f86dd6c9c600677
            value_template: >-
              {% set data = value_json['current'] %}
              {% if data.hasQueue == "yes" %}
                {{ data.queue }}.{{ data.subqueue }}
              {% else %}
                unknown
              {% endif %}
        ```

        You can use your address or personal account number to fetch the actual data about your queue.
        Put your oblenergo personal account number into the `accountNumber` parameter or your address (e.g., `Івано-Франківськ,Індустріальна,32`) into the `address` parameter.
    1. Add automation that updates the previously created `Text` helper and related sensors

        ```yaml
        alias: Update OE Queue
        description: ""
        triggers:
        - trigger: state
            entity_id:
            - sensor.queue
            to: null
            id: queue
        conditions:
        - condition: not
            conditions:
            - condition: state
                entity_id: sensor.queue
                state: unavailable
            - condition: state
                entity_id: sensor.queue
                state: unknown
        actions:
        - action: input_text.set_value
            metadata: {}
            data:
            value: "{{ states('sensor.queue') }}"
            target:
            entity_id: input_text.oe_queue
        - action: homeassistant.update_entity
            data:
            entity_id:
                - sensor.oe_today
        mode: single
        ```

1. Configure the card using YAML (the UI editor is unsupported)

    ```yaml
    type: custom:power-outage-schedule-card
    queue_entity: input_text.oe_queue
    today_entity: sensor.oe_today
    tomorrow_entity: sensor.oe_tomorrow
    hide_past_hours: true
    title: Power outage schedule
    empty_text: The schedule for hourly outages will be published by the end of the day.
    reload_action:
    service: homeassistant.update_entity
    target: sensor.oe_queue
    ```

## Notifications

![Notification: power outage schedule added](/images/notification_schedule_added.png) ![Notification: power outage schedule changed](/images/notification_schedule_changed.png)

[Read more](/notifications/) about how to configure notifications.
