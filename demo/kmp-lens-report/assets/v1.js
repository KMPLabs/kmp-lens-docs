(() => {
  const tabs = [...document.querySelectorAll('.report-tabs a')];
  if (!tabs.length) return;
  const reportTabs = tabs[0].closest('.report-tabs');
  const reportTabsScrollKey = 'kmp-report-tabs-scroll-left';
  const rememberReportTabsScroll = () => {
    if (!reportTabs) return;
    try { sessionStorage.setItem(reportTabsScrollKey, String(reportTabs.scrollLeft)); } catch (_) {}
  };
  const restoreReportTabsScroll = () => {
    if (!reportTabs) return;
    try {
      const saved = Number(sessionStorage.getItem(reportTabsScrollKey));
      if (Number.isFinite(saved)) reportTabs.scrollLeft = saved;
    } catch (_) {}
  };
  restoreReportTabsScroll();
  reportTabs?.addEventListener('scroll', rememberReportTabsScroll, {passive: true});
  tabs.forEach(tab => tab.addEventListener('click', rememberReportTabsScroll));
  const reportSectionHashes = ['#overview', '#run-summary', '#module-structure', '#published-api'];
  const activateReportTab = hash => {
    tabs.forEach(tab => {
      const active = new URL(tab.href, location.href).hash === hash;
      if (active) tab.setAttribute('aria-current', 'page');
      else tab.removeAttribute('aria-current');
    });
  };
  const activateHashTarget = () => activateReportTab(location.hash || '#overview');
  let reportScrollFrame = 0;
  const activateVisibleSection = () => {
    reportScrollFrame = 0;
    const topbarBottom = document.querySelector('.topbar')?.getBoundingClientRect().bottom || 0;
    const sections = reportSectionHashes
      .map(hash => document.querySelector(hash))
      .filter(Boolean);
    if (!sections.length) return;
    let visible = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= topbarBottom + 8) visible = section;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      visible = sections[sections.length - 1];
    }
    activateReportTab(`#${visible.id}`);
  };
  const scheduleVisibleSectionActivation = () => {
    if (reportScrollFrame) return;
    reportScrollFrame = requestAnimationFrame(activateVisibleSection);
  };
  window.addEventListener('hashchange', activateHashTarget);
  window.addEventListener('scroll', scheduleVisibleSectionActivation, {passive: true});
  window.addEventListener('resize', scheduleVisibleSectionActivation);
  activateHashTarget();
  scheduleVisibleSectionActivation();
  const alignInitialSectionHash = () => {
    const hash = location.hash;
    if (!reportSectionHashes.includes(hash)) return;
    const params = new URLSearchParams(location.search);
    const restoresInvestigateState = ['investigateQuery', 'investigatePopulation', 'investigateDependency', 'investigatePage', 'investigateGroup', 'investigateView']
      .some(key => params.has(key));
    if (hash === '#published-api' && restoresInvestigateState) return;
    document.querySelector(hash)?.scrollIntoView();
  };
  if (document.readyState === 'complete') requestAnimationFrame(alignInitialSectionHash);
  else window.addEventListener('load', () => requestAnimationFrame(alignInitialSectionHash), {once:true});
})();
if (location.hash.startsWith('#type-')) {
  location.replace(`kmp-lens-report/details/type-navigation.html${location.hash}`);
}
const search = document.getElementById('search');
if (search) {
const groupFilter = document.getElementById('group-filter');
const knowledgeFilter = document.getElementById('knowledge-filter');
const indexContainer = document.querySelector('.api-index');
const count = document.getElementById('result-count');
const loader = document.getElementById('load-index');
const loaderContainer = document.querySelector('.index-loader');
const pagination = document.querySelector('.index-pagination');
const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');
const pageStatus = document.getElementById('page-status');
const activeDeclarationGroup = document.createElement('span');
activeDeclarationGroup.className = 'active-declaration-group';
activeDeclarationGroup.hidden = true;
count.before(activeDeclarationGroup);
const pageSize = 10;
let indexEntries = [];
let filteredEntries = [];
let currentPage = 0;
let declarationGroupFilter = '';
let indexPromise;
let lastVisitedHref = '';
const explorerStateKey = `kmp-api-explorer:${location.pathname}`;

function saveExplorerState(href) {
  lastVisitedHref = href;
  try {
    sessionStorage.setItem(explorerStateKey, JSON.stringify({
      search: search.value,
      group: groupFilter.value,
      knowledge: knowledgeFilter.value,
      declarationGroup: declarationGroupFilter,
      page: currentPage,
      scrollY: window.scrollY,
      href,
    }));
  } catch (_) {
    // The report remains fully usable when browser storage is unavailable.
  }
}

function loadIndex() {
  if (indexEntries.length) return Promise.resolve(indexEntries);
  if (indexPromise) return indexPromise;
  loader.disabled = true;
  loader.textContent = 'Loading declaration index…';
  indexPromise = new Promise((resolve, reject) => {
    const finish = () => {
      indexEntries = (window.KMP_SEARCH_INDEX || []).map(entry => ({
        ...entry,
        searchLower: entry.search.toLocaleLowerCase('en'),
        knowledgeTokens: entry.knowledge.split(' '),
      }));
      loaderContainer.hidden = true;
      resolve(indexEntries);
    };
    if (window.KMP_SEARCH_INDEX) return finish();
    window.addEventListener('kmp-search-index-ready', finish, {once: true});
    const script = document.createElement('script');
    script.src = 'kmp-lens-report/assets/search-index.js';
    script.onerror = () => reject(new Error('Declaration index could not be loaded.'));
    document.head.appendChild(script);
  });
  return indexPromise;
}

function declarationRow(entry) {
  const article = document.createElement('article');
  article.className = 'api-card api-index-row';
  article.dataset.group = entry.group;
  article.dataset.knowledge = entry.knowledge;
  article.dataset.declarationGroup = entry.declarationGroup;
  const dot = document.createElement('span');
  dot.className = `origin-dot ${entry.kind}`;
  const link = document.createElement('a');
  link.href = entry.href;
  link.textContent = entry.name;
  link.addEventListener('click', () => saveExplorerState(entry.href));
  if (entry.href === lastVisitedHref) article.classList.add('last-visited');
  const detail = document.createElement('small');
  detail.textContent = `${entry.status} · ${entry.groupLabel}`;
  article.append(dot, link, detail);
  return article;
}

function renderPage() {
  const pageCount = Math.max(1, Math.ceil(filteredEntries.length / pageSize));
  currentPage = Math.min(currentPage, pageCount - 1);
  const start = currentPage * pageSize;
  const fragment = document.createDocumentFragment();
  filteredEntries.slice(start, start + pageSize).forEach(entry => fragment.appendChild(declarationRow(entry)));
  indexContainer.replaceChildren(fragment);
  count.textContent = `${filteredEntries.length} declaration${filteredEntries.length === 1 ? '' : 's'}`;
  pagination.hidden = filteredEntries.length === 0;
  previousPage.disabled = currentPage === 0;
  nextPage.disabled = currentPage >= pageCount - 1;
  pageStatus.textContent = `Page ${currentPage + 1} of ${pageCount}`;
}

async function applyFilters(resetPage = true) {
  await loadIndex();
  const query = search.value.trim().toLocaleLowerCase('en');
  filteredEntries = indexEntries.filter(entry =>
    (!declarationGroupFilter ? (!query || entry.searchLower.includes(query)) : entry.declarationGroup === declarationGroupFilter) &&
    (!groupFilter.value || entry.group === groupFilter.value) &&
    (!knowledgeFilter.value || entry.knowledgeTokens.includes(knowledgeFilter.value))
  );
  if (resetPage) currentPage = 0;
  renderPage();
}

loader.addEventListener('click', applyFilters);
search.addEventListener('input', () => {
  declarationGroupFilter = '';
  activeDeclarationGroup.hidden = true;
  applyFilters();
});
[groupFilter, knowledgeFilter].forEach(control => control.addEventListener('input', applyFilters));
document.getElementById('clear-filters').addEventListener('click', () => {
  search.value = ''; groupFilter.value = ''; knowledgeFilter.value = ''; declarationGroupFilter = '';
  activeDeclarationGroup.hidden = true;
  applyFilters(); search.focus();
});
previousPage.addEventListener('click', () => { currentPage -= 1; renderPage(); });
nextPage.addEventListener('click', () => { currentPage += 1; renderPage(); });
document.querySelectorAll('[data-group-link]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  declarationGroupFilter = ''; search.value = ''; groupFilter.value = link.dataset.groupLink;
  activeDeclarationGroup.hidden = true;
  applyFilters();
  document.getElementById('published-api').scrollIntoView();
}));
document.querySelectorAll('[data-knowledge-link]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  declarationGroupFilter = ''; search.value = ''; groupFilter.value = '';
  knowledgeFilter.value = link.dataset.knowledgeLink;
  activeDeclarationGroup.hidden = true;
  applyFilters();
  document.getElementById('published-api').scrollIntoView();
}));
function exploreSearch(query) {
  declarationGroupFilter = '';
  activeDeclarationGroup.hidden = true;
  search.value = query;
  groupFilter.value = '';
  knowledgeFilter.value = '';
  applyFilters();
  history.replaceState(null, '', `#published-api?search=${encodeURIComponent(query)}`);
  search.focus({preventScroll: true});
}
document.querySelectorAll('.module-tree .tree-row').forEach(row => {
  const code = row.querySelector('code');
  if (!code) return;
  const query = code.textContent.replace(/^[├└│─\s]+/, '').trim();
  const link = document.createElement('a');
  link.href = '#published-api';
  link.className = 'module-search-link';
  link.textContent = code.textContent;
  link.title = `Explore declarations matching ${query}`;
  code.replaceChildren(link);
  link.addEventListener('click', event => {
    event.preventDefault();
    exploreSearch(query);
    document.getElementById('published-api').scrollIntoView();
  });
});
const initialSearch = decodeURIComponent(location.hash.match(/[?&]search=([^&]+)/)?.[1] || '');
if (initialSearch) {
  exploreSearch(initialSearch);
} else if (location.hash.startsWith('#published-api')) {
  try {
    const state = JSON.parse(sessionStorage.getItem(explorerStateKey) || 'null');
    if (state) {
      search.value = state.search || '';
      groupFilter.value = state.group || '';
      knowledgeFilter.value = state.knowledge || '';
      declarationGroupFilter = state.declarationGroup || '';
      currentPage = Number.isInteger(state.page) ? state.page : 0;
      lastVisitedHref = state.href || '';
      applyFilters(false).then(() => requestAnimationFrame(() => window.scrollTo(0, state.scrollY || 0)));
    }
  } catch (_) {
    // Invalid or unavailable session state never blocks report navigation.
  }
}
}