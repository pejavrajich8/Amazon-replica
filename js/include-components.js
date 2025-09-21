// Simple component include loader. Finds elements with data-include and inserts the file contents.
async function fetchText(path){
  const res = await fetch(path);
  if(!res.ok) return '';
  return await res.text();
}

async function includeComponents(){
  // include top-level fragments
  const includes = Array.from(document.querySelectorAll('[data-include]'));
  await Promise.all(includes.map(async el => {
    const path = el.getAttribute('data-include');
    el.innerHTML = await fetchText(path);
  }));

  // replace product-card placeholders
  const cardTpl = await fetchText('/components/product-card.html');
  document.querySelectorAll('[data-component="product-card"]').forEach(el => el.outerHTML = cardTpl);
}

window.addEventListener('DOMContentLoaded', includeComponents);
