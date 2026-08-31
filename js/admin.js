/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Admin login + dashboard views, and the seller-moderation / admin-account
   actions used from admin/*.html. Not in the original file tree spec, but
   split out here so admin logic isn't buried inside app.js. */

let adminTab='login';
let adminView='dash';
function viewAdminLogin(){
  if(currentAdmin()){ location.hash='#/admin-dashboard'; return ''; }
  return `
  <div class="min-h-screen hero-ambient relative flex flex-col overflow-hidden">
    <div class="absolute inset-0 grid-lines"></div>${sparks(18,4)}
    <header class="relative z-10 max-w-6xl w-full mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO_D('text-xl')}
      <a href="#/" class="text-xs font-bold text-[#708BD1] hover:text-white transition flex items-center gap-1.5"><i data-lucide="arrow-left" style="width:13px;height:13px"></i> Back to marketplace</a>
    </header>
    <main class="relative z-10 flex-1 flex items-center justify-center px-4 pb-16">
      <div class="glass-dark rounded-3xl p-8 w-full max-w-md reveal">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-11 h-11 rounded-2xl bg-[rgba(208,227,255,.12)] border border-[rgba(208,227,255,.2)] flex items-center justify-center"><i data-lucide="shield-check" style="width:20px;height:20px;color:#D0E3FF"></i></span>
          <div><div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1]">RESTRICTED ACCESS</div><h1 class="font-display font-bold text-xl text-white">Administrator Gateway</h1></div>
        </div>
        <div class="inline-flex bg-[rgba(8,31,92,.6)] rounded-xl p-1 mb-6 w-full">
          <button class="tab-btn flex-1 ${adminTab==='login'?'!bg-white/15 !text-white':'!text-[#708BD1]'}" data-action="admin-tab" data-tab="login">Log in</button>
          <button class="tab-btn flex-1 ${adminTab==='register'?'!bg-white/15 !text-white':'!text-[#708BD1]'}" data-action="admin-tab" data-tab="register">Register</button>
        </div>
        ${adminTab==='login'?`
        <form id="adminLoginForm" class="space-y-4">
          <div><label class="lbl !text-[#708BD1]">Username</label><input class="inp !bg-[rgba(255,255,255,.08)] !border-[rgba(208,227,255,.2)] !text-white placeholder:!text-[#5a6fa8]" name="username" required placeholder="admin"/></div>
          <div><label class="lbl !text-[#708BD1]">Password</label><input class="inp !bg-[rgba(255,255,255,.08)] !border-[rgba(208,227,255,.2)] !text-white placeholder:!text-[#5a6fa8]" type="password" name="password" required placeholder="••••••••"/></div>
          <button class="btn btn-primary w-full !py-3">Access Control Panel <i data-lucide="lock-open" style="width:15px;height:15px"></i></button>
        </form>`:`
        <form id="adminRegForm" class="space-y-4">
          <div><label class="lbl !text-[#708BD1]">Choose username</label><input class="inp !bg-[rgba(255,255,255,.08)] !border-[rgba(208,227,255,.2)] !text-white placeholder:!text-[#5a6fa8]" name="username" required minlength="4" placeholder="min 4 characters"/></div>
          <div><label class="lbl !text-[#708BD1]">Password</label><input class="inp !bg-[rgba(255,255,255,.08)] !border-[rgba(208,227,255,.2)] !text-white placeholder:!text-[#5a6fa8]" type="password" name="password" required minlength="8" placeholder="min 8 characters"/></div>
          <button class="btn btn-primary w-full !py-3">Create Admin Identity <i data-lucide="user-plus" style="width:15px;height:15px"></i></button>
          <p class="text-[10px] text-[#5a6fa8] font-semibold leading-relaxed">New administrator identities are recorded and visible to the primary administrator.</p>
        </form>`}
      </div>
    </main>
  </div>`;
}

/* =========================================================
   VIEW — ADMIN DASHBOARD (hidden)
   ========================================================= */
function viewAdminDash(){
  const a = currentAdmin();
  if(!a){ location.hash='#/admin-login'; return ''; }
  const users = LS.get('users',[]), sellers = LS.get('sellers',[]), products = LS.get('products',[]);
  const pending = sellers.filter(s=>s.status==='pending');

  const nav = [
    {k:'dash',    i:'gauge',       l:'Dashboard'},
    {k:'approve', i:'user-check',  l:'Seller Approvals', badge:pending.length},
    {k:'market',  i:'shopping-bag',l:'Marketplace View'},
  ];

  let body='';
  if(adminView==='dash'){
    body = `
    <div class="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
      ${[['users','Total Users',users.length,'#334EAC'],['store','Total Sellers',sellers.length,'#081F5C'],['package','Total Products',products.length,'#708BD1'],['hourglass','Pending Approvals',pending.length,'#E9B949']].map((x,i)=>`
      <div class="card stat-card p-5 reveal" style="transition-delay:${i*60}ms">
        <div class="flex items-center justify-between mb-3"><span class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${x[3]}22"><i data-lucide="${x[0]}" style="width:18px;height:18px;color:${x[3]}"></i></span></div>
        <div class="font-display font-extrabold text-3xl">${x[2]}</div>
        <div class="text-[10px] font-bold uppercase tracking-widest text-[#708BD1] mt-1">${x[1]}</div>
      </div>`).join('')}
    </div>
    <div class="grid lg:grid-cols-2 gap-5">
      <div class="card p-6 reveal">
        <h3 class="font-display font-bold mb-4">Recent seller applications</h3>
        ${sellers.slice(-5).reverse().map(s=>`
        <div class="flex items-center gap-3 py-2.5 border-b border-[#E7F1FF] last:border-0">
          <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] text-white flex items-center justify-center font-bold text-sm shrink-0">${esc(s.businessName[0])}</span>
          <div class="flex-1 min-w-0"><div class="text-xs font-extrabold truncate">${esc(s.businessName)}</div><div class="text-[10px] text-[#708BD1] font-bold">${s.id}</div></div>
          <span class="badge ${s.status==='approved'?'!bg-[#E6F7EC] !text-[#1F9D55]':s.status==='pending'?'!bg-[#FFF7E0] !text-[#B7791F]':'!bg-[#FEF3F2] !text-[#B42318]'}">${s.status}</span>
        </div>`).join('')||'<div class="text-xs text-[#708BD1] font-semibold">No sellers yet.</div>'}
      </div>
      <div class="card p-6 reveal">
        <h3 class="font-display font-bold mb-4">Catalog health</h3>
        ${Object.keys(CATS).slice(0,6).map(c=>{ const n=products.filter(p=>catKey(p.category)===c).length; const max=Math.max(1,...Object.keys(CATS).map(k=>products.filter(p=>catKey(p.category)===k).length));
          return `<div class="mb-3"><div class="flex justify-between text-[11px] font-bold mb-1"><span>${c}</span><span class="text-[#708BD1]">${n}</span></div><div class="h-2 rounded-full bg-[#E7F1FF] overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-[#334EAC] to-[#708BD1] transition-all duration-700" style="width:${(n/max)*100}%"></div></div></div>`;}).join('')}
      </div>
    </div>`;
  }
  else if(adminView==='approve'){
    body = `
    <div class="card overflow-hidden reveal">
      <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
        <h3 class="font-display font-bold">Seller registry</h3>
        <span class="badge !bg-[#FFF7E0] !text-[#B7791F]">${pending.length} pending</span>
      </div>
      <div class="overflow-x-auto">
      <table class="tbl w-full min-w-[720px]">
        <thead><tr><th>Seller</th><th>ID</th><th>Sells</th><th>Starting price</th><th>Status</th><th class="!text-right">Actions</th></tr></thead>
        <tbody>
        ${sellers.map(s=>`
        <tr>
          <td><div class="flex items-center gap-3"><span class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] text-white flex items-center justify-center font-bold text-sm shrink-0">${esc(s.businessName[0])}</span><div><div class="font-extrabold text-xs">${esc(s.businessName)}</div><div class="text-[10px] text-[#708BD1] font-bold">★ ${s.rating||'New'} · ${s.sales||0} sales</div></div></div></td>
          <td class="font-tech text-xs font-bold text-[#708BD1]">${s.id}</td>
          <td class="text-xs max-w-[180px]"><div class="truncate">${esc(s.sells)}</div></td>
          <td class="text-xs font-bold">${fmt(s.startingPrice)}</td>
          <td><span class="badge ${s.status==='approved'?'!bg-[#E6F7EC] !text-[#1F9D55]':s.status==='pending'?'!bg-[#FFF7E0] !text-[#B7791F]':'!bg-[#FEF3F2] !text-[#B42318]'}">${s.status}</span></td>
          <td><div class="flex justify-end gap-2">
            ${s.status!=='approved'?`<button class="btn btn-primary !py-1.5 !px-3 !text-[10px]" data-action="approve-seller" data-id="${s.id}"><i data-lucide="check" style="width:12px;height:12px"></i> Approve</button>`:''}
            ${s.status!=='removed'?`<button class="btn btn-danger !py-1.5 !px-3 !text-[10px]" data-action="remove-seller" data-id="${s.id}"><i data-lucide="x" style="width:12px;height:12px"></i> Remove</button>`
              :`<button class="btn btn-ghost !py-1.5 !px-3 !text-[10px]" data-action="restore-seller" data-id="${s.id}"><i data-lucide="rotate-ccw" style="width:12px;height:12px"></i> Restore</button>`}
          </div></td>
        </tr>`).join('')}
        </tbody>
      </table>
      </div>
    </div>`;
  }
  else {
    const all = products.map(p=>({...p, seller: sellers.find(s=>s.id===p.sellerId)}));
    body = `
    <div class="card p-5 mb-5 flex items-center justify-between reveal">
      <h3 class="font-display font-bold">Entire marketplace — ${all.length} listings</h3>
      <span class="text-xs font-bold text-[#708BD1]">All sellers, all statuses</span>
    </div>
    <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      ${all.map(p=>`
      <div class="card !rounded-2xl p-3 flex gap-3 reveal">
        <div class="prod-media !w-20 !shrink-0" style="aspect-ratio:1"><div class="ph-icon"><i data-lucide="${CATS[catKey(p.category)].icon}" style="width:22px;height:22px"></i></div>${p.img?`<img src="${p.img}" onerror="this.remove()" alt=""/>`:''}</div>
        <div class="flex-1 min-w-0">
          <div class="text-xs font-extrabold truncate">${esc(p.name)}</div>
          <div class="text-[10px] text-[#708BD1] font-bold truncate">${esc(p.seller?p.seller.businessName:'—')}</div>
          <div class="font-display font-extrabold text-sm mt-1">${fmt(p.price)}</div>
          <div class="mt-1 flex items-center gap-1.5">
            <span class="badge ${p.seller&&p.seller.status==='approved'?'!bg-[#E6F7EC] !text-[#1F9D55]':'!bg-[#FFF7E0] !text-[#B7791F]'} !text-[8px]">${p.seller&&p.seller.status==='approved'?'Live':p.seller?p.seller.status:'—'}</span>
            <span class="text-[9px] font-bold text-[#708BD1]">${p.stock} stock</span>
          </div>
        </div>
      </div>`).join('')||'<div class="text-xs text-[#708BD1] font-semibold">No products yet.</div>'}
    </div>`;
  }

  return `
  <div class="min-h-screen bg-[#F6FCFF] flex">
    <!-- sidebar -->
    <aside class="hidden md:flex flex-col w-60 shrink-0 bg-[#081F5C] text-white p-5 sticky top-0 h-screen">
      ${LOGO_D('text-2xl')}
      <div class="mt-2 mb-8 font-tech text-[9px] tracking-[.3em] text-[#708BD1] font-bold">CONTROL PANEL</div>
      <nav class="space-y-1.5 flex-1">
        ${nav.map(n=>`<button class="side-item w-full !text-[#C9D9F5] hover:!bg-white/10 ${adminView===n.k?'!bg-white/15 !text-white':''}" data-action="admin-view" data-view="${n.k}">
          <i data-lucide="${n.i}" style="width:17px;height:17px"></i> ${n.l}
          ${n.badge?`<span class="ml-auto min-w-5 h-5 px-1 rounded-full bg-[#E9B949] text-[#081F5C] text-[10px] font-extrabold flex items-center justify-center">${n.badge}</span>`:''}
        </button>`).join('')}
      </nav>
      <div class="pt-5 border-t border-white/10">
        <div class="flex items-center gap-3 mb-4"><span class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-sm">${esc(a.username[0].toUpperCase())}</span><div><div class="text-xs font-extrabold">${esc(a.username)}</div><div class="text-[10px] text-[#708BD1] font-bold">Primary admin</div></div></div>
        <button class="side-item w-full !text-[#FFB4A8] hover:!bg-[#B42318]/30" data-action="exit-admin"><i data-lucide="door-open" style="width:17px;height:17px"></i> Exit Admin</button>
      </div>
    </aside>

    <!-- main -->
    <div class="flex-1 min-w-0">
      <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#D0E3FF] px-5 py-3.5 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="md:hidden">${LOGO_D('text-lg')}</span>
          <h2 class="font-display font-bold text-lg capitalize hidden md:block">${nav.find(n=>n.k===adminView).l}</h2>
        </div>
        <div class="flex items-center gap-2">
          ${regionSelect('!w-36')}
          <select class="inp !w-auto !py-2 !text-xs md:hidden" data-action="admin-view-sel">
            ${nav.map(n=>`<option value="${n.k}" ${adminView===n.k?'selected':''}>${n.l}</option>`).join('')}
          </select>
          <button class="btn btn-danger !py-2 !text-xs md:hidden" data-action="exit-admin">Exit</button>
        </div>
      </header>
      <main class="p-5 md:p-8">${body}</main>
    </div>
  </div>`;
}

/* ---------- seller moderation ---------- */
function adminApproveSeller(id){
  const ss = LS.get('sellers', []); const s = ss.find(x=>x.id===id);
  if(s){ s.status='approved'; LS.set('sellers', ss); toast(`"${esc(s.businessName)}" approved — products are now live.`, 'badge-check'); route(); }
}
function adminRemoveSeller(id){
  const ss = LS.get('sellers', []); const s = ss.find(x=>x.id===id);
  if(s){ s.status='removed'; LS.set('sellers', ss); toast(`"${esc(s.businessName)}" removed from the marketplace.`, 'user-x'); route(); }
}
function adminRestoreSeller(id){
  const ss = LS.get('sellers', []); const s = ss.find(x=>x.id===id);
  if(s){ s.status='pending'; LS.set('sellers', ss); toast(`"${esc(s.businessName)}" restored to pending.`, 'rotate-ccw'); route(); }
}
function adminExit(){
  LS.del('adminSession');
  toast('Exited admin panel.', 'door-open');
  location.hash = '#/';
}

/* ---------- admin auth ---------- */
function adminLogin(formEl){
  const f = new FormData(formEl);
  const a = LS.get('admins', []).find(x=>x.username===(f.get('username')||'').trim() && x.password===f.get('password'));
  if(!a){ toast('Invalid administrator credentials.', 'shield-alert'); return; }
  LS.set('adminSession', a.id);
  toast('Administrator access granted.', 'shield-check');
  location.hash = '#/admin-dashboard';
}
function adminRegister(formEl){
  const f = new FormData(formEl), admins = LS.get('admins', []);
  const un = (f.get('username')||'').trim();
  if(admins.find(x=>x.username===un)){ toast('Username already taken.', 'alert-triangle'); return; }
  admins.push({id: uid('ADM'), username: un, password: f.get('password'), createdAt: Date.now()});
  LS.set('admins', admins);
  LS.set('adminSession', admins[admins.length-1].id);
  toast('Administrator identity created.', 'user-plus');
  location.hash = '#/admin-dashboard';
}
