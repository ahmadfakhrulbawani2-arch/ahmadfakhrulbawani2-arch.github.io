import projectsAndWorksData from '../../db/constants/my-projects-data.json' with { type: 'json' };

const container = document.getElementById('worksGrid');

export function LoadWorksAndProjects() {
  container.innerHTML = projectsAndWorksData
    .map(
      (data, i) => `
      <!-- Project ${i + 1} -->
            <div class="works-element">
              <div class="works-image-wrapper">
                <img
                  src="${data.image.src}"
                  alt="Project ${data.image.alt}"
                  loading="lazy"
                />
              </div>
              <div class="works-content">
                <div class="works-text">
                  <h4 class="works-title">${data.title}</h4>
                  <p class="works-desc">
                    ${data.description}
                  </p>
                </div>
                <div class="works-footer">
                  <div class="works-tags">
                    ${data.tags
                      .map(
                        (tag) => `
                      <span class="work-tag">${tag}</span>
                      `
                      )
                      .join('')}
                  </div>
                  <div class="works-links">
                    <a
                      href="${data.links.github}"
                      class="github-icon"
                      target="_blank"
                    >
                      <span>Repo</span>
                      <i class="fa-brands fa-github"></i>
                    </a>
                    ${
                      data.links.demo &&
                      `<a
                      href="${data.links.demo}"
                      target="_blank"
                      class="works-link"
                      >Live Demo ↗</a
                    >`
                    }
                  </div>
                </div>
              </div>
            </div>
  `
    )
    .join('');
}
