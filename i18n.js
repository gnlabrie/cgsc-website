const SUPPORTED_LANGS = ['en', 'fr'];
const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'cgsc-lang';

function getNested(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

const SiteI18n = {
  lang: DEFAULT_LANG,
  strings: {},

  async init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const initialLang = SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
    await this.setLang(initialLang, false);
    this.bindSwitcher();
  },

  async setLang(lang, persist = true) {
    if (!SUPPORTED_LANGS.includes(lang)) return;

    const response = await fetch(`i18n/${lang}.json`);
    if (!response.ok) throw new Error(`Failed to load language: ${lang}`);

    this.lang = lang;
    this.strings = await response.json();

    if (persist) {
      localStorage.setItem(STORAGE_KEY, lang);
    }

    document.documentElement.lang = lang === 'fr' ? 'fr-CA' : 'en';
    this.apply();
    this.updateSwitcher();
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  },

  t(path) {
    return getNested(this.strings, path) ?? '';
  },

  apply() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = this.t(el.dataset.i18n);
      if (value) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const value = this.t(el.dataset.i18nAria);
      if (value) el.setAttribute('aria-label', value);
    });

    document.querySelectorAll('[data-i18n-href]').forEach((el) => {
      const value = this.t(el.dataset.i18nHref);
      if (value) el.setAttribute('href', value);
    });

    const title = this.t('meta.title');
    const description = this.t('meta.description');
    if (title) document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    }

    this.applyExpertise();
    this.applyExperience();
  },

  applyExpertise() {
    const items = this.strings.expertise?.items ?? [];
    document.querySelectorAll('[data-expertise-index]').forEach((card) => {
      const index = Number(card.dataset.expertiseIndex);
      const item = items[index];
      if (!item) return;

      const title = card.querySelector('[data-i18n-expertise-title]');
      const description = card.querySelector('[data-i18n-expertise-desc]');
      if (title) title.textContent = item.title;
      if (description) description.textContent = item.description;
    });
  },

  applyExperience() {
    const items = this.strings.experience?.items ?? [];
    document.querySelectorAll('[data-experience-index]').forEach((entry) => {
      const index = Number(entry.dataset.experienceIndex);
      const item = items[index];
      if (!item) return;

      const time = entry.querySelector('[data-i18n-experience-period]');
      const title = entry.querySelector('[data-i18n-experience-title]');
      const description = entry.querySelector('[data-i18n-experience-desc]');
      if (time) {
        time.textContent = item.period;
        time.setAttribute('datetime', item.datetime);
      }
      if (title) title.textContent = item.title;
      if (description) description.textContent = item.description;
    });
  },

  bindSwitcher() {
    document.querySelectorAll('[data-lang]').forEach((button) => {
      button.addEventListener('click', () => {
        this.setLang(button.dataset.lang);
        document.querySelector('.nav-links')?.classList.remove('is-open');
        document.querySelector('.nav-toggle')?.classList.remove('is-active');
      });
    });
  },

  updateSwitcher() {
    document.querySelectorAll('[data-lang]').forEach((button) => {
      const isActive = button.dataset.lang === this.lang;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive);
      button.setAttribute(
        'aria-label',
        this.t(this.lang === 'en' ? 'nav.switchToFr' : 'nav.switchToEn')
      );
    });
  },
};

window.SiteI18n = SiteI18n;
window.SiteI18nReady = SiteI18n.init();
