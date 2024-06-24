import { html, nothing } from 'lit';
import {
  Template,
  ScheduleGraphColors,
} from './types'

export function getScheduleGraph(queue: string, day: string, hours: Record<number, number>, today: boolean, colors: ScheduleGraphColors): Template {
  const cls: Record<number, string> = {};

  const now = new Date;
  for (let i = 0; i <= 24; i++) {
    cls[i] = '';

    if (today && now.getHours() > i) {
      cls[i] += 'past';
    }

    const value = hours[i];
    if (value > 0 && value <= 2)
      cls[i] += value == 1 ? ' red' : ' yellow';
  }

  return html`<svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" version="1.1" viewBox="0 0 121.70833 121.70833">
    <style>
    .segment {
      fill:${colors.green};
      fill-opacity:1;
      stroke:${colors.background};
      stroke-width:.5;
    }
    .segment.red {
      fill:${colors.red};
    }
    .segment.yellow {
      fill:${colors.yellow};
    }
    .segment.past {
      fill-opacity:0.2;
    }
    .hour {
      font-style:normal;
      font-variant:normal;
      font-weight:600;
      font-stretch:normal;
      font-size:4.7625px;
      font-family:"Segoe UI";
      text-align:center;
      text-anchor:middle;
      fill:${colors.text};
      fill-opacity:1;
      stroke:none;
    }
    </style>
    <g>
      <path id="h0" d="M74.648-9.873A52.917 52.917 0 0 1 60.952-8.07v-52.917Z" class="segment ${cls[0]}" transform="scale(1 -1)"/>
      <path id="h1" d="M87.406-15.127a52.917 52.917 0 0 1-12.762 5.286L60.948-60.955Z" class="segment ${cls[1]}" transform="scale(1 -1)"/>
      <path id="h2" d="M98.352-23.51a52.917 52.917 0 0 1-10.96 8.41L60.936-60.927Z" class="segment ${cls[2]}" transform="scale(1 -1)"/>
      <path id="h3" d="M106.74-34.448a52.917 52.917 0 0 1-8.409 10.96L60.914-60.906Z" class="segment ${cls[3]}" transform="scale(1 -1)"/>
      <path id="h4" d="M112-47.197a52.917 52.917 0 0 1-5.287 12.762L60.886-60.893Z" class="segment ${cls[4]}" transform="scale(1 -1)"/>
      <path id="h5" d="M113.77-60.888a52.917 52.917 0 0 1-1.802 13.695L60.854-60.888Z" class="segment ${cls[5]}" transform="scale(1 -1)"/>
      <path id="h6" d="M113.77 60.722a52.917 52.917 0 0 1-1.802 13.696L60.854 60.722Z" class="segment ${cls[6]}"/>
      <path id="h7" d="M112 74.413a52.917 52.917 0 0 1-5.287 12.763L60.886 60.717Z" class="segment ${cls[7]}"/>
      <path id="h8" d="M106.74 87.163a52.917 52.917 0 0 1-8.409 10.959L60.914 60.704Z" class="segment ${cls[8]}"/>
      <path id="h9" d="M98.352 98.1a52.917 52.917 0 0 1-10.959 8.41L60.935 60.683Z" class="segment ${cls[9]}"/>
      <path id="h10" d="M87.406 106.483a52.917 52.917 0 0 1-12.762 5.286L60.948 60.656Z" class="segment ${cls[10]}"/>
      <path id="h11" d="M74.648 111.737a52.917 52.917 0 0 1-13.696 1.804V60.624Z" class="segment ${cls[11]}"/>
      <path id="h12" d="M-47.192 111.737a52.917 52.917 0 0 1-13.696 1.804V60.624Z" class="segment ${cls[12]}" transform="scale(-1 1)"/>
      <path id="h13" d="M-34.434 106.483a52.917 52.917 0 0 1-12.763 5.286l-13.696-51.113Z" class="segment ${cls[13]}" transform="scale(-1 1)"/>
      <path id="h14" d="M-23.488 98.1a52.917 52.917 0 0 1-10.96 8.41l-26.458-45.827Z" class="segment ${cls[14]}" transform="scale(-1 1)"/>
      <path id="h15" d="M-15.1 87.163a52.917 52.917 0 0 1-8.41 10.959l-37.417-37.418Z" class="segment ${cls[15]}" transform="scale(-1 1)"/>
      <path id="h16" d="M-9.84 74.413a52.917 52.917 0 0 1-5.287 12.763l-45.827-26.459Z" class="segment ${cls[16]}" transform="scale(-1 1)"/>
      <path id="h17" d="M-8.07 60.722a52.917 52.917 0 0 1-1.803 13.696l-51.113-13.696Z" class="segment ${cls[17]}" transform="scale(-1 1)"/>
      <path id="h18" d="M-8.07-60.888a52.917 52.917 0 0 1-1.803 13.695l-51.113-13.695Z" class="segment ${cls[18]}" transform="scale(-1)"/>
      <path id="h19" d="M-9.84-47.197a52.917 52.917 0 0 1-5.287 12.762l-45.827-26.458Z" class="segment ${cls[19]}" transform="scale(-1)"/>
      <path id="h20" d="M-15.1-34.448a52.917 52.917 0 0 1-8.41 10.96l-37.417-37.418z" class="segment ${cls[20]}" transform="scale(-1)"/>
      <path id="h21" d="M-23.488-23.51a52.917 52.917 0 0 1-10.96 8.41l-26.458-45.827z" class="segment ${cls[21]}" transform="scale(-1)"/>
      <path id="h22" d="M-34.434-15.127a52.917 52.917 0 0 1-12.763 5.286l-13.696-51.114Z" class="segment ${cls[22]}" transform="scale(-1)"/>
      <path id="h23" d="M-47.192-9.873A52.917 52.917 0 0 1-60.888-8.07v-52.917Z" class="segment ${cls[23]}" transform="scale(-1)"/>

      <circle cx="60.854" cy="60.722" r="26.458" style="fill:${colors.background};stroke-width:.0015774;stroke-linecap:round;stroke-miterlimit:2.5"/>

      <text x="60.819" y="6.3" class="hour">0</text>
      <text x="75.309" y="8.06" class="hour">1</text>
      <text x="89.349" y="13.757" class="hour">2</text>
      <text x="100.982" y="22.811" class="hour">3</text>
      <text x="109.752" y="34.218" class="hour">4</text>
      <text x="115.528" y="48.003" class="hour">5</text>
      <text x="117.469" y="62.362" class="hour">6</text>
      <text x="115.595" y="76.94" class="hour">7</text>
      <text x="110.436" y="90.434" class="hour">8</text>
      <text x="101.109" y="102.142" class="hour">9</text>
      <text x="89.269" y="112.064" class="hour">10</text>
      <text x="75.312" y="117.223" class="hour">11</text>
      <text x="61.289" y="119.406" class="hour">12</text>
      <text x="46.076" y="117.752" class="hour">13</text>
      <text x="31.677" y="112.227" class="hour">14</text>
      <text x="19.313" y="102.371" class="hour">15</text>
      <text x="10.657" y="90.628" class="hour">16</text>
      <text x="5.503" y="76.756" class="hour">17</text>
      <text x="3.506" y="62.295" class="hour">18</text>
      <text x="5.384" y="48.165" class="hour">19</text>
      <text x="10.969" y="33.864" class="hour">20</text>
      <text x="20.511" y="22.005" class="hour">21</text>
      <text x="33.324" y="12.949" class="hour">22</text>
      <text x="46.461" y="8.023" class="hour">23</text>

      <text x="60.996" y="60.117" style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:10.5833px;font-family:'Segoe UI';text-align:center;text-anchor:middle;fill:${colors.text};stroke:none;">${queue}</text>
      <text x="60.72" y="67.571" style="font-style:normal;font-variant:normal;font-weight:600;font-stretch:normal;font-size:6.35px;font-family:'Segoe UI';text-align:center;text-anchor:middle;fill:${colors.text};stroke:none;">${day}</text>
    </g>
  </svg>
  `;
}