/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Hash router: renders the active view into #app and wires up global
   click / keydown / change / submit delegation for the whole prototype. */

let timers = [];
const clearTimers = () => { timers.forEach(t=>{clearInterval(t);clearTimeout(t);}); timers = []; };

function route(){
  clearTimers();
  closeAllDrops();
  const h = location.hash || '#/';
  const app = document.getElementById('app');
  let html = '';
  if(h.startsWith('#/admin-dashboard'))      html = viewAdminDash();
  else if(h.startsWith('#/admin-login'))      html = viewAdminLogin();
  else if(h.startsWith('#/help'))             html = viewHelp();
  else if(h.startsWith('#/faq'))              html = viewFaq();
  else if(h.startsWith('#/shipping'))         html = viewShipping();
  else if(h.startsWith('#/returns'))          html = viewReturns();
  else if(h.startsWith('#/privacy'))          html = viewPrivacy();
  else if(h.startsWith('#/terms'))            html = viewTerms();
  else if(h.startsWith('#/contact'))          html = viewContact();
  else if(h.startsWith('#/wishlist'))         html = viewWishlist();
  else if(h.startsWith('#/orders'))           html = viewOrders();
  else if(h.startsWith('#/product/'))         html = viewProduct(h.replace('#/product/','').split('/')[0].split('?')[0]);
  else if(h.startsWith('#/category/'))        html = viewCategory(decodeURIComponent(h.replace('#/category/','').split('/')[0].split('?')[0]));
  else if(h.startsWith('#/seller/'))          html = viewSellerStore(h.replace('#/seller/','').split('/')[0].split('?')[0]);
  else if(h.startsWith('#/marketplace'))      html = viewMarketplace();
  else if(h.startsWith('#/seller'))           html = viewSeller();
  else if(h.startsWith('#/profile'))          html = viewProfile();
  else if(h.startsWith('#/auth'))             html = viewAuth();
  else if(h.startsWith('#/cart'))             html = viewCart();
  else if(h.startsWith('#/checkout'))         html = viewCheckout();
  else if(h.startsWith('#/anime'))            html = viewAnime();
  else if(h.startsWith('#/manga'))            html = viewManga();
  else if(h.startsWith('#/communities'))      html = viewCommunities();
  else if(h.startsWith('#/shorts'))           html = viewShorts();
  else if(h.startsWith('#/messages'))         html = viewMessages();
  else if(h.startsWith('#/notifications'))    html = viewNotifications();
  else if(h.startsWith('#/search'))           html = viewSearchResults();
  else                                        html = viewLanding();
  app.innerHTML = html;
  if(!app.querySelector('footer')){
    app.insertAdjacentHTML('beforeend', siteFooter('border-t border-[#D0E3FF] bg-white mt-8'));
  }
  afterRender();
  if(h.startsWith('#/marketplace')) startCountdown();
}
function afterRender(){
  lucide.createIcons();
  const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} }),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  window.scrollTo({top:0});
}
window.addEventListener('hashchange', route);


function closeAllDrops(){ document.querySelectorAll('.drop.open').forEach(d=>d.classList.remove('open')); }

document.addEventListener('click', e=>{
  const t = e.target.closest('[data-action]');
  // close dropdowns when clicking outside
  if(!e.target.closest('.drop') && !t){ closeAllDrops(); }
  if(!t) return;
  const act = t.dataset.action;
  const toggle = id => { const d=document.getElementById(id); const was=d.classList.contains('open'); closeAllDrops(); if(!was) d.classList.add('open'); };

  switch(act){
    case 'auth-mode': authMode=t.dataset.mode; route(); break;
    case 'auth-switch': authMode=t.dataset.mode; openAuthModal(t.dataset.mode, t.dataset.role); break;
    case 'auth-open': openAuthModal(t.dataset.mode, t.dataset.role); break;
    case 'close-modal': case 'close-modal-bg': closeModal(); break;

    case 'set-region': /* handled on change */ break;
    case 'toggle-cart': toggle('drop-cart'); break;
    case 'toggle-notif': toggle('drop-notif'); break;
    case 'toggle-wish-drop': toggle('drop-wish'); break;
    case 'toggle-user': toggle('drop-user'); break;

    case 'mq-search': searchRun(); break;
    case 'mq-cat': searchSetCategory(t.dataset.cat); break;

    case 'wish': wishlistToggle(t.dataset.id); break;
    case 'add-cart': cartAdd(t.dataset.id); break;
    case 'cart-remove': cartRemove(t.dataset.id); break;
    case 'checkout': checkoutNow(); break;

    case 'logout': LS.del('session'); toast('Logged out. See you soon!','log-out'); location.hash='#/'; break;
    case 'prof-tab': profTab=t.dataset.tab; route(); break;
    case 'seller-tab': sellerTab=t.dataset.tab; route(); break;

    case 'copy': navigator.clipboard?.writeText(t.dataset.text); toast('Seller ID copied to clipboard.','clipboard-check'); break;
    case 'del-product': productDelete(t); break;

    case 'admin-tab': adminTab=t.dataset.tab; route(); break;
    case 'admin-view': adminView=t.dataset.view; route(); break;
    case 'admin-view-sel': /* handled on change */ break;
    case 'approve-seller': adminApproveSeller(t.dataset.id); break;
    case 'remove-seller': adminRemoveSeller(t.dataset.id); break;
    case 'restore-seller': adminRestoreSeller(t.dataset.id); break;
    case 'exit-admin': adminExit(); break;
    case 'toast': toast(t.dataset.msg,'sparkles'); break;
  }
});

document.addEventListener('keydown', e=>{
  if(e.key==='Enter' && e.target.matches && e.target.matches('[data-mqi]')){ e.preventDefault(); searchRunFromKeydown(e.target.value); }
});

document.addEventListener('change', e=>{
  const t=e.target;
  if(t.dataset.action==='set-region'){ LS.set('region', t.value); toast(`Region set to ${region().flag} ${region().name} — prices now in ${region().symbol.trim()}.`,'globe-2'); route(); }
  if(t.id==='mqCat'){ searchSetCategoryFromSelect(t.value); }
  if(t.dataset.action==='admin-view-sel'){ adminView=t.value; route(); }
  if(t.name==='images' && t.type==='file'){ previewProductImages(t); }
});

document.addEventListener('submit', e=>{
  if(e.target.id==='sellerAppForm'){ e.preventDefault(); sellerApply(e.target); }
  if(e.target.id==='productForm'){ e.preventDefault(); productAdd(e.target); }
  if(e.target.id==='adminLoginForm'){ e.preventDefault(); adminLogin(e.target); }
  if(e.target.id==='adminRegForm'){ e.preventDefault(); adminRegister(e.target); }
});

/* ---------- countdown ---------- */
