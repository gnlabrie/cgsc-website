function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getLang() {
  return window.SiteI18n?.lang ?? 'en';
}

function renderProjectCard(project) {
  const details = project.details
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join('');

  return `
    <article class="project-card">
      <div class="project-tag">${escapeHtml(project.tag)}</div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <ul class="project-details">${details}</ul>
    </article>
  `;
}

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const lang = getLang();

  try {
    const manifestResponse = await fetch('projects/manifest.json');
    if (!manifestResponse.ok) throw new Error('Failed to load project list');

    const projectFiles = await manifestResponse.json();
    const projects = await Promise.all(
      projectFiles.map(async (filename) => {
        const response = await fetch(`projects/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const data = await response.json();
        return data[lang] ?? data.en;
      })
    );

    grid.innerHTML = projects.map(renderProjectCard).join('');
  } catch (error) {
    console.error(error);
    const message = window.SiteI18n?.t('projects.error')
      ?? 'Unable to load projects. Please try again later.';
    grid.innerHTML = `<p class="projects-error">${escapeHtml(message)}</p>`;
  }
}

document.addEventListener('languagechange', loadProjects);
window.SiteI18nReady?.then(loadProjects);
