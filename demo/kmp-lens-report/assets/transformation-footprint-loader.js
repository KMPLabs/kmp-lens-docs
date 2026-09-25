(() => {
  let loading;
  function loadInventory() {
    if (window.KMP_TRANSFORMATION_ARTIFACTS) return Promise.resolve(window.KMP_TRANSFORMATION_ARTIFACTS);
    if (loading) return loading;
    loading = new Promise((resolve, reject) => {
      const ready = () => resolve(window.KMP_TRANSFORMATION_ARTIFACTS || []);
      window.addEventListener('kmp-transformation-artifacts-ready', ready, {once:true});
      const script = document.createElement('script');
      script.src = 'kmp-lens-report/assets/transformation-artifacts.js';
      script.onerror = () => reject(new Error('Transformation artifact inventory could not be loaded.'));
      document.head.appendChild(script);
    });
    return loading;
  }
  function row(item) {
    const article = document.createElement('article'); article.className = 'transformation-artifact';
    const title = document.createElement('strong'); title.textContent = item.producerOwnedIdentity || item.artifactId;
    const dl = document.createElement('dl');
    [['Producer',item.producer],['Operation',item.operation],['Source representation',item.sourceRepresentation],['Source identity',item.sourceIdentity],['Produced representation',item.representation],['Size',item.sizeBytes == null ? 'Not observed' : new Intl.NumberFormat('en').format(item.sizeBytes)+' bytes'],['SHA-256',item.sha256],['Task',item.taskPath],['Target',item.target],['Variant',item.variant],['Role',item.role]].forEach(([key,value]) => {
      const dt=document.createElement('dt');dt.textContent=key;const dd=document.createElement('dd');const code=document.createElement('code');code.textContent=value;dd.append(code);dl.append(dt,dd);
    });
    article.append(title,dl); return article;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest?.('[data-transformation-inventory]'); if (!button) return;
    button.disabled = true; button.textContent = 'Loading generated artifacts…';
    loadInventory().then(items => {
      const selected = items.filter(item => item.transformerId === button.dataset.transformationInventory);
      const fragment=document.createDocumentFragment();selected.forEach(item=>fragment.append(row(item)));
      button.nextElementSibling.replaceChildren(fragment);button.textContent=`${selected.length} generated artifacts`;button.hidden=true;
    }).catch(error => { button.disabled=false;button.textContent=error.message; });
  });
})();