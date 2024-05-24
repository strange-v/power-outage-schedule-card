# Power outage schedule card

Power outage schedule card for Home Assistant. The card is designed to work with the information provided by svitlo.oe.if.ua (see data retrieval example). It shows the schedule for today and tomorrow (if provided).

![Power outage schedule card example](/images/POS.gif)

## Card configuration example

```yaml
type: custom:power-outage-schedule-card
queue_entity: sensor.queue
today_entity: sensor.today
tomorrow_entity: sensor.tomorrow
hide_past_hours: true
title: Power outage schedule
empty_text: The schedule for hourly outages will be published by the end of the day.
```

## Data retrieval example

```yaml
rest:
  - resource: "https://svitlo.oe.if.ua/GAVTurnOff/GavGroupByAccountNumber"
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
    sensor:
    - name: "OE Queue"
      unique_id: 3ac7ab5e3ce64c558f86dd6c9c600677
      value_template: >-
        {% set data = value_json['current'] %}
        {% if data.hasQueue == "yes" %}
          {{ data.queue }}.{{ data.subqueue }}
        {% else %}
        No queue
        {% endif %}
    - name: "OE Today"
      unique_id: f8f18ae743474e31b9663aea35899241
      value_template: >-
        {% set data = value_json['current'] %}
        {% if data.hasQueue == "yes" %}
          {% set graph = value_json['graphs']['today'] %}
          {% if graph %}
            {{ graph.eventDate }};{{ graph.scheduleApprovedSince }};{% for hour in graph.hoursList %}{{ (hour.hour | int) - 1 }}:{{ hour.electricity }};{% endfor %}
          {% else %}
            none
          {% endif %}
        {% else %}
          none
        {% endif %}
    - name: "OE Tomorrow"
      unique_id: 30ae7b0bc3fd4da8ad2c2ab5678c522e
      value_template: >-
        {% set data = value_json['current'] %}
        {% if data.hasQueue == "yes" %}
          {% set graph = value_json['graphs']['tomorrow'] %}
          {% if graph %}
            {{ graph.eventDate }};{{ graph.scheduleApprovedSince }};{% for hour in graph.hoursList %}{{ (hour.hour | int) - 1 }}:{{ hour.electricity }};{% endfor %}
          {% else %}
            none
          {% endif %}
        {% else %}
          none
        {% endif %}
```
