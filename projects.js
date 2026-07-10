function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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

  try {
    const manifestResponse = await fetch('projects/manifest.json');
    if (!manifestResponse.ok) throw new Error('Failed to load project list');

    const projectFiles = await manifestResponse.json();
    const projects = await Promise.all(
      projectFiles.map(async (filename) => {
        const response = await fetch(`projects/${filename}`);
        if (!response.ok) throw new Error(`Failed to load ${filename}`);
        return response.json();
      })
    );

    grid.innerHTML = projects.map(renderProjectCard).join('');
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="projects-error">Unable to load projects. Please try again later.</p>';
  }
}

loadProjects();
