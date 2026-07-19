function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getLang() {
  return window.SiteI18n?.lang ?? 'en';
}

function renderOpenSourceCard(project) {
  return `
    <article class="project-card opensource-card">
      <div class="project-tag">${escapeHtml(project.tag)}</div>
      <h3>${escapeHtml(project.title)}</h3>
      <p>${escapeHtml(project.description)}</p>
      <a href="${escapeHtml(project.url)}" class="project-link" target="_blank" rel="noopener noreferrer">
        ${escapeHtml(project.linkLabel)}
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  `;
}

async function loadOpenSource() {
  const grid = document.getElementById('opensource-grid');
  if (!grid) return;

  const lang = getLang();

  try {
    const manifestResponse = await fetch('opensource/manifest.json');
    if (!manifestResponse.ok) throw new Error('Failed to load open-source project list');

    const projectFiles = await manifestResponse.json();
    const projects = await Promise.all(
      projectFiles.map(async (filename) => {
        const response = await fetch(`opensource/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        const data = await response.json();
        const localized = data[lang] ?? data.en;
        return { ...localized, url: data.url };
      })
    );

    grid.innerHTML = projects.map(renderOpenSourceCard).join('');
  } catch (error) {
    console.error(error);
    const message = window.SiteI18n?.t('opensource.error')
      ?? 'Unable to load open-source projects. Please try again later.';
    grid.innerHTML = `<p class="projects-error">${escapeHtml(message)}</p>`;
  }
}

document.addEventListener('languagechange', loadOpenSource);
window.SiteI18nReady?.then(loadOpenSource);
