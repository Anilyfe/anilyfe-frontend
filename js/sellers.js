/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Seller dashboard view + buyer profile (profile.html) since the
   'become a seller' application and profile tabs live together in the prototype. */

let profTab = 'profile';
function viewProfile(){
  const u = currentUser();
  if(!u){ location.hash='#/auth'; return ''; }
  const s = sellerOf(u.id);
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    ${marketTopBar(u)}
    <main class="max-w-5xl mx-auto px-4 py-10">
      <div class="flex items-center gap-5 mb-8 reveal">
        <span class="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#334EAC] to-[#081F5C] text-white flex items-center justify-center font-display font-extrabold text-3xl shadow-xl">${esc(u.name[0].toUpperCase())}</span>
        <div>
          <h1 class="font-display font-extrabold text-2xl md:text-3xl">${esc(u.name)}</h1>
          <div class="flex flex-wrap gap-2 mt-2 text-xs">
            <span class="badge !bg-[#E7F1FF] !text-[#334EAC]"><i data-lucide="mail" style="width:11px;height:11px"></i> ${esc(u.email)}</span>
            <span class="badge !bg-[#E7F1FF] !text-[#334EAC]"><i data-lucide="map-pin" style="width:11px;height:11px"></i> ${REGIONS.find(r=>r.code===u.region)?.name||region().name}</span>
            <span class="badge !bg-[#E7F1FF] !text-[#334EAC]"><i data-lucide="calendar" style="width:11px;height:11px"></i> Member since ${new Date(u.createdAt).toLocaleDateString(undefined,{month:'short',year:'numeric'})}</span>
          </div>
        </div>
      </div>

      <div class="inline-flex bg-[#E7F1FF] rounded-2xl p-1.5 mb-7 reveal">
        <button class="tab-btn ${profTab==='profile'?'active':''}" data-action="prof-tab" data-tab="profile"><i data-lucide="circle-user-round" style="width:14px;height:14px;display:inline;vertical-align:-2px"></i> Profile</button>
        <button class="tab-btn ${profTab==='seller'?'active':''}" data-action="prof-tab" data-tab="seller"><i data-lucide="store" style="width:14px;height:14px;display:inline;vertical-align:-2px"></i> Become a Seller</button>
      </div>

      ${profTab==='profile' ? `
      <div class="grid md:grid-cols-3 gap-5 reveal">
        <div class="card p-6 md:col-span-2">
          <h3 class="font-display font-bold mb-4">Account details</h3>
          <div class="grid sm:grid-cols-2 gap-4 text-sm">
            <div><div class="lbl">Full name</div><div class="font-bold">${esc(u.name)}</div></div>
            <div><div class="lbl">Email</div><div class="font-bold">${esc(u.email)}</div></div>
            <div><div class="lbl">Account type</div><div class="font-bold capitalize">${s?'Seller':'Buyer'}</div></div>
            <div><div class="lbl">Preferred currency</div><div class="font-bold">${region().flag} ${region().name} (${region().symbol.trim()})</div></div>
          </div>
          <div class="mt-6"><div class="lbl">Region & currency</div>${regionSelect('!w-64')}</div>
        </div>
        <div class="card p-6">
          <h3 class="font-display font-bold mb-4">Activity</h3>
          ${[['heart','Wishlist',LS.get('wishlist',[]).length],['shopping-cart','Cart items',LS.get('cart',[]).reduce((a,c)=>a+c.qty,0)],['store','Seller status',s?(s.status==='approved'?'Live':s.status==='pending'?'Pending':'Removed'):'—']].map(x=>`
          <div class="flex items-center justify-between py-2.5 border-b border-[#E7F1FF] last:border-0">
            <span class="flex items-center gap-2.5 text-xs font-bold text-[#5a6a9c]"><i data-lucide="${x[0]}" style="width:15px;height:15px;color:#334EAC"></i> ${x[1]}</span>
            <span class="font-display font-extrabold text-sm capitalize">${x[2]}</span>
          </div>`).join('')}
        </div>
      </div>` : `

      ${s ? `
      <div class="card p-8 max-w-xl reveal">
        <div class="flex items-center gap-3 mb-5">
          <span class="w-12 h-12 rounded-2xl ${s.status==='approved'?'bg-[#E6F7EC]':'bg-[#FFF7E0]'} flex items-center justify-center"><i data-lucide="${s.status==='approved'?'badge-check':'hourglass'}" style="width:22px;height:22px;color:${s.status==='approved'?'#1F9D55':'#B7791F'}"></i></span>
          <div><h3 class="font-display font-bold text-lg">${esc(s.businessName)}</h3><div class="text-xs font-bold text-[#708BD1]">Seller ID: ${s.id}</div></div>
        </div>
        <div class="badge ${s.status==='approved'?'!bg-[#E6F7EC] !text-[#1F9D55]':s.status==='pending'?'!bg-[#FFF7E0] !text-[#B7791F]':'!bg-[#FEF3F2] !text-[#B42318]'} mb-4">${s.status==='approved'?'Approved — your shop is live':s.status==='pending'?'Pending Approval':'Removed'}</div>
        <p class="text-sm text-[#5a6a9c] mb-6">${s.status==='pending'?'The primary administrator is reviewing your application. You can already prepare your catalog in the dashboard.':'Manage your catalog, stock and listings from your dashboard.'}</p>
        <a href="#/seller" class="btn btn-primary">Open Seller Dashboard <i data-lucide="arrow-right" style="width:15px;height:15px"></i></a>
      </div>` : `
      <div class="card p-8 max-w-xl reveal">
        <div class="flex items-center gap-3 mb-1"><span class="w-11 h-11 rounded-xl bg-[#334EAC] flex items-center justify-center"><i data-lucide="store" style="width:20px;height:20px;color:#fff"></i></span><h3 class="font-display font-bold text-xl">Apply to sell on Anilyfe</h3></div>
        <p class="text-xs text-[#708BD1] font-semibold mb-6">Your request goes to <b>Pending Approval</b> until the primary administrator reviews it.</p>
        <form id="sellerAppForm" class="space-y-4">
          <div><label class="lbl">Business name</label><input class="inp" name="business" required placeholder="e.g. Chibi Corner"/></div>
          <div><label class="lbl">What you sell</label><input class="inp" name="sells" required placeholder="Figures, hoodies, manga…"/></div>
          <div><label class="lbl">Starting price (${region().symbol.trim()})</label><input class="inp" type="number" name="price" required min="1" placeholder="e.g. 2000"/></div>
          <button class="btn btn-primary w-full !py-3">Submit for Approval <i data-lucide="send" style="width:15px;height:15px"></i></button>
        </form>
      </div>`}`}
    </main>
  </div>`;
}

/* =========================================================
   VIEW — SELLER DASHBOARD
   ========================================================= */
function viewSellerStore(id){
  const sellers = LS.get('sellers',[]);
  const s = sellers.find(x=>x.id===id) || sellers[0];
  if(!s) return `<div class="min-h-screen bg-[#F6FCFF] flex items-center justify-center"><div class="card p-8 text-sm text-[#708BD1]">Seller not found.</div></div>`;
  const products = LS.get('products',[]).filter(p=>p.sellerId===s.id);
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <div class="flex items-center gap-2">
        <a href="#/marketplace" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Marketplace</a>
        <a href="#/profile" class="btn btn-primary !py-2 !px-3 text-xs">My profile</a>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <div class="relative rounded-3xl overflow-hidden reveal border border-[#D0E3FF] bg-gradient-to-r from-[#081F5C] to-[#334EAC]">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_35%)]"></div>
        <div class="relative p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-white">
          <div class="flex items-center gap-4">
            <span class="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-display font-extrabold text-2xl">${esc(s.businessName[0])}</span>
            <div>
              <div class="flex items-center gap-2"><h1 class="font-display font-extrabold text-2xl md:text-3xl">${esc(s.businessName)}</h1>${s.status==='approved'?`<span class="badge !bg-[#E6F7EC] !text-[#1F9D55]">Verified</span>`:''}</div>
              <div class="text-sm text-[#D3E0FF] mt-1">${esc(s.sells || 'Anime marketplace seller')}</div>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 text-xs font-bold">
            <span class="badge !bg-white/10 !text-white">⭐ ${s.rating || 4.8} rating</span>
            <span class="badge !bg-white/10 !text-white">📦 ${s.sales || 0} sales</span>
            <span class="badge !bg-white/10 !text-white">${s.status==='approved'?'Live':'Pending'}</span>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-4 gap-4 mt-8 reveal">
        ${[['Sales', `${s.sales || 0}`],['Rating', `${s.rating || 4.8}`],['Products', `${products.length}`],['Status', `${s.status || 'approved'}`]].map(([label, value])=>`
          <div class="card p-4 text-center">
            <div class="text-[10px] font-bold tracking-[.2em] text-[#708BD1]">${label}</div>
            <div class="font-display font-extrabold text-2xl mt-2">${value}</div>
          </div>
        `).join('')}
      </div>
      <div class="mt-10 reveal">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-display font-bold text-xl">Products</h2>
          <span class="text-xs font-bold text-[#708BD1]">${products.length} listings</span>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          ${products.length ? products.map(p=>productCard(p)).join('') : '<div class="card p-8 text-sm text-[#708BD1] col-span-full">This seller has not added products yet.</div>'}
        </div>
      </div>
    </main>
  </div>`;
}

function viewSeller(){
  const u = currentUser();
  if(!u){ location.hash='#/auth'; return ''; }
  const s = sellerOf(u.id);
  if(!s){ profTab='seller'; location.hash='#/profile'; return ''; }
  const mine = LS.get('products',[]).filter(p=>p.sellerId===s.id);
  const stockVal = mine.reduce((a,p)=>a+p.price*p.stock,0);
  const statusBadge = s.status==='approved' ? '<span class="badge !bg-[#E6F7EC] !text-[#1F9D55]"><i data-lucide="badge-check" style="width:11px;height:11px"></i> Approved</span>'
    : s.status==='pending' ? '<span class="badge !bg-[#FFF7E0] !text-[#B7791F]"><i data-lucide="hourglass" style="width:11px;height:11px"></i> Pending Approval</span>'
    : '<span class="badge !bg-[#FEF3F2] !text-[#B42318]">Removed</span>';

  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    ${marketTopBar(u)}
    <main class="max-w-6xl mx-auto px-4 py-10">
      ${s.status==='pending'?`<div class="rounded-2xl border border-[#F2DFA8] bg-[#FFFBEA] p-4 mb-6 flex items-start gap-3 reveal">
        <i data-lucide="info" style="width:18px;height:18px;color:#B7791F" class="mt-.5 shrink-0"></i>
        <p class="text-xs font-semibold text-[#8a6410] leading-relaxed">Your seller identity is <b>Pending Approval</b>. You can build your catalog now — products go live on the marketplace the moment the administrator approves you.</p>
      </div>`:''}

      <div class="flex flex-wrap items-center justify-between gap-4 mb-8 reveal">
        <div class="flex items-center gap-4">
          <span class="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] text-white flex items-center justify-center font-display font-extrabold text-2xl shadow-lg">${esc(s.businessName[0])}</span>
          <div>
            <h1 class="font-display font-extrabold text-2xl">${esc(s.businessName)}</h1>
            <div class="flex items-center gap-2 mt-1.5 flex-wrap">
              <button class="badge !bg-[#E7F1FF] !text-[#334EAC] hover:!bg-[#D0E3FF] transition" data-action="copy" data-text="${s.id}" title="Copy seller ID"><i data-lucide="fingerprint" style="width:11px;height:11px"></i> ${s.id} <i data-lucide="copy" style="width:10px;height:10px"></i></button>
              ${statusBadge}
            </div>
          </div>
        </div>
        <a href="#/marketplace" class="btn btn-ghost !text-xs"><i data-lucide="store" style="width:14px;height:14px"></i> View Marketplace</a>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        ${[['package','Products',mine.length],['boxes','Units in stock',mine.reduce((a,p)=>a+p.stock,0)],['banknote','Catalog value',fmt(stockVal)],['star','Seller rating',s.rating||'New']].map((x,i)=>`
        <div class="card stat-card p-5 reveal" style="transition-delay:${i*60}ms">
          <div class="w-9 h-9 rounded-xl bg-[#E7F1FF] flex items-center justify-center mb-3"><i data-lucide="${x[0]}" style="width:16px;height:16px;color:#334EAC"></i></div>
          <div class="font-display font-extrabold text-xl truncate">${x[2]}</div>
          <div class="text-[10px] font-bold uppercase tracking-widest text-[#708BD1] mt-1">${x[1]}</div>
        </div>`).join('')}
      </div>

      <div class="grid lg:grid-cols-[340px_1fr] gap-6 items-start">
        <div class="card p-6 reveal lg:sticky lg:top-24">
          <h3 class="font-display font-bold mb-1">Add a product</h3>
          <p class="text-xs text-[#708BD1] font-semibold mb-5">Listed under “${esc(s.businessName)}”.</p>
          <form id="productForm" class="space-y-4">
            <div><label class="lbl">Product name</label><input class="inp" name="name" required placeholder="e.g. Kakashi Figure"/></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="lbl">Price (${region().symbol.trim()})</label><input class="inp" type="number" name="price" required min="1" placeholder="0"/></div>
              <div><label class="lbl">Stock</label><input class="inp" type="number" name="stock" required min="1" placeholder="0"/></div>
            </div>
            <div><label class="lbl">Category</label><select class="inp" name="category">${Object.keys(CATS).map(c=>`<option>${c}</option>`).join('')}</select></div>
            <button class="btn btn-primary w-full !py-3"><i data-lucide="plus" style="width:15px;height:15px"></i> Add Product</button>
          </form>
        </div>

        <div class="reveal">
          <h3 class="font-display font-bold mb-4">Your catalog <span class="text-xs font-bold text-[#708BD1]">(${mine.length})</span></h3>
          ${mine.length? `<div class="grid sm:grid-cols-2 gap-4">${mine.map(p=>`
            <div class="card !rounded-2xl p-3 flex gap-3 prod-card">
              <div class="prod-media !w-24 !shrink-0" style="aspect-ratio:1">
                <div class="ph-icon"><i data-lucide="${CATS[catKey(p.category)].icon}" style="width:26px;height:26px"></i></div>
                ${p.img?`<img src="${p.img}" onerror="this.remove()" alt=""/>`:''}
              </div>
              <div class="flex-1 min-w-0 flex flex-col">
                <div class="text-[13px] font-extrabold truncate">${esc(p.name)}</div>
                <div class="text-[10px] font-bold text-[#708BD1]">${CATS[catKey(p.category)].short}</div>
                <div class="font-display font-extrabold text-sm mt-1">${fmt(p.price)}</div>
                <div class="text-[10px] font-bold ${p.stock<=5?'text-[#B7791F]':'text-[#1F9D55]'}">${p.stock} in stock</div>
                <div class="mt-auto pt-2 flex items-center justify-between">
                  <span class="badge ${s.status==='approved'?'!bg-[#E6F7EC] !text-[#1F9D55]':'!bg-[#FFF7E0] !text-[#B7791F]'} !text-[9px]">${s.status==='approved'?'Live':'Hidden until approved'}</span>
                  <button class="btn btn-danger !py-1 !px-2.5 !text-[10px]" data-action="del-product" data-id="${p.id}"><i data-lucide="trash-2" style="width:12px;height:12px"></i> Delete</button>
                </div>
              </div>
            </div>`).join('')}</div>` :
          `<div class="card p-10 text-center">
            <div class="w-14 h-14 mx-auto rounded-2xl bg-[#E7F1FF] flex items-center justify-center mb-3"><i data-lucide="package-plus" style="width:24px;height:24px;color:#708BD1"></i></div>
            <div class="font-display font-bold">No products yet</div>
            <p class="text-xs text-[#708BD1] mt-1">Add your first listing with the form.</p>
          </div>`}
        </div>
      </div>
    </main>
  </div>`;
}

/* Fired on submit of #sellerAppForm (the "become a seller" application). */
function sellerApply(formEl){
  const f = new FormData(formEl), u = currentUser();
  const sellers = LS.get('sellers', []);
  sellers.push({
    id: uid('SLR'), userId: u.id,
    businessName: (f.get('business')||'').trim(),
    sells: (f.get('sells')||'').trim(),
    startingPrice: Number(f.get('price'))||0,
    status: 'pending', rating: 0, sales: 0, createdAt: Date.now()
  });
  LS.set('sellers', sellers);
  toast('Application submitted — status: Pending Approval.', 'hourglass');
  profTab = 'profile';
  route();
}
