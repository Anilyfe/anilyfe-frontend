/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Marketplace search box + category filter state, shared by marketplace.js
   and the global click/keydown listeners in navigation.js. */

let mqState = {cat:'All', q:''};

/* Fired from the search button (data-action="mq-search") */
function searchRun(){
  const vis = [...document.querySelectorAll('[data-mqi]')].find(el=>el.offsetParent!==null);
  const q = (vis && vis.value) || [...document.querySelectorAll('[data-mqi]')].map(e=>e.value).find(v=>v) || '';
  const c = document.getElementById('mqCat');
  mqState.q = q;
  if(c) mqState.cat = c.value;
  route();
}

/* Fired from a category chip (data-action="mq-cat" data-cat="...") */
function searchSetCategory(cat){
  mqState.cat = cat;
  if(cat === 'All') location.hash = '#/marketplace';
  else location.hash = '#/category/' + encodeURIComponent(cat);
  route();
}

/* Fired on Enter inside a search input (data-mqi) */
function searchRunFromKeydown(value){
  const c = document.getElementById('mqCat');
  mqState.q = value;
  if(c) mqState.cat = c.value;
  route();
}

/* Fired when the category <select id="mqCat"> changes */
function searchSetCategoryFromSelect(value){
  mqState.cat = value;
  if(value === 'All') location.hash = '#/marketplace';
  else location.hash = '#/category/' + encodeURIComponent(value);
  route();
}

/* Dedicated search-results page (pages/search.html). Reuses mqState so a
   search started from any page lands on filtered marketplace results. */
function viewSearchResults(){
  location.hash = '#/marketplace';
  return viewMarketplace();
}
