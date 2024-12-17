import { html, nothing } from 'lit';
import {
  Template,
  ScheduleGraphColors,
} from './types'

export function getScheduleGraph(queue: string, day: string, periods: Record<number, number>, today: boolean, colors: ScheduleGraphColors): Template {
  const cls: Record<number, string> = {};
  const now = new Date;
  let hour = 0;
  let idx = 0;
  while (hour <= 24) {
    cls[idx] = '';

    if (today && (now.getHours() > hour || (now.getHours() == hour && now.getMinutes() > 30 && !(idx % 2)))) {
      cls[idx] += 'past';
    } else {
      debugger
    }

    const value = periods[idx];
    if (value > 0 && value <= 2)
      cls[idx] += value == 1 ? ' red' : ' yellow';

    hour += 0.5;
    idx += 1;
  }

  return html`<svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" version="1.1"  viewBox="0 0 100 100">
    <style>
    .segment-container {
      fill:none;
      fill-opacity:0;
      stroke:${colors.background};
      stroke-width:1.4;
      stroke-opacity:1;
    }
    .segment {
      fill:${colors.green};
      fill-opacity:1;
      stroke:${colors.green};
      stroke-width:.2;
      stroke-opacity:1;
    }
      
    .segment.past {
      fill:${colors.green_past};
      stroke:${colors.green_past};
    }
    .segment.red {
      fill:${colors.red};
      stroke:${colors.red};
    }
    .segment.red.past {
      fill:${colors.red_past};
      stroke:${colors.red_past};
    }
    .segment.yellow {
      fill:${colors.yellow};
      stroke:${colors.yellow};
    }
    .segment.yellow.past {
      fill:${colors.yellow_past};
      stroke:${colors.yellow_past};
    }
    .hour {
      font-weight:600;
      font-size:5px;
      font-family:"Segoe UI";
      text-align:center;
      text-anchor:middle;
      fill:${colors.text};
      fill-opacity:1;
      stroke:none;
    }
    .text {
      font-weight:600;
      font-family:"Segoe UI";
      text-align:center;
      text-anchor:middle;
      fill:${colors.text};
      fill-opacity:1;
      stroke:none;
      stroke-width:.5
      ;stroke-linecap:round;
      stroke-miterlimit:0;
      stroke-dasharray:none;
      stroke-opacity:1;
  }
    </style>
    <g>
      <path d="M50 7.25a42.75 42.75 0 0 1 11.065 1.456L50 50Z" class="segment-container"/>
      <path d="M50 7.25a42.75 42.75 0 0 1 5.58.366L50 50Z" class="segment ${cls[0]}"/>
      <path d="M55.58 7.616a42.75 42.75 0 0 1 5.485 1.09L50 50Z" class="segment ${cls[1]}"/>
      <path d="M61.065 8.706a42.75 42.75 0 0 1 10.31 4.271L50 50Z" class="segment-container"/>
      <path d="M61.065 8.706a42.75 42.75 0 0 1 5.295 1.798L50 50Z" class="segment ${cls[2]}"/>
      <path d="M66.36 10.504a42.75 42.75 0 0 1 5.015 2.473L50 50Z" class="segment ${cls[3]}"/>
      <path d="M71.375 12.977a42.75 42.75 0 0 1 8.854 6.794L50 50Z" class="segment-container"/>
      <path d="M71.375 12.977a42.75 42.75 0 0 1 4.65 3.107L50 50Z" class="segment ${cls[4]}"/>
      <path d="M76.025 16.084a42.75 42.75 0 0 1 4.204 3.687L50 50Z" class="segment ${cls[5]}"/>
      <path d="M80.229 19.771a42.75 42.75 0 0 1 6.794 8.854L50 50Z" class="segment-container"/>
      <path d="M80.229 19.771a42.75 42.75 0 0 1 3.687 4.204L50 50Z" class="segment ${cls[6]}"/>
      <path d="M83.916 23.975a42.75 42.75 0 0 1 3.107 4.65L50 50Z" class="segment ${cls[7]}"/>
      <path d="M87.023 28.625a42.75 42.75 0 0 1 4.27 10.31L50 50Z" class="segment-container"/>
      <path d="M87.023 28.625a42.75 42.75 0 0 1 2.473 5.015L50 50Z" class="segment ${cls[8]}"/>
      <path d="M89.496 33.64a42.75 42.75 0 0 1 1.798 5.295L50 50Z" class="segment ${cls[9]}"/>
      <path d="M91.294 38.935A42.75 42.75 0 0 1 92.75 50H50Z" class="segment-container"/>
      <path d="M91.294 38.935a42.75 42.75 0 0 1 1.09 5.485L50 50Z" class="segment ${cls[10]}"/>
      <path d="M92.384 44.42A42.75 42.75 0 0 1 92.75 50H50Z" class="segment ${cls[11]}"/>
      <path d="M92.75 50a42.75 42.75 0 0 1-1.456 11.065L50 50Z" class="segment-container"/>
      <path d="M92.75 50a42.75 42.75 0 0 1-.366 5.58L50 50Z" class="segment ${cls[12]}"/>
      <path d="M92.384 55.58a42.75 42.75 0 0 1-1.09 5.485L50 50Z" class="segment ${cls[13]}"/>
      <path d="M91.294 61.065a42.75 42.75 0 0 1-4.271 10.31L50 50Z" class="segment-container"/>
      <path d="M91.294 61.065a42.75 42.75 0 0 1-1.798 5.295L50 50Z" class="segment ${cls[14]}"/>
      <path d="M89.496 66.36a42.75 42.75 0 0 1-2.473 5.015L50 50Z" class="segment ${cls[15]}"/>
      <path d="M87.023 71.375a42.75 42.75 0 0 1-6.794 8.854L50 50Z" class="segment-container"/>
      <path d="M87.023 71.375a42.75 42.75 0 0 1-3.107 4.65L50 50Z" class="segment ${cls[16]}"/>
      <path d="M83.916 76.025a42.75 42.75 0 0 1-3.687 4.204L50 50Z" class="segment ${cls[17]}"/>
      <path d="M80.229 80.229a42.75 42.75 0 0 1-8.854 6.794L50 50Z" class="segment-container"/>
      <path d="M80.229 80.229a42.75 42.75 0 0 1-4.204 3.687L50 50Z" class="segment ${cls[18]}"/>
      <path d="M76.025 83.916a42.75 42.75 0 0 1-4.65 3.107L50 50Z" class="segment ${cls[19]}"/>
      <path d="M71.375 87.023a42.75 42.75 0 0 1-10.31 4.27L50 50Z" class="segment-container"/>
      <path d="M71.375 87.023a42.75 42.75 0 0 1-5.015 2.473L50 50Z" class="segment ${cls[20]}"/>
      <path d="M66.36 89.496a42.75 42.75 0 0 1-5.295 1.798L50 50Z" class="segment ${cls[21]}"/>
      <path d="M61.065 91.294A42.75 42.75 0 0 1 50 92.75V50Z" class="segment-container"/>
      <path d="M61.065 91.294a42.75 42.75 0 0 1-5.485 1.09L50 50Z" class="segment ${cls[22]}"/>
      <path d="M55.58 92.384a42.75 42.75 0 0 1-5.58.366V50Z" class="segment ${cls[23]}"/>
      <path d="M50 92.75a42.75 42.75 0 0 1-11.065-1.456L50 50Z" class="segment-container"/>
      <path d="M50 92.75a42.75 42.75 0 0 1-5.58-.366L50 50Z" class="segment ${cls[24]}"/>
      <path d="M44.42 92.384a42.75 42.75 0 0 1-5.485-1.09L50 50Z" class="segment ${cls[25]}"/>
      <path d="M38.935 91.294a42.75 42.75 0 0 1-10.31-4.271L50 50Z" class="segment-container"/>
      <path d="M38.935 91.294a42.75 42.75 0 0 1-5.295-1.798L50 50Z" class="segment ${cls[26]}"/>
      <path d="M33.64 89.496a42.75 42.75 0 0 1-5.015-2.473L50 50Z" class="segment ${cls[27]}"/>
      <path d="M28.625 87.023a42.75 42.75 0 0 1-8.854-6.794L50 50Z" class="segment-container"/>
      <path d="M28.625 87.023a42.75 42.75 0 0 1-4.65-3.107L50 50Z" class="segment ${cls[28]}"/>
      <path d="M23.975 83.916a42.75 42.75 0 0 1-4.204-3.687L50 50Z" class="segment ${cls[29]}"/>
      <path d="M19.771 80.229a42.75 42.75 0 0 1-6.794-8.854L50 50Z" class="segment-container"/>
      <path d="M19.771 80.229a42.75 42.75 0 0 1-3.687-4.204L50 50Z" class="segment ${cls[30]}"/>
      <path d="M16.084 76.025a42.75 42.75 0 0 1-3.107-4.65L50 50Z" class="segment ${cls[31]}"/>
      <path d="M12.977 71.375a42.75 42.75 0 0 1-4.27-10.31L50 50Z" class="segment-container"/>
      <path d="M12.977 71.375a42.75 42.75 0 0 1-2.473-5.015L50 50Z" class="segment ${cls[32]}"/>
      <path d="M10.504 66.36a42.75 42.75 0 0 1-1.798-5.295L50 50Z" class="segment ${cls[33]}"/>
      <path d="M8.706 61.065A42.75 42.75 0 0 1 7.25 50H50Z" class="segment-container"/>
      <path d="M8.706 61.065a42.75 42.75 0 0 1-1.09-5.485L50 50Z" class="segment ${cls[34]}"/>
      <path d="M7.616 55.58A42.75 42.75 0 0 1 7.25 50H50Z" class="segment ${cls[35]}"/>
      <path d="M7.25 50a42.75 42.75 0 0 1 1.456-11.065L50 50Z" class="segment-container"/>
      <path d="M7.25 50a42.75 42.75 0 0 1 .366-5.58L50 50Z" class="segment ${cls[36]}"/>
      <path d="M7.616 44.42a42.75 42.75 0 0 1 1.09-5.485L50 50Z" class="segment ${cls[37]}"/>
      <path d="M8.706 38.935a42.75 42.75 0 0 1 4.271-10.31L50 50Z" class="segment-container"/>
      <path d="M8.706 38.935a42.75 42.75 0 0 1 1.798-5.295L50 50Z" class="segment ${cls[38]}"/>
      <path d="M10.504 33.64a42.75 42.75 0 0 1 2.473-5.015L50 50Z" class="segment ${cls[39]}"/>
      <path d="M12.977 28.625a42.75 42.75 0 0 1 6.794-8.854L50 50Z" class="segment-container"/>
      <path d="M12.977 28.625a42.75 42.75 0 0 1 3.107-4.65L50 50Z" class="segment ${cls[40]}"/>
      <path d="M16.084 23.975a42.75 42.75 0 0 1 3.687-4.204L50 50Z" class="segment ${cls[41]}"/>
      <path d="M19.771 19.771a42.75 42.75 0 0 1 8.854-6.794L50 50Z" class="segment-container"/>
      <path d="M19.771 19.771a42.75 42.75 0 0 1 4.204-3.687L50 50Z" class="segment ${cls[42]}"/>
      <path d="M23.975 16.084a42.75 42.75 0 0 1 4.65-3.107L50 50Z" class="segment ${cls[43]}"/>
      <path d="M28.625 12.977a42.75 42.75 0 0 1 10.31-4.27L50 50Z" class="segment-container"/>
      <path d="M28.625 12.977a42.75 42.75 0 0 1 5.015-2.473L50 50Z" class="segment ${cls[44]}"/>
      <path d="M33.64 10.504a42.75 42.75 0 0 1 5.295-1.798L50 50Z" class="segment ${cls[45]}"/>
      <path d="M38.935 8.706A42.75 42.75 0 0 1 50 7.25V50Z" class="segment-container"/>
      <path d="M38.935 8.706a42.75 42.75 0 0 1 5.485-1.09L50 50Z" class="segment ${cls[46]}"/>
      <path d="M44.42 7.616A42.75 42.75 0 0 1 50 7.25V50Z" class="segment ${cls[47]}"/>

      <circle cx="50" cy="50" r="22" style="fill:${colors.background};fill-opacity:1;stroke:none;stroke-width:.592272;stroke-linecap:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1"/>

      <text x="49.936" y="5.325" class="hour">0</text>
      <text x="61.37" y="7.059" class="hour">1</text>
      <text x="73.324" y="11.477" class="hour">2</text>
      <text x="82.358" y="18.352" class="hour">3</text>
      <text x="89.823" y="28.283" class="hour">4</text>
      <text x="94.528" y="39.796" class="hour">5</text>
      <text x="95.925" y="51.879" class="hour">6</text>
      <text x="94.661" y="63.521" class="hour">7</text>
      <text x="90.037" y="74.346" class="hour">8</text>
      <text x="82.904" y="84.493" class="hour">9</text>
      <text x="72.883" y="92.493" class="hour">10</text>
      <text x="61.867" y="96.905" class="hour">11</text>
      <text x="50.148" y="98.22" class="hour">12</text>
      <text x="38.024" y="96.903" class="hour">13</text>
      <text x="26.605" y="92.493" class="hour">14</text>
      <text x="16.87" y="85.112" class="hour">15</text>
      <text x="8.942" y="74.878" class="hour">16</text>
      <text x="4.568" y="63.773" class="hour">17</text>
      <text x="3.068" y="51.86" class="hour">18</text>
      <text x="4.606" y="40.096" class="hour">19</text>
      <text x="8.807" y="28.706" class="hour">20</text>
      <text x="16.448" y="18.708" class="hour">21</text>
      <text x="26.845" y="10.999" class="hour">22</text>
      <text x="38.125" y="6.721" class="hour">23</text>

      <text x="50.211" y="48.903" class="text" style="font-size:10px;">${queue}</text>
      <text x="49.962" y="57.924" class="text" style="font-size:7px;">${day}</text>
    </g>
  </svg>
  `;
}