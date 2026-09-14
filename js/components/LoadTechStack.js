import techStackData from '../../db/constants/tech-stack-data.json' with { type: 'json' };
import { JsonToCss } from '../utils/JsonToCss.js';

const container = document.querySelector('#techStack');

export function LoadTechStack() {
  container.innerHTML = techStackData
    .map(
      (data) => `
        <div class="tech-stack-element">
          <img
            src="${data.icon}"
            alt="${data.name}"
            ${JsonToCss(data.iconStyle)}
            loading="lazy"
          />
          <p>${data.name}</p>
        </div>
      `
    )
    .join('');
}
