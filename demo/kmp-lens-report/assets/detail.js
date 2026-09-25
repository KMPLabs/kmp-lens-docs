window.KMP_DEFERRED_DATA = window.KMP_DEFERRED_DATA || {};
const deferredLoads = new Map();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function pathTree(path, analysisRoot, declarationName) {
  const tree = element('div', 'tree dependency-path');
  const nodes = [...path, declarationName];
  nodes.forEach((node, index) => {
    const row = element('div', 'tree-row');
    const prefix = index === 0 ? '' : `${'    '.repeat(index - 1)}└── `;
    const display = index === 0 ? analysisRoot : node;
    const label = index === 0 ? 'Observed module' :
      index === nodes.length - 1 ? 'Apple declaration' :
      node.startsWith(':') ? 'Local Gradle module' : 'Maven';
    row.append(element('code', '', prefix + display), element('span', '', label));
    tree.append(row);
  });
  return tree;
}

function renderPaths(target, data, declarationName) {
  const fragment = document.createDocumentFragment();
  if (!data.paths.length) {
    fragment.append(element('p', 'empty', 'No individual dependency path is scientifically demonstrated. The Apple declaration remains observed.'));
  } else {
    fragment.append(element('p', 'canonical-identity', `Canonical path-set ${data.id}`));
    if (data.complete === false) {
      fragment.append(element('p', 'path-set-coverage', 'Every displayed path is exact and demonstrated. The retained path set is non-exhaustive; additional demonstrated paths exist.'));
    } else if (data.complete === true) {
      fragment.append(element('p', 'path-set-coverage', 'This is the complete retained set of demonstrated paths.'));
    }
    data.paths.forEach((path, index) => {
      if (data.paths.length > 1) fragment.append(element('h3', '', `Path ${index + 1}`));
      fragment.append(pathTree(path, data.analysisRoot, declarationName));
    });
  }
  if (data.rawPaths.length) {
    const raw = element('details', 'raw-paths');
    raw.append(element('summary', '', `Raw canonical path values (${data.rawPaths.length})`));
    const list = element('ol', 'raw-path-list');
    data.rawPaths.forEach(value => {
      const item = element('li');
      item.append(element('code', '', value));
      list.append(item);
    });
    raw.append(list);
    fragment.append(raw);
  }
  target.replaceChildren(fragment);
}

function renderAlternatives(target, data) {
  const fragment = document.createDocumentFragment();
  fragment.append(element('p', 'canonical-identity', `Canonical alternative-set ${data.id}`));
  const list = element('ol', 'alternative-list');
  data.alternatives.forEach(value => {
    const item = element('li');
    item.append(element('code', '', value));
    list.append(item);
  });
  fragment.append(list);
  target.replaceChildren(fragment);
}

function renderDeferred(details) {
  const data = window.KMP_DEFERRED_DATA[details.dataset.deferredId];
  if (!data || details.dataset.deferredRendered === 'true') return false;
  const target = details.querySelector(':scope > .deferred-content');
  if (data.kind === 'paths') renderPaths(target, data, details.dataset.declarationName || 'Apple declaration');
  if (data.kind === 'alternatives') renderAlternatives(target, data);
  if (data.kind === 'html') target.innerHTML = data.html;
  details.dataset.deferredRendered = 'true';
  return true;
}

function loadDeferred(details) {
  if (renderDeferred(details)) return Promise.resolve();
  const source = details.dataset.deferredSrc;
  if (!deferredLoads.has(source)) {
    deferredLoads.set(source, new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = source;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Deferred report asset could not be loaded: ${source}`));
      document.head.appendChild(script);
    }));
  }
  return deferredLoads.get(source).then(() => {
    document.querySelectorAll(`.deferred-data[data-deferred-id="${details.dataset.deferredId}"]`).forEach(renderDeferred);
  }).catch(error => {
    details.querySelector(':scope > .deferred-content').textContent = error.message;
  });
}

document.addEventListener('toggle', event => {
  const details = event.target;
  if (details.matches?.('.deferred-data') && details.open) loadDeferred(details);
}, true);
document.addEventListener('click', event => {
  const link = event.target.closest?.('a[href^="#paths-"],a[href^="#source-"],a[href^="#evidence-"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (target?.matches('details')) {
    target.open = true;
    if (target.matches('.deferred-data')) loadDeferred(target);
  }
});
document.querySelectorAll('.deferred-data[open]').forEach(loadDeferred);