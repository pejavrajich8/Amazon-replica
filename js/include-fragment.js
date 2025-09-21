// Minimal include loader: injects fragments for elements with data-include
async function includeFragment(el){
  try{
    const path = el.getAttribute('data-include');
    if(!path) return;
    const res = await fetch(path);
    if(!res.ok) return;
    const html = await res.text();
    el.outerHTML = html;
  }catch(e){
    // silent fail - keep simple
    console.error('include-fragment error', e);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('[data-include]').forEach(el=> includeFragment(el));
});
