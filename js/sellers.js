/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Seller dashboard view + buyer profile (profile.html) since the
   'become a seller' application and profile tabs live together in the prototype. */

let profTab = 'profile';
let sellerTab = 'dashboard';

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
async function viewSellerStore(idOrSlug){
  let s = null;
  let products = [];
  const slugParam = (idOrSlug || 'abyss-atelier').toLowerCase();

  // Try storeService first
  if (window.storeService) {
    try {
      const sf = await window.storeService.getStorefront();
      if (!idOrSlug || slugParam === 'abyss-atelier' || slugParam === 'slr-001' || slugParam === sf.profile.slug) {
        s = sf.profile;
        products = sf.products;
      }
    } catch (err) {
      console.warn('Storefront service fetch error:', err);
    }
  }

  // Fallback to localStorage sellers
  if (!s) {
    const sellers = LS.get('sellers', []);
    s = sellers.find(x => (x.slug && x.slug.toLowerCase() === slugParam) || (x.id && x.id.toLowerCase() === slugParam));
    if (!s) s = sellers[0];
    if (s) {
      const allP = LS.get('products', []);
      products = allP.filter(p => p.sellerId === s.id);
    }
  }

  if (!s) {
    return `
      <div class="min-h-screen bg-[#F6FCFF] flex items-center justify-center p-6 text-center">
        <div class="card p-10 max-w-md">
          <div class="w-16 h-16 rounded-2xl bg-[#E7F1FF] flex items-center justify-center mx-auto mb-4">
            <i data-lucide="store" style="width:28px;height:28px;color:#334EAC"></i>
          </div>
          <h2 class="font-display font-bold text-xl text-[#0F172A]">Storefront Not Found</h2>
          <p class="text-xs text-slate-500 mt-2">The requested seller store could not be located or may be inactive.</p>
          <a href="#/marketplace" class="btn btn-primary mt-5">Return to Marketplace</a>
        </div>
      </div>
    `;
  }

  const isFounding = s.foundingSeller || s.foundingSellerNumber || s.foundingSellerActive || s.id === 'SLR-001';
  const bannerUrl = s.banner || 'https://images.pexels.com/photos/34634037/pexels-photo-34634037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800';
  const logoUrl = s.logo || 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300';
  const cart = LS.get('cart', []);
  const wish = LS.get('wishlist', []);
  const isTemporarilyClosed = s.storeStatus === 'Temporarily Closed';

  return `
  <div class="min-h-screen bg-[#F6FCFF] text-[#0F172A] pb-20">
    <!-- Marketplace Top Bar -->
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D0E3FF]">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          ${LOGO('text-2xl')}
          <span class="hidden md:inline-block text-xs font-extrabold uppercase tracking-widest text-[#334EAC] bg-[#EEF3FF] px-2.5 py-1 rounded-full">
            Official Merchant Storefront
          </span>
        </div>
        <div class="flex items-center gap-2">
          <a href="#/marketplace" class="btn btn-ghost text-xs">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i>
            <span>Marketplace</span>
          </a>
          <button class="icon-btn" data-action="toggle-cart" aria-label="Cart">
            <i data-lucide="shopping-cart" style="width:18px;height:18px"></i>
            ${cart.length ? `<span class="count-badge">${cart.reduce((a,c)=>a+c.qty,0)}</span>` : ''}
          </button>
          <a href="#/seller/dashboard" class="btn btn-primary !py-2 !px-3 text-xs font-bold hidden sm:inline-flex">
            <i data-lucide="layout-dashboard" style="width:13px;height:13px"></i>
            <span>Seller Center</span>
          </a>
        </div>
      </div>
    </header>

    <main class="max-w-[1400px] mx-auto px-4 sm:px-6 pt-6">
      ${isTemporarilyClosed ? `
        <div class="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-3 text-xs">
          <i data-lucide="clock" style="width:18px;height:18px;color:#B45309"></i>
          <div>
            <strong>Merchant Temporarily Away:</strong>
            <span> ${esc(s.storeName || s.businessName)} is currently updating inventory. Product catalog is visible for browsing.</span>
          </div>
        </div>
      ` : ''}

      <!-- Cyberpunk Anime Store Hero Banner -->
      <div class="relative rounded-3xl overflow-hidden border border-[#D0E3FF] shadow-lg bg-[#081F5C]">
        <!-- Banner Image with Gradient Overlay -->
        <div class="h-48 sm:h-64 md:h-72 w-full relative overflow-hidden">
          <img src="${bannerUrl}" alt="${esc(s.storeName || s.businessName)}" class="w-full h-full object-cover opacity-80 filter contrast-110" onerror="this.remove()" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#081F5C] via-[#081F5C]/40 to-transparent"></div>
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(51,78,172,0.35),transparent_70%)]"></div>
        </div>

        <!-- Store Meta Floating Card -->
        <div class="relative px-6 sm:px-8 pb-8 pt-0 -mt-16 sm:-mt-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-white">
          <div class="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white bg-slate-900 shadow-xl shrink-0">
              <img src="${logoUrl}" alt="${esc(s.storeName || s.businessName)}" class="w-full h-full object-cover" onerror="this.src='https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg'" />
            </div>

            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h1 class="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">${esc(s.storeName || s.businessName)}</h1>
                ${isFounding ? `
                  <span class="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-md">
                    <i data-lucide="award" style="width:13px;height:13px"></i>
                    <span>Founding Seller #001</span>
                  </span>
                ` : ''}
                <span class="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/90 text-white">
                  <i data-lucide="badge-check" style="width:13px;height:13px"></i>
                  <span>Verified Merchant</span>
                </span>
                <span class="inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full ${isTemporarilyClosed ? 'bg-amber-500/80' : 'bg-blue-500/80'} text-white">
                  ${s.storeStatus || 'Live'}
                </span>
              </div>

              <p class="text-xs sm:text-sm text-blue-100/90 mt-2 max-w-2xl leading-relaxed">
                ${esc(s.description || 'Premium anime figures, apparel, collectibles, and boutique essentials curated for anime fans and collectors across Nigeria and West Africa.')}
              </p>

              <div class="flex flex-wrap items-center gap-3 mt-3 text-xs text-blue-200">
                <span class="flex items-center gap-1"><i data-lucide="map-pin" style="width:13px;height:13px"></i> ${esc(s.city || 'Lekki Phase 1')}, ${esc(s.state || 'Lagos')}, Nigeria 🇳🇬</span>
                <span>·</span>
                <span class="flex items-center gap-1"><i data-lucide="calendar" style="width:13px;height:13px"></i> Merchant since June 2026</span>
                <span>·</span>
                <span class="flex items-center gap-1 text-amber-300 font-bold"><i data-lucide="star" style="width:13px;height:13px;fill:#FCD34D;color:#FCD34D"></i> ${s.rating || 4.9} (${s.reviewCount || 142} reviews)</span>
              </div>
            </div>
          </div>

          <!-- Merchant Actions (Strictly marketplace: NO follow buttons!) -->
          <div class="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <button class="btn btn-outline !bg-white/10 !text-white !border-white/25 hover:!bg-white/20 !py-2.5 !px-4 text-xs font-bold flex-1 sm:flex-initial" data-action="copy-store-url" data-slug="${s.slug || 'abyss-atelier'}">
              <i data-lucide="share-2" style="width:14px;height:14px"></i>
              <span>Share Store</span>
            </button>
            <button class="btn btn-primary !bg-[#334EAC] hover:!bg-[#283e8c] !text-white !py-2.5 !px-4 text-xs font-bold flex-1 sm:flex-initial" data-action="contact-store-modal">
              <i data-lucide="message-square" style="width:14px;height:14px"></i>
              <span>Contact Store</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Business Highlights Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6 reveal">
        <div class="card p-4 text-center">
          <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">Fulfilled Orders</div>
          <div class="font-display font-extrabold text-2xl text-[#081F5C] mt-1">${s.sales || 142}+</div>
          <div class="text-[10px] text-emerald-600 font-bold mt-0.5">100% On-time delivery</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">Customer Rating</div>
          <div class="font-display font-extrabold text-2xl text-[#081F5C] mt-1 flex items-center justify-center gap-1">
            <span>${s.rating || 4.9}</span>
            <i data-lucide="star" style="width:18px;height:18px;color:#E9B949;fill:#E9B949"></i>
          </div>
          <div class="text-[10px] text-slate-500 font-bold mt-0.5">from 142 verified buyers</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">Dispatch Speed</div>
          <div class="font-display font-extrabold text-2xl text-[#081F5C] mt-1">1-2 Days</div>
          <div class="text-[10px] text-slate-500 font-bold mt-0.5">Lagos Hub Dispatch</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-[10px] uppercase font-bold tracking-wider text-slate-400">In-State Delivery</div>
          <div class="font-display font-extrabold text-2xl text-emerald-600 mt-1">FREE</div>
          <div class="text-[10px] text-slate-500 font-bold mt-0.5">All Lagos orders</div>
        </div>
      </div>

      <!-- Store Policies & Authenticity Accordion -->
      <div class="card p-5 mt-6 bg-gradient-to-br from-white to-[#F8FAFC] border border-[#D0E3FF]">
        <div class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Merchant Delivery & Store Policies</div>
        <div class="grid sm:grid-cols-3 gap-4 text-xs">
          <div class="p-3.5 rounded-2xl bg-[#EEF3FF]/70 border border-[#D0E3FF]">
            <div class="flex items-center gap-2 font-bold text-[#081F5C]">
              <i data-lucide="truck" style="width:15px;height:15px;color:#334EAC"></i>
              <span>Shipping Policy</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
              <strong>Free Lagos Delivery:</strong> In-state orders ship free. Nationwide shipping to Abuja, PH, and all 36 states flat ₦4,500 via tracked logistics.
            </p>
          </div>
          <div class="p-3.5 rounded-2xl bg-[#EEF3FF]/70 border border-[#D0E3FF]">
            <div class="flex items-center gap-2 font-bold text-[#081F5C]">
              <i data-lucide="rotate-ccw" style="width:15px;height:15px;color:#334EAC"></i>
              <span>Return Policy</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
              ${esc(s.returnPolicy || '7-day return window for unopened and factory-sealed collectibles. Return shipping covered by seller if item arrived damaged.')}
            </p>
          </div>
          <div class="p-3.5 rounded-2xl bg-[#EEF3FF]/70 border border-[#D0E3FF]">
            <div class="flex items-center gap-2 font-bold text-[#081F5C]">
              <i data-lucide="shield-check" style="width:15px;height:15px;color:#334EAC"></i>
              <span>Authenticity Guarantee</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1.5 leading-relaxed">
              All items are direct Japanese distributor master grade. Protected by ANILyfe escrow settlement and buyer protection.
            </p>
          </div>
        </div>
      </div>

      <!-- Catalog / Products Section -->
      <div class="mt-10">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="font-display font-extrabold text-2xl text-[#081F5C]">Official Store Catalog</h2>
            <p class="text-xs text-slate-500 mt-0.5">Showing ${products.length} approved anime merchandise listings</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-400">Category:</span>
            <button class="px-3 py-1.5 rounded-xl bg-[#081F5C] text-white text-xs font-bold">All Items (${products.length})</button>
            <button class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Figures</button>
            <button class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50">Apparel</button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          ${products.length ? products.map(p => {
            const displayImg = (p.images && p.images[0]) || p.img || 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
            const priceVal = p.salePrice || p.price;
            return `
              <div class="prod-card card !rounded-3xl p-3.5 flex flex-col hover:shadow-lg transition group">
                <div class="prod-media relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E7F1FF]">
                  <img src="${displayImg}" alt="${esc(p.name)}" class="w-full h-full object-cover transition duration-300 group-hover:scale-105" onerror="this.remove()" />
                  <span class="absolute bottom-2.5 left-2.5 badge !bg-[#081F5C]/85 !text-white backdrop-blur text-[10px]">${esc(p.category || 'Figures')}</span>
                  ${(p.discount || p.off) ? `<span class="absolute top-2.5 left-2.5 badge !bg-[#E9B949] !text-[#081F5C] font-extrabold text-[10px]">-${p.discount || p.off}%</span>` : ''}
                  <button class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 shadow-xs flex items-center justify-center transition hover:scale-110 text-[#334EAC]" data-action="wish" data-id="${p.id}" aria-label="wishlist">
                    <i data-lucide="heart" style="width:14px;height:14px"></i>
                  </button>
                </div>

                <div class="pt-3 flex-1 flex flex-col">
                  <div class="text-xs font-bold text-[#334EAC]">${esc(p.brand || 'Abyss Masterpiece')}</div>
                  <h3 class="text-sm font-extrabold text-[#081F5C] leading-snug line-clamp-2 min-h-[2.5em] mt-0.5">${esc(p.name)}</h3>

                  <div class="mt-auto pt-3 flex items-end justify-between border-t border-slate-100">
                    <div>
                      <div class="font-display font-extrabold text-base text-[#081F5C]">${fmt(priceVal)}</div>
                      <div class="flex items-center gap-1 text-[10px] text-slate-500 font-bold">
                        <i data-lucide="star" style="width:11px;height:11px;color:#E9B949;fill:#E9B949"></i>
                        <span>${p.rating || 4.9} (${p.reviews || p.reviewsCount || 24})</span>
                      </div>
                    </div>

                    <div class="flex items-center gap-1.5">
                      <a href="#/product/${p.slug || p.id}" class="btn btn-outline !py-1.5 !px-2.5 !text-[11px] font-bold">View</a>
                      <button class="btn btn-primary !py-1.5 !px-2.5 !text-[11px] font-bold" data-action="add-cart" data-id="${p.id}">
                        <i data-lucide="plus" style="width:13px;height:13px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('') : `
            <div class="card p-12 text-center col-span-full">
              <i data-lucide="package" style="width:32px;height:32px;color:#708BD1" class="mx-auto mb-3"></i>
              <h3 class="font-display font-bold text-base">No active listings</h3>
              <p class="text-xs text-slate-500 mt-1">This seller has no published products at the moment.</p>
            </div>
          `}
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
  const statusBadge = s.status==='approved' ? '<span class="inline-flex items-center gap-1 rounded-full bg-[#E6F7EC] px-2.5 py-1 text-[10px] font-bold text-[#1F9D55]"><i data-lucide="badge-check" style="width:11px;height:11px"></i> Approved</span>'
    : s.status==='pending' ? '<span class="inline-flex items-center gap-1 rounded-full bg-[#FFF7E0] px-2.5 py-1 text-[10px] font-bold text-[#B7791F]"><i data-lucide="hourglass" style="width:11px;height:11px"></i> Pending Approval</span>'
    : '<span class="inline-flex items-center rounded-full bg-[#FEF3F2] px-2.5 py-1 text-[10px] font-bold text-[#B42318]">Removed</span>';

  const nav = [
    ['Dashboard','layout-dashboard', sellerTab === 'dashboard'],
    ['Orders','shopping-bag', sellerTab === 'orders'],
    ['Products','package', sellerTab === 'products'],
    ['Inventory','boxes', sellerTab === 'inventory'],
    ['Reviews','star', sellerTab === 'reviews'],
    ['Earnings','banknote', sellerTab === 'earnings'],
    ['Analytics','bar-chart-3', sellerTab === 'analytics'],
    ['Delivery','truck', sellerTab === 'delivery'],
    ['Store','store', sellerTab === 'store'],
    ['Verification','badge-check', sellerTab === 'verification'],
    ['Settings','settings', sellerTab === 'settings']
  ];

  const recentOrders = [];
  const lowStock = mine.filter(p => p.stock <= 5).slice(0,3);

  const dashboardContent = `
    <section class="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      ${[['Active listings', mine.length, 'up', '0%'], ['Orders', 0, 'up', '0%'], ['Revenue', fmt(stockVal), 'up', '0%'], ['Conversion', '0%', 'down', '0%']].map(([label, value, trend, meta], idx) => `
        <div class="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm reveal" style="transition-delay:${idx * 50}ms">
          <div class="flex items-center justify-between">
            <div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">${label}</div>
            <span class="rounded-full px-2 py-1 text-[10px] font-bold ${trend === 'up' ? 'bg-[#E6F7EC] text-[#1F9D55]' : 'bg-[#FEF3F2] text-[#B42318]'}">${meta}</span>
          </div>
          <div class="mt-4 font-display font-extrabold text-3xl text-[#111827]">${value}</div>
        </div>
      `).join('')}
    </section>

    <section class="grid xl:grid-cols-[1.4fr_0.9fr] gap-5">
      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Performance</div>
            <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Your shop at a glance</h2>
          </div>
          <button class="btn btn-ghost !px-3 !py-2 !text-[11px]">Last 30 days</button>
        </div>

        <div class="grid sm:grid-cols-3 gap-3">
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Visits</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">0</div></div>
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Favorites</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">0</div></div>
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Repeat buyers</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">0%</div></div>
        </div>

        <div class="mt-5 rounded-2xl bg-gradient-to-r from-[#EEF3FF] to-[#F8FAFC] border border-[#DDEBFF] p-4">
          <div class="text-[10px] uppercase tracking-[.2em] text-[#4F46E5] font-bold">Suggested next step</div>
          <div class="mt-2 font-display font-extrabold text-2xl text-[#111827]">Add your first product listing</div>
          <p class="mt-2 text-sm text-[#475569]">Start with a handful of anime essentials, figures, or apparel and your store will be ready for sales.</p>
        </div>
      </div>

      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Quick actions</div>
        <div class="mt-4 space-y-3">
          <button class="w-full rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-left flex items-center justify-between text-sm font-semibold text-[#111827] hover:bg-[#EEF3FF] transition" data-action="seller-tab" data-tab="listings"><span>Add product</span><i data-lucide="plus" style="width:15px;height:15px;color:#334EAC"></i></button>
          <button class="w-full rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-left flex items-center justify-between text-sm font-semibold text-[#111827] hover:bg-[#EEF3FF] transition" data-action="seller-tab" data-tab="listings"><span>Manage inventory</span><i data-lucide="boxes" style="width:15px;height:15px;color:#334EAC"></i></button>
          <button class="w-full rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-left flex items-center justify-between text-sm font-semibold text-[#111827] hover:bg-[#EEF3FF] transition" data-action="seller-tab" data-tab="orders"><span>Check orders</span><i data-lucide="shopping-bag" style="width:15px;height:15px;color:#334EAC"></i></button>
          <button class="w-full rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-left flex items-center justify-between text-sm font-semibold text-[#111827] hover:bg-[#EEF3FF] transition" data-action="seller-tab" data-tab="marketing"><span>Promotion tools</span><i data-lucide="megaphone" style="width:15px;height:15px;color:#334EAC"></i></button>
        </div>
      </div>
    </section>

    <section class="grid xl:grid-cols-[1.25fr_0.75fr] gap-5">
      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Recent orders</div>
            <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Latest activity</h2>
          </div>
          <button class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-action="seller-tab" data-tab="orders">View all</button>
        </div>
        <div class="rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-5 text-center text-sm text-[#64748B]">No recent orders yet.</div>
      </div>

      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Low stock</div>
        <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Restock soon</h2>
        <div class="mt-4 space-y-3">
          ${lowStock.length ? lowStock.map(p => `
            <div class="rounded-2xl border border-[#EFEFEF] bg-[#F8FAFC] p-3">
              <div class="font-bold text-sm text-[#111827]">${esc(p.name)}</div>
              <div class="mt-1 flex items-center justify-between text-xs text-[#64748B]"><span>${p.stock} left</span><span class="font-bold text-[#B7791F]">Low stock</span></div>
            </div>
          `).join('') : `<div class="rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-4 text-sm text-[#64748B] text-center">No low-stock items right now.</div>`}
        </div>
      </div>
    </section>

    <section class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Inventory</div>
          <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Your listings</h2>
        </div>
        <button class="btn btn-primary !px-3 !py-2 !text-[11px]" data-action="seller-tab" data-tab="listings">Manage listings</button>
      </div>

      <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        ${mine.length ? mine.slice(0,6).map(p => `
          <div class="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
            <div class="rounded-2xl overflow-hidden bg-[#EEF3FF] aspect-[4/3] mb-3">${p.img ? `<img src="${p.img}" alt="${esc(p.name)}" class="w-full h-full object-cover" onerror="this.remove()" />` : `<div class="w-full h-full flex items-center justify-center text-[#334EAC]"><i data-lucide="${CATS[catKey(p.category)].icon}" style="width:28px;height:28px"></i></div>`}</div>
            <div class="font-bold text-sm text-[#111827] truncate">${esc(p.name)}</div>
            <div class="mt-1 text-xs text-[#64748B]">${CATS[catKey(p.category)].short}</div>
            <div class="mt-3 flex items-center justify-between"><div class="font-display font-extrabold text-xl text-[#111827]">${fmt(p.price)}</div><div class="text-xs font-bold ${p.stock > 0 ? 'text-[#1F9D55]' : 'text-[#B42318]'}">${p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}</div></div>
          </div>
        `).join('') : `<div class="col-span-full rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Your inventory is empty. Add your first product to start selling.</div>`}
      </div>
    </section>
  `;

  const listingsContent = `
    <section class="grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <div>
            <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Listings</div>
            <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Add new product</h2>
          </div>
          <button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-action="seller-tab" data-tab="dashboard">Back</button>
        </div>

        <form id="productForm" class="space-y-5">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="md:col-span-2"><label class="lbl">Product name</label><input class="inp" name="name" placeholder="Example: Jujutsu Kaisen hoodie" value="" /></div>
            <div><label class="lbl">Category</label><select class="inp" name="category">${Object.keys(CATS).map(k => `<option value="${k}">${k}</option>`).join('')}</select></div>
            <div><label class="lbl">Price (₦)</label><input class="inp" name="price" type="number" min="0" placeholder="0" value="" /></div>
            <div><label class="lbl">Available stock</label><input class="inp" name="stock" type="number" min="0" placeholder="0" value="" /></div>
            <div>
              <label class="lbl">Colors</label>
              <select class="inp" name="colors">
                <option value="">Select a color</option>
                ${PRODUCT_COLOR_OPTIONS.map(color => `<option value="${color}">${color}</option>`).join('')}
              </select>
            </div>
            <div>
              <label class="lbl">Sizes</label>
              <select class="inp" name="sizes">
                <option value="">Select a size</option>
                ${PRODUCT_SIZE_OPTIONS.map(size => `<option value="${size}">${size}</option>`).join('')}
              </select>
            </div>
            <div class="md:col-span-2"><label class="lbl">Description</label><textarea class="inp min-h-[110px]" name="description" placeholder="Describe the product, quality, material, and fit." value="" required maxlength="500"></textarea><div class="mt-1 text-[10px] font-bold text-[#708BD1]">Required • max 500 characters</div></div>
            <div class="md:col-span-2"><label class="lbl">Product photos</label><input class="inp !p-2" type="file" accept="image/*" name="images" multiple /><div id="productImagePreview" class="mt-3 grid grid-cols-4 gap-2"></div></div>
          </div>
          <div class="flex flex-wrap gap-3"><button type="submit" class="btn btn-primary">Publish listing</button><button type="button" class="btn btn-ghost">Save draft</button></div>
        </form>
      </div>

      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Draft</div>
        <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Ready for upload</h2>
        <div class="mt-5 space-y-3 text-sm text-[#475569]">
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3"><div class="font-bold text-[#111827]">Photos</div><div class="mt-1">Upload clear images showing product details, color, and sizing.</div></div>
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3"><div class="font-bold text-[#111827]">Colors</div><div class="mt-1">Add options like Black, White, Blue, Purple and any custom shades.</div></div>
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3"><div class="font-bold text-[#111827]">Sizes</div><div class="mt-1">Include S, M, L, XL or custom measurements for product fit.</div></div>
          <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3"><div class="font-bold text-[#111827]">Stock</div><div class="mt-1">Keep per-variant stock updated to avoid overselling.</div></div>
        </div>
      </div>
    </section>
  `;

  const inventoryContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Inventory</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Manage stock</h2><div class="mt-4 grid md:grid-cols-3 gap-4">${[['In stock', mine.filter(p => p.stock > 5).length], ['Low stock', mine.filter(p => p.stock > 0 && p.stock <= 5).length], ['Out of stock', mine.filter(p => p.stock === 0).length]].map(([label, value]) => `<div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">${label}</div><div class="font-display font-extrabold text-3xl mt-2 text-[#111827]">${value}</div></div>`).join('')}</div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Inventory updates and per-variant stock controls will appear here as your catalog grows.</div></div>`;

  const paymentsContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Earnings</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Financial overview</h2><div class="mt-4 grid md:grid-cols-2 xl:grid-cols-4 gap-4">${[['Available balance', fmt(320000)], ['Pending balance', fmt(85000)], ['Total sales', fmt(650000)], ['Marketplace fees', fmt(97500)]].map(([label, value]) => `<div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">${label}</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">${value}</div></div>`).join('')}</div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Transactions, payout requests, refund adjustments and seller settlement history will be added here.</div></div>`;

  const reviewsContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Reviews</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Seller rating</h2><div class="mt-4 flex items-center gap-4"><div class="font-display font-extrabold text-4xl text-[#111827]">4.8</div><div class="text-[#E9B949] flex"><i data-lucide="star" style="width:16px;height:16px;fill:#E9B949;stroke:#E9B949"></i><i data-lucide="star" style="width:16px;height:16px;fill:#E9B949;stroke:#E9B949"></i><i data-lucide="star" style="width:16px;height:16px;fill:#E9B949;stroke:#E9B949"></i><i data-lucide="star" style="width:16px;height:16px;fill:#E9B949;stroke:#E9B949"></i><i data-lucide="star" style="width:16px;height:16px;fill:#E9B949;stroke:#E9B949"></i></div></div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Review summaries, customer feedback and seller replies will appear here.</div></div>`;

  const analyticsContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Analytics</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Store performance</h2><div class="mt-4 grid md:grid-cols-3 gap-4">${[['Revenue', fmt(185000)], ['Orders', '24'], ['Views', '2,431']].map(([label, value]) => `<div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">${label}</div><div class="font-display font-extrabold text-3xl mt-2 text-[#111827]">${value}</div></div>`).join('')}</div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Daily and monthly charts, conversion reporting and best sellers will be added here.</div></div>`;

  const deliveryContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Delivery</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Shipping settings</h2><div class="mt-4 grid md:grid-cols-2 gap-4">${[['Local delivery', 'Available'], ['Nationwide delivery', 'Available'], ['Pickup', 'Enabled'], ['Processing time', '2-4 days']].map(([label, value]) => `<div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">${label}</div><div class="font-bold text-[#111827] mt-2">${value}</div></div>`).join('')}</div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Courier integration, tracking links and delivery windows will be layered in later.</div></div>`;

  const storeContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Store</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Store profile</h2><div class="mt-5 rounded-2xl bg-gradient-to-r from-[#EEF3FF] to-[#F8FAFC] border border-[#D0E3FF] p-5"><div class="font-bold text-[#111827] text-lg">${esc(s.businessName)}</div><p class="mt-2 text-sm text-[#5a6a9c]">Anime-inspired merchandise and fan-favorite collectibles sold directly from this Anilyfe storefront.</p></div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Store logo, banner, description and location settings can be managed here.</div></div>`;

  const verificationContent = `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Verification</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Status: ${s.status === 'approved' ? 'Verified seller' : 'Pending review'}</h2><div class="mt-5 rounded-2xl border border-[#D0E3FF] bg-[#EEF3FF] p-5 text-sm text-[#334EAC] font-semibold">${s.status === 'approved' ? 'Your store has passed verification and displays the trusted seller badge in marketplace listings.' : 'Submit the required identity and business details to complete review.'}</div><div class="mt-5 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Private verification documents stay hidden from the public storefront.</div></div>`;

  const NIGERIAN_STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'];
  const NIGERIAN_CITIES = {
    'Abia':['Umuahia','Aba','Ohafia'], 'Adamawa':['Yola','Mubi','Numan'], 'Akwa Ibom':['Uyo','Eket','Ikot Ekpene'], 'Anambra':['Awka','Onitsha','Nnewi'], 'Bauchi':['Bauchi','Azare','Misau'], 'Bayelsa':['Yenagoa','Brass','Ogbia'], 'Benue':['Makurdi','Gboko','Otukpo'], 'Borno':['Maiduguri','Biu','Kano'], 'Cross River':['Calabar','Ikom','Ugep'], 'Delta':['Asaba','Warri','Ughelli'], 'Ebonyi':['Abakaliki','Afikpo','Onueke'], 'Edo':['Benin City','Auchi','Ekpoma'], 'Ekiti':['Ado-Ekiti','Ikere','Iyin'], 'Enugu':['Enugu','Nsukka','Agbani'], 'Gombe':['Gombe','Kumo','Dukku'], 'Imo':['Owerri','Orlu','Okigwe'], 'Jigawa':['Dutse','Hadejia','Kazaure'], 'Kaduna':['Kaduna','Zaria','Kafanchan'], 'Kano':['Kano','Kazaure','Rano'], 'Katsina':['Katsina','Daura','Funtua'], 'Kebbi':['Birnin Kebbi','Argungu','Yelwa'], 'Kogi':['Lokoja','Anyigba','Idah'], 'Kwara':['Ilorin','Offa','Jebba'], 'Lagos':['Lagos','Ikeja','Lekki','Surulere'], 'Nasarawa':['Lafia','Keffi','Akwanga'], 'Niger':['Minna','Suleja','Kontagora'], 'Ogun':['Abeokuta','Ijebu Ode','Sagamu'], 'Ondo':['Akure','Ondo','Okitipupa'], 'Osun':['Osogbo','Ilesa','Iwo'], 'Oyo':['Ibadan','Ogbomosho','Saki'], 'Plateau':['Jos','Barkin Ladi','Pankshin'], 'Rivers':['Port Harcourt','Obio/Akpor','Bonny'], 'Sokoto':['Sokoto','Tambuwal','Gwadabawa'], 'Taraba':['Jalingo','Wukari','Sardauna'], 'Yobe':['Damaturu','Potiskum','Gujba'], 'Zamfara':['Gusau','Talata Mafara','Kaura Namoda'], 'FCT':['Abuja','Gwagwalada','Kuje']
  };

  function getSellerSettings(){
    const defaults = {
      account: { firstName:'Seller', lastName:'Name', displayName:'Anilyfe Studio', email:'seller@example.com', phone:'080XXXXXXXX', password:'', profileImage:'' },
      store: { name:'Anilyfe Studio', description:'Anime merchandise and collectibles for fans, collectors and everyday anime lovers.', category:'Figures & Collectibles', contact:'hello@anilyfe.example', policies:'Orders are processed within 2–4 business days and shipped with tracking support when available.', logo:'', banner:'' },
      location: { country:'Nigeria', state:'Rivers', city:'Port Harcourt', dispatch:'Port Harcourt warehouse' },
      productDefaults: { category:'Manga & Books', currency:'NGN', processing:'2–3 business days' },
      inventory: { lowStock:5, notifyLow:true, notifyOut:true, hideOut:false },
      orders: { confirmation:'Auto-confirm after payment', processing:'2–3 business days', notifications:{newOrder:true,cancel:true,delivered:true}, cancellation:'Marketplace default' },
      shipping: { local:true, national:true, pickup:true, free:false, localFee:'2000', nationalFee:'5000', dispatch:'Port Harcourt warehouse', processing:'2–3 business days', options:[{id:'local', label:'Local Delivery', fee:'2000', enabled:true}, {id:'nationwide', label:'Nationwide Delivery', fee:'5000', enabled:true}] },
      returns: { window:'Marketplace default', conditions:{unused:true, packaging:true, purchase:true}, locked:true },
      payout: { method:'Bank transfer', schedule:'Weekly', bank:'Access Bank', accountNumber:'***********1234', verified:true },
      fees: { commission:15, transaction:'₦1,500', refund:'Policy-based' },
      notifications: { channels:{inApp:true,email:true,sms:false}, orders:{newOrder:true,cancel:true,delivered:true,returnRequest:true}, products:{approved:true,rejected:false,lowStock:true,outOfStock:true}, reviews:{newReview:true,question:true,response:true}, payments:{paymentConfirmation:true,payoutProcessed:true,payoutFailed:false}, security:{newLogin:true,passwordChanged:true,alert:true} },
      security: { twoStep:true, sessions:[{device:'Windows PC', status:'Current session', active:true},{device:'Android Phone', status:'Last active: recently', active:false}] },
      verification: { status:'Verified', step:5 },
      privacy: { public:{showStoreLocation:true,showStoreDescription:true,showSellerRating:true}, private:{personalEmail:true,payoutInfo:true,verificationInfo:true} },
      storeStatus: 'Open',
      payoutAccounts: [{bank:'Access Bank', name:'Seller Name', masked:'**** **** 4821', verified:true}],
      passwordMeta: { current:'' }
    };
    const stored = LS.get('anilyfeSellerSettings', null);
    const merged = JSON.parse(JSON.stringify(defaults));
    if(stored){ Object.keys(defaults).forEach(k => { if(stored[k]) merged[k] = {...defaults[k], ...stored[k]}; }); }
    if(merged.shipping){
      if(typeof merged.shipping.national === 'undefined' && typeof merged.shipping.nacional !== 'undefined'){ merged.shipping.national = merged.shipping.nacional; }
      if(typeof merged.shipping.nacional !== 'undefined'){ delete merged.shipping.nacional; }
    }
    return merged;
  }

  function saveSellerSettings(settings){ LS.set('anilyfeSellerSettings', settings); }

  function updateSellerProfileFromSettings(settings){
    const u = currentUser();
    if(!u) return;
    const sellers = LS.get('sellers', []);
    const seller = sellers.find(s => s.userId === u.id);
    if(!seller) return;
    seller.businessName = settings.store.name;
    seller.location = settings.location.state + ', ' + settings.location.city;
    seller.status = seller.status || 'approved';
    LS.set('sellers', sellers);
  }

  function renderSellerSettingsPage(){
    const user = currentUser();
    const seller = sellerOf(user ? user.id : null) || { businessName:'Anilyfe Studio', status:'approved' };
    const settings = getSellerSettings();
    const cityOptions = (NIGERIAN_CITIES[settings.location.state] || NIGERIAN_CITIES['Rivers']).map(c => `<option value="${esc(c)}" ${c===settings.location.city?'selected':''}>${esc(c)}</option>`).join('');
    const payoutMasked = settings.payoutAccounts && settings.payoutAccounts[0] ? settings.payoutAccounts[0].masked : '**** **** 4821';
    const statusBadge = seller.status === 'approved' ? '<span class="badge !bg-[#E6F7EC] !text-[#1F9D55]">Verified seller</span>' : '<span class="badge !bg-[#FFF7E0] !text-[#B7791F]">Pending review</span>';
    return `
      <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
        <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div>
            <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Settings</div>
            <h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Seller settings</h2>
          </div>
          <div class="w-full xl:max-w-md">
            <label class="relative block">
              <input id="settingsSearch" class="inp !pl-10 !py-2.5 !text-sm" type="text" placeholder="Search settings..." />
              <i data-lucide="search" style="width:14px;height:14px;color:#708BD1;position:absolute;left:12px;top:50%;transform:translateY(-50%)"></i>
            </label>
          </div>
        </div>

        <div class="mt-5 grid xl:grid-cols-[250px_minmax(0,1fr)] gap-5">
          <aside class="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-3">
            <div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold px-2 py-1">Sections</div>
            <nav class="mt-3 space-y-1">
              ${[['Account','user'],['Store','store'],['Location','map-pin'],['Products','package'],['Inventory','boxes'],['Orders','shopping-bag'],['Delivery & Shipping','truck'],['Returns & Refunds','refresh-cw'],['Payments & Payouts','wallet'],['Taxes & Fees','receipt'],['Notifications','bell'],['Security','shield-check'],['Verification','badge-check'],['Privacy','lock'],['Account Management','settings']].map(([label, icon]) => `<a href="#settings-${label.toLowerCase().replace(/[^a-z0-9]+/g,'-')}" class="block rounded-xl px-3 py-2 text-sm font-semibold text-[#374151] hover:bg-[#EEF3FF] hover:text-[#1D4ED8] flex items-center justify-between"><span class="flex items-center gap-2"><i data-lucide="${icon}" style="width:15px;height:15px"></i>${label}</span><i data-lucide="chevron-right" style="width:13px;height:13px"></i></a>`).join('')}
            </nav>
          </aside>

          <div class="space-y-5">
            <div id="settings-account" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Account">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Account</div>
                  <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Account information</h3>
                </div>
                <button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-settings-action="change-photo">Change photo</button>
              </div>
              <form data-settings-form="account">
                <div class="flex items-center gap-4 mb-5">
                  <div class="w-16 h-16 rounded-2xl overflow-hidden bg-[#EEF3FF] border border-[#D0E3FF] flex items-center justify-center text-[#334EAC] font-display text-xl font-bold">
                    ${settings.account.profileImage ? `<img src="${settings.account.profileImage}" class="w-full h-full object-cover" alt="Profile" />` : (settings.account.displayName || seller.businessName || 'S').slice(0,1).toUpperCase()}
                  </div>
                  <div class="text-sm text-[#475569]">Profile photo will appear in the seller dashboard and storefront.</div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div><label class="lbl">First name</label><input class="inp" name="firstName" value="${esc(settings.account.firstName)}" /></div>
                  <div><label class="lbl">Last name</label><input class="inp" name="lastName" value="${esc(settings.account.lastName)}" /></div>
                  <div><label class="lbl">Display name</label><input class="inp" name="displayName" value="${esc(settings.account.displayName)}" /></div>
                  <div><label class="lbl">Email</label><input class="inp" type="email" name="email" value="${esc(settings.account.email)}" /><div class="mt-1 text-[10px] font-bold text-[#1F9D55]">Verified</div></div>
                  <div><label class="lbl">Phone number</label><input class="inp" name="phone" value="${esc(settings.account.phone)}" /></div>
                  <div><label class="lbl">Password</label><input class="inp" type="password" name="password" value="${esc(settings.account.password || '')}" /></div>
                </div>
                <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="account">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="account">Save changes</button></div>
              </form>
            </div>

            <div id="settings-store" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Store">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Store</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Store settings</h3>
              <form data-settings-form="store" class="mt-5">
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="md:col-span-2"><label class="lbl">Store name</label><input class="inp" name="name" value="${esc(settings.store.name)}" /></div>
                  <div class="md:col-span-2"><label class="lbl">Store description</label><textarea class="inp min-h-[110px]" name="description" maxlength="500">${esc(settings.store.description)}</textarea><div class="mt-1 text-[10px] font-bold text-[#708BD1]">${settings.store.description.length}/500 characters</div></div>
                  <div><label class="lbl">Store logo</label><input class="inp !p-2" type="file" accept="image/*" data-settings-action="upload-logo" /></div>
                  <div><label class="lbl">Store banner</label><input class="inp !p-2" type="file" accept="image/*" data-settings-action="upload-banner" /></div>
                  <div><label class="lbl">Store category</label><select class="inp" name="category"><option ${settings.store.category==='Figures & Collectibles'?'selected':''}>Figures & Collectibles</option><option ${settings.store.category==='Clothing & Apparel'?'selected':''}>Clothing & Apparel</option><option ${settings.store.category==='Manga & Books'?'selected':''}>Manga & Books</option><option ${settings.store.category==='Posters & Wall Art'?'selected':''}>Posters & Wall Art</option><option ${settings.store.category==='Accessories'?'selected':''}>Accessories</option></select></div>
                  <div><label class="lbl">Store contact</label><input class="inp" name="contact" value="${esc(settings.store.contact)}" /></div>
                  <div class="md:col-span-2"><label class="lbl">Store policies</label><textarea class="inp min-h-[100px]" name="policies">${esc(settings.store.policies)}</textarea></div>
                </div>
                <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="preview-store">Preview store</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="store">Save changes</button></div>
              </form>
            </div>

            <div id="settings-location" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Location">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Location</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Seller location</h3>
              <form data-settings-form="location" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Country</label><input class="inp" value="${esc(settings.location.country)}" readonly /></div>
                <div><label class="lbl">State</label><select class="inp" name="state">${NIGERIAN_STATES.map(state => `<option value="${esc(state)}" ${settings.location.state===state?'selected':''}>${esc(state)}</option>`).join('')}</select></div>
                <div><label class="lbl">City</label><select class="inp" name="city">${cityOptions}</select></div>
                <div><label class="lbl">Pickup / dispatch location</label><input class="inp" name="dispatch" value="${esc(settings.location.dispatch)}" /></div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="location">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="location">Save changes</button></div>
              </form>
            </div>

            <div id="settings-products" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Products">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Products</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Product defaults</h3>
              <form data-settings-form="productDefaults" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Default product category</label><select class="inp" name="category"><option ${settings.productDefaults.category==='Figures & Collectibles'?'selected':''}>Figures & Collectibles</option><option ${settings.productDefaults.category==='Clothing & Apparel'?'selected':''}>Clothing & Apparel</option><option ${settings.productDefaults.category==='Manga & Books'?'selected':''}>Manga & Books</option><option ${settings.productDefaults.category==='Posters & Wall Art'?'selected':''}>Posters & Wall Art</option><option ${settings.productDefaults.category==='Accessories'?'selected':''}>Accessories</option></select></div>
                <div><label class="lbl">Default currency</label><select class="inp" name="currency"><option value="NGN" ${settings.productDefaults.currency==='NGN'?'selected':''}>Nigerian Naira (₦)</option><option value="USD" ${settings.productDefaults.currency==='USD'?'selected':''}>US Dollar ($)</option></select></div>
                <div class="md:col-span-2"><label class="lbl">Default processing time</label><select class="inp" name="processing"><option ${settings.productDefaults.processing==='1–2 business days'?'selected':''}>1–2 business days</option><option ${settings.productDefaults.processing==='2–3 business days'?'selected':''}>2–3 business days</option><option ${settings.productDefaults.processing==='3–5 business days'?'selected':''}>3–5 business days</option><option ${settings.productDefaults.processing==='5–7 business days'?'selected':''}>5–7 business days</option></select></div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="productDefaults">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="productDefaults">Save changes</button></div>
              </form>
            </div>

            <div id="settings-inventory" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Inventory">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Inventory</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Inventory settings</h3>
              <form data-settings-form="inventory" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Low stock threshold</label><input class="inp" name="lowStock" type="number" min="1" value="${settings.inventory.lowStock}" /></div>
                <div><label class="lbl">SKU prefix</label><input class="inp" value="ANL" /></div>
                <div class="md:col-span-2 space-y-3">
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="notifyLow" ${settings.inventory.notifyLow?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Notify me when stock is low</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="notifyOut" ${settings.inventory.notifyOut?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Notify me when a product is out of stock</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="hideOut" ${settings.inventory.hideOut?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Hide out-of-stock products</label>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="reset-section" data-settings-section="inventory">Reset</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="inventory">Save changes</button></div>
              </form>
            </div>

            <div id="settings-orders" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Orders">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Orders</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Order settings</h3>
              <form data-settings-form="orders" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Default processing time</label><select class="inp" name="processing"><option ${settings.orders.processing==='1–2 business days'?'selected':''}>1–2 business days</option><option ${settings.orders.processing==='2–3 business days'?'selected':''}>2–3 business days</option><option ${settings.orders.processing==='3–5 business days'?'selected':''}>3–5 business days</option><option ${settings.orders.processing==='5–7 business days'?'selected':''}>5–7 business days</option></select></div>
                <div><label class="lbl">Cancellation preference</label><select class="inp" name="cancellation"><option ${settings.orders.cancellation==='Marketplace default'?'selected':''}>Marketplace default</option><option ${settings.orders.cancellation==='Seller review'?'selected':''}>Seller review</option><option ${settings.orders.cancellation==='Auto-cancel'?'selected':''}>Auto-cancel</option></select></div>
                <div class="md:col-span-2 space-y-3">
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="newOrder" ${settings.orders.notifications.newOrder?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> New order notifications</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="cancel" ${settings.orders.notifications.cancel?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Order cancellation alerts</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="delivered" ${settings.orders.notifications.delivered?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Delivery confirmation alerts</label>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="orders">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="orders">Save changes</button></div>
              </form>
            </div>

            <div id="settings-delivery" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Delivery & Shipping">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Delivery & Shipping</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Shipping preferences</h3>
              <form data-settings-form="shipping" class="mt-5 grid md:grid-cols-2 gap-4">
                <div class="md:col-span-2 space-y-3">
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="local" ${settings.shipping.local?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Local delivery</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="national" ${settings.shipping.national?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Nationwide delivery</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="pickup" ${settings.shipping.pickup?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Pickup</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="free" ${settings.shipping.free?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Free shipping</label>
                </div>
                <div><label class="lbl">Local delivery fee</label><input class="inp" name="localFee" value="${esc(settings.shipping.localFee)}" /></div>
                <div><label class="lbl">Nationwide fee</label><input class="inp" name="nationalFee" value="${esc(settings.shipping.nationalFee)}" /></div>
                <div><label class="lbl">Dispatch location</label><input class="inp" name="dispatch" value="${esc(settings.shipping.dispatch)}" /></div>
                <div><label class="lbl">Processing time</label><select class="inp" name="processing"><option ${settings.shipping.processing==='1–2 business days'?'selected':''}>1–2 business days</option><option ${settings.shipping.processing==='2–3 business days'?'selected':''}>2–3 business days</option><option ${settings.shipping.processing==='3–5 business days'?'selected':''}>3–5 business days</option><option ${settings.shipping.processing==='5–7 business days'?'selected':''}>5–7 business days</option></select></div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="add-shipping-option">Add shipping option</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="shipping">Save changes</button></div>
              </form>
            </div>

            <div id="settings-returns" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Returns & Refunds">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Returns & Refunds</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Return policy</h3>
              <form data-settings-form="returns" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Return window</label><select class="inp" name="window"><option ${settings.returns.window==='Marketplace default'?'selected':''}>Marketplace default</option><option ${settings.returns.window==='7 days'?'selected':''}>7 days</option><option ${settings.returns.window==='14 days'?'selected':''}>14 days</option><option ${settings.returns.window==='30 days'?'selected':''}>30 days</option></select></div>
                <div></div>
                <div class="md:col-span-2 space-y-3">
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="unused" ${settings.returns.conditions.unused?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Product must be unused</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="packaging" ${settings.returns.conditions.packaging?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Original packaging required</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="purchase" ${settings.returns.conditions.purchase?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Proof of purchase required</label>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="returns">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="returns">Save changes</button></div>
              </form>
            </div>

            <div id="settings-payments" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Payments & Payouts">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Payments & Payouts</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Payout settings</h3>
              <form data-settings-form="payout" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Payout method</label><select class="inp" name="method"><option ${settings.payout.method==='Bank transfer'?'selected':''}>Bank transfer</option><option ${settings.payout.method==='Wallet transfer'?'selected':''}>Wallet transfer</option><option ${settings.payout.method==='Cash pickup'?'selected':''}>Cash pickup</option></select></div>
                <div><label class="lbl">Payout schedule</label><select class="inp" name="schedule"><option ${settings.payout.schedule==='Weekly'?'selected':''}>Weekly</option><option ${settings.payout.schedule==='Bi-weekly'?'selected':''}>Bi-weekly</option><option ${settings.payout.schedule==='Monthly'?'selected':''}>Monthly</option></select></div>
                <div><label class="lbl">Bank name</label><input class="inp" name="bank" value="${esc(settings.payout.bank)}" /></div>
                <div><label class="lbl">Account number</label><input class="inp" name="accountNumber" value="${esc(settings.payout.accountNumber)}" /></div>
                <div class="md:col-span-2 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4">
                  <div class="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Available balance</div>
                      <div class="font-display font-extrabold text-3xl text-[#111827] mt-2">₦320,000</div>
                    </div>
                    <div>
                      <div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Pending balance</div>
                      <div class="font-display font-extrabold text-3xl text-[#111827] mt-2">₦85,000</div>
                    </div>
                  </div>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="payout-add">Add payout account</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="payout">Save changes</button></div>
              </form>
            </div>

            <div id="settings-tax-fees" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Taxes & Fees">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Taxes & Fees</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Marketplace fees</h3>
              <div class="mt-5 grid md:grid-cols-2 gap-4">
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Marketplace commission</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">15%</div></div>
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Transaction fee</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">₦1,500</div></div>
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Refund adjustments</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">Policy-based</div></div>
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Current rate</div><div class="font-display font-extrabold text-2xl mt-2 text-[#111827]">Managed by ANILyfe</div></div>
              </div>
              <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="fee-breakdown">View fee details</button></div>
            </div>

            <div id="settings-notifications" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Notifications">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Notifications</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Marketplace notifications</h3>
              <form data-settings-form="notifications" class="mt-5 grid md:grid-cols-2 gap-4">
                <div class="space-y-3">
                  <div class="font-bold text-sm text-[#111827]">Orders</div>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="newOrder" ${settings.notifications.orders.newOrder?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> New order</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="cancel" ${settings.notifications.orders.cancel?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Order cancellation</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="delivered" ${settings.notifications.orders.delivered?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Order delivered</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="returnRequest" ${settings.notifications.orders.returnRequest?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Return request</label>
                </div>
                <div class="space-y-3">
                  <div class="font-bold text-sm text-[#111827]">Products</div>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="approved" ${settings.notifications.products.approved?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Product approved</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="rejected" ${settings.notifications.products.rejected?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Product rejected</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="lowStock" ${settings.notifications.products.lowStock?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Low stock</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="outOfStock" ${settings.notifications.products.outOfStock?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Out of stock</label>
                </div>
                <div class="md:col-span-2 space-y-3">
                  <div class="font-bold text-sm text-[#111827]">Channels</div>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="inApp" ${settings.notifications.channels.inApp?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> In-app</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="email" ${settings.notifications.channels.email?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> Email</label>
                  <label class="flex items-center gap-3 text-sm text-[#374151] font-medium"><input type="checkbox" name="sms" ${settings.notifications.channels.sms?'checked':''} class="h-4 w-4 rounded border-[#CBD5E1] text-[#334EAC] focus:ring-[#334EAC]" /> SMS</label>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="reset-section" data-settings-section="notifications">Reset</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="notifications">Save changes</button></div>
              </form>
            </div>

            <div id="settings-security" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Security">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Security</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Account security</h3>
              <form data-settings-form="password" class="mt-5 grid md:grid-cols-2 gap-4">
                <div><label class="lbl">Current password</label><input class="inp" type="password" name="current" /></div>
                <div><label class="lbl">New password</label><input class="inp" type="password" name="new" /></div>
                <div><label class="lbl">Confirm new password</label><input class="inp" type="password" name="confirm" /></div>
                <div><label class="lbl">Two-step verification</label><select class="inp" name="twoStep"><option ${settings.security.twoStep?'selected':''}>Enabled</option><option ${!settings.security.twoStep?'selected':''}>Disabled</option></select></div>
                <div class="md:col-span-2 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4">
                  <div class="font-bold text-[#111827]">Active sessions</div>
                  <div class="mt-3 space-y-2 text-sm text-[#475569]">
                    ${settings.security.sessions.map(item => `<div class="flex items-center justify-between rounded-xl bg-white border border-[#E5E7EB] px-3 py-2"><span>${esc(item.device)}</span><span class="${item.active ? 'text-[#1F9D55] font-semibold' : 'text-[#64748B]'}">${esc(item.status)}</span></div>`).join('')}
                  </div>
                </div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="logout-other-sessions">Log out other sessions</button><button type="button" class="btn btn-primary" data-settings-action="save-password">Save password</button></div>
              </form>
            </div>

            <div id="settings-verification" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Verification">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Verification</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Seller verification</h3>
              <div class="mt-5 rounded-2xl border border-[#D0E3FF] bg-[#EEF3FF] p-5 text-sm text-[#334EAC] font-semibold">Status: ${settings.verification.status}. Your store has passed verification and is trusted by buyers.</div>
              <div class="mt-5 flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="text-sm text-[#475569]">Your verification documents are private and not publicly visible on the storefront.</div><button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-settings-action="verify-email">Verify email</button></div>
              <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="start-verification">Start verification</button></div>
            </div>

            <div id="settings-privacy" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Privacy">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Privacy</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Marketplace privacy</h3>
              <form data-settings-form="privacy" class="mt-5 grid md:grid-cols-2 gap-4">
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="font-bold text-[#111827]">Public information</div><div class="mt-3 space-y-2 text-sm text-[#475569]"><label class="flex items-center gap-3"><input type="checkbox" name="showStoreLocation" ${settings.privacy.public.showStoreLocation?'checked':''} /> Show store location</label><label class="flex items-center gap-3"><input type="checkbox" name="showStoreDescription" ${settings.privacy.public.showStoreDescription?'checked':''} /> Show store description</label><label class="flex items-center gap-3"><input type="checkbox" name="showSellerRating" ${settings.privacy.public.showSellerRating?'checked':''} /> Show seller rating</label></div></div>
                <div class="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-4"><div class="font-bold text-[#111827]">Private information</div><div class="mt-3 space-y-2 text-sm text-[#475569]"><label class="flex items-center gap-3"><input type="checkbox" checked disabled /> Personal email</label><label class="flex items-center gap-3"><input type="checkbox" checked disabled /> Payout information</label><label class="flex items-center gap-3"><input type="checkbox" checked disabled /> Verification information</label></div></div>
                <div class="md:col-span-2 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="cancel-section" data-settings-section="privacy">Cancel</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="privacy">Save changes</button></div>
              </form>
            </div>

            <div id="settings-account-management" class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm" data-section="Account Management">
              <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Account management</div>
              <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Store controls</h3>
              <div class="mt-5 space-y-3">
                <div class="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center justify-between gap-3"><div><div class="font-bold text-[#111827]">Pause store</div><div class="text-sm text-[#475569]">Temporarily stop accepting new orders while preserving your seller account.</div></div><button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-settings-action="pause-store">Pause</button></div>
                <div class="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-4 flex items-center justify-between gap-3"><div><div class="font-bold text-[#111827]">Close store</div><div class="text-sm text-[#475569]">Begin the closure process for your marketplace shop.</div></div><button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px]" data-settings-action="close-store">Close</button></div>
                <div class="rounded-2xl border border-[#FECACA] bg-[#FEF3F2] p-4 flex items-center justify-between gap-3"><div><div class="font-bold text-[#991B1B]">Delete account</div><div class="text-sm text-[#7F1D1D]">Strong confirmation and backend validation are required before account deletion.</div></div><button type="button" class="btn btn-ghost !px-3 !py-2 !text-[11px] !text-[#991B1B]" data-settings-action="delete-account">Delete</button></div>
              </div>
            </div>

            <div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Save system</div>
                  <h3 class="font-display font-extrabold text-2xl text-[#111827] mt-1">Review and save</h3>
                </div>
                ${statusBadge}
              </div>
              <div class="mt-5 flex justify-end gap-3"><button type="button" class="btn btn-ghost" data-settings-action="reset-all">Reset to default</button><button type="button" class="btn btn-primary" data-settings-action="save-section" data-settings-section="all">Save everything</button></div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const settingsContent = renderSellerSettingsPage();

  const contentMap = { dashboard: dashboardContent, listings: listingsContent, products: listingsContent, orders: `<div class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm"><div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Orders</div><h2 class="font-display font-extrabold text-2xl text-[#111827] mt-1">No orders yet</h2><div class="mt-4 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F8FAFC] p-6 text-center text-sm text-[#64748B]">Once buyers place orders, this tab will show them here.</div></div>`, inventory: inventoryContent, reviews: reviewsContent, earnings: paymentsContent, analytics: analyticsContent, delivery: deliveryContent, store: storeContent, verification: verificationContent, settings: settingsContent };

  return `
  <div class="min-h-screen bg-[#F5F5F0] text-[#1F2937]">
    <div class="max-w-[1600px] mx-auto px-4 py-4">
      <header class="rounded-full border border-[#E5E7EB] bg-white/80 backdrop-blur-xl px-4 py-3 shadow-sm sticky top-3 z-20">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-3">${LOGO('text-2xl')}<div class="hidden sm:block h-6 w-px bg-[#E5E7EB]"></div><div class="text-sm font-semibold text-[#374151]">Seller dashboard</div></div>
          <div class="flex items-center gap-2"><button class="btn btn-ghost !px-3 !py-2 !text-[11px]">Preview shop</button><button class="btn btn-primary !px-3 !py-2 !text-[11px]" data-action="seller-tab" data-tab="listings">Add listing</button></div>
        </div>
      </header>

      <div class="mt-5 grid lg:grid-cols-[260px_minmax(0,1fr)] gap-5">
        <aside class="rounded-3xl border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div class="flex items-center gap-3 pb-5 border-b border-[#EEF2F7]">
            <div class="w-12 h-12 rounded-2xl bg-[#EEF3FF] flex items-center justify-center font-display font-extrabold text-lg text-[#334EAC]">${esc(s.businessName[0])}</div>
            <div>
              <div class="font-bold text-sm text-[#111827]">${esc(s.businessName)}</div>
              <div class="flex items-center gap-2 mt-1">${statusBadge}</div>
            </div>
          </div>

          <nav class="mt-5 space-y-1">
            ${nav.map(([label, icon, active]) => `
              <button class="w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${active ? 'bg-[#EEF3FF] text-[#1D4ED8]' : 'text-[#4B5563] hover:bg-[#F3F4F6]'}" data-action="seller-tab" data-tab="${label.toLowerCase()}">
                <i data-lucide="${icon}" style="width:16px;height:16px"></i>
                ${label}
              </button>
            `).join('')}
          </nav>

          <div class="mt-6 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-3">
            <div class="text-[10px] uppercase tracking-[.15em] text-[#64748B] font-bold">Shop status</div>
            <div class="mt-2 font-bold text-base text-[#111827]">${s.status==='approved' ? 'Live on marketplace' : 'Awaiting approval'}</div>
            <div class="mt-2 text-xs text-[#64748B]">${s.status==='approved' ? 'Your listings are active and discoverable.' : 'Complete your catalog to get ready for review.'}</div>
          </div>
        </aside>

        <main class="space-y-5">
          <section class="rounded-3xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div class="text-[10px] uppercase tracking-[.18em] text-[#64748B] font-bold">Overview</div>
                <h1 class="font-display font-extrabold text-3xl text-[#111827] mt-2">Hello, ${esc(u.name.split(' ')[0])}</h1>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button class="btn btn-ghost !px-3 !py-2 !text-[11px]">Sales report</button>
                <a href="#/marketplace" class="btn btn-primary !px-3 !py-2 !text-[11px]">View marketplace</a>
              </div>
            </div>
          </section>

          ${contentMap[sellerTab] || dashboardContent}
        </main>
      </div>
    </div>
  </div>`;
}

function applySellerSettingsPatch(section, patch){
  const settings = getSellerSettings();
  Object.assign(settings[section], patch);
  saveSellerSettings(settings);
  updateSellerProfileFromSettings(settings);
  return settings;
}

function saveSettingsSection(section){
  const form = document.querySelector(`[data-settings-form="${section}"]`);
  const settings = getSellerSettings();
  if(section !== 'all' && !form){
    toast('This setting section is unavailable right now.', 'alert-circle');
    return;
  }

  if(section === 'account'){
    const data = new FormData(form);
    settings.account.firstName = (data.get('firstName') || '').trim() || 'Seller';
    settings.account.lastName = (data.get('lastName') || '').trim() || 'Name';
    settings.account.displayName = (data.get('displayName') || '').trim() || settings.store.name;
    settings.account.email = (data.get('email') || '').trim();
    settings.account.phone = (data.get('phone') || '').trim();
    settings.account.password = (data.get('password') || '').trim();
    if(!settings.account.email.includes('@')) { toast('Please use a valid email address.', 'alert-triangle'); return; }
    if(settings.account.phone.length < 9) { toast('Please enter a valid phone number.', 'alert-triangle'); return; }
    if(settings.account.password && settings.account.password.length < 6) { toast('Password must be at least 6 characters long.', 'alert-circle'); return; }
    const u = currentUser(); if(u){ u.name = `${settings.account.firstName} ${settings.account.lastName}`.trim(); u.email = settings.account.email; LS.set('users', LS.get('users', []).map(x => x.id===u.id ? u : x)); }
  }

  if(section === 'store'){
    const data = new FormData(form);
    settings.store.name = (data.get('name') || '').trim() || 'Anilyfe Studio';
    settings.store.description = (data.get('description') || '').trim() || 'Anime merchandise and collectibles.';
    settings.store.category = (data.get('category') || 'Figures & Collectibles');
    settings.store.contact = (data.get('contact') || '').trim() || 'hello@anilyfe.example';
    settings.store.policies = (data.get('policies') || '').trim() || 'Policies update soon.';
    if(settings.store.description.length < 20){ toast('Store description must be at least 20 characters.', 'alert-circle'); return; }
  }

  if(section === 'location'){
    const data = new FormData(form);
    settings.location.state = data.get('state') || 'Rivers';
    settings.location.city = data.get('city') || 'Port Harcourt';
    settings.location.dispatch = (data.get('dispatch') || '').trim() || `${settings.location.city} warehouse`;
  }

  if(section === 'productDefaults'){
    const data = new FormData(form);
    settings.productDefaults.category = data.get('category') || settings.productDefaults.category;
    settings.productDefaults.currency = data.get('currency') || 'NGN';
    settings.productDefaults.processing = data.get('processing') || '2–3 business days';
  }

  if(section === 'inventory'){
    const data = new FormData(form);
    settings.inventory.lowStock = Number(data.get('lowStock')) || 5;
    settings.inventory.notifyLow = form.querySelector('[name="notifyLow"]').checked;
    settings.inventory.notifyOut = form.querySelector('[name="notifyOut"]').checked;
    settings.inventory.hideOut = form.querySelector('[name="hideOut"]').checked;
  }

  if(section === 'orders'){
    const data = new FormData(form);
    settings.orders.processing = data.get('processing') || '2–3 business days';
    settings.orders.cancellation = data.get('cancellation') || 'Marketplace default';
    settings.orders.notifications = {
      newOrder: form.querySelector('[name="newOrder"]').checked,
      cancel: form.querySelector('[name="cancel"]').checked,
      delivered: form.querySelector('[name="delivered"]').checked
    };
  }

  if(section === 'shipping'){
    const data = new FormData(form);
    settings.shipping.local = form.querySelector('[name="local"]').checked;
    settings.shipping.national = form.querySelector('[name="national"]').checked;
    settings.shipping.pickup = form.querySelector('[name="pickup"]').checked;
    settings.shipping.free = form.querySelector('[name="free"]').checked;
    settings.shipping.localFee = (data.get('localFee') || '2000').toString();
    settings.shipping.nationalFee = (data.get('nationalFee') || '5000').toString();
    settings.shipping.dispatch = (data.get('dispatch') || '').trim() || 'Port Harcourt warehouse';
    settings.shipping.processing = data.get('processing') || '2–3 business days';
  }

  if(section === 'returns'){
    const data = new FormData(form);
    settings.returns.window = data.get('window') || 'Marketplace default';
    settings.returns.conditions = {
      unused: form.querySelector('[name="unused"]').checked,
      packaging: form.querySelector('[name="packaging"]').checked,
      purchase: form.querySelector('[name="purchase"]').checked
    };
  }

  if(section === 'payout'){
    const data = new FormData(form);
    settings.payout.method = data.get('method') || 'Bank transfer';
    settings.payout.schedule = data.get('schedule') || 'Weekly';
    settings.payout.bank = (data.get('bank') || '').trim() || 'Access Bank';
    settings.payout.accountNumber = (data.get('accountNumber') || '').trim() || '***********1234';
  }

  if(section === 'notifications'){
    const formData = new FormData(form);
    settings.notifications.channels = {
      inApp: form.querySelector('[name="inApp"]').checked,
      email: form.querySelector('[name="email"]').checked,
      sms: form.querySelector('[name="sms"]').checked
    };
    settings.notifications.orders = {
      newOrder: form.querySelector('[name="newOrder"]').checked,
      cancel: form.querySelector('[name="cancel"]').checked,
      delivered: form.querySelector('[name="delivered"]').checked,
      returnRequest: form.querySelector('[name="returnRequest"]').checked
    };
    settings.notifications.products = {
      approved: form.querySelector('[name="approved"]').checked,
      rejected: form.querySelector('[name="rejected"]').checked,
      lowStock: form.querySelector('[name="lowStock"]').checked,
      outOfStock: form.querySelector('[name="outOfStock"]').checked
    };
  }

  if(section === 'privacy'){
    settings.privacy.public.showStoreLocation = form.querySelector('[name="showStoreLocation"]').checked;
    settings.privacy.public.showStoreDescription = form.querySelector('[name="showStoreDescription"]').checked;
    settings.privacy.public.showSellerRating = form.querySelector('[name="showSellerRating"]').checked;
  }

  if(section === 'all'){
    const sections = ['account','store','location','productDefaults','inventory','orders','shipping','returns','payout','notifications','privacy'];
    const base = getSellerSettings();
    const merged = JSON.parse(JSON.stringify(base));
    sections.forEach(key => {
      const formEl = document.querySelector(`[data-settings-form="${key}"]`);
      if(!formEl) return;
      const formData = new FormData(formEl);
      if(key === 'account'){
        merged.account.firstName = (formData.get('firstName') || '').trim() || 'Seller';
        merged.account.lastName = (formData.get('lastName') || '').trim() || 'Name';
        merged.account.displayName = (formData.get('displayName') || '').trim() || merged.store.name;
        merged.account.email = (formData.get('email') || '').trim();
        merged.account.phone = (formData.get('phone') || '').trim();
        merged.account.password = (formData.get('password') || '').trim();
      }
      if(key === 'store'){
        merged.store.name = (formData.get('name') || '').trim() || 'Anilyfe Studio';
        merged.store.description = (formData.get('description') || '').trim() || 'Anime merchandise and collectibles.';
        merged.store.category = (formData.get('category') || 'Figures & Collectibles');
        merged.store.contact = (formData.get('contact') || '').trim() || 'hello@anilyfe.example';
        merged.store.policies = (formData.get('policies') || '').trim() || 'Policies update soon.';
      }
      if(key === 'location'){
        merged.location.state = formData.get('state') || 'Rivers';
        merged.location.city = formData.get('city') || 'Port Harcourt';
        merged.location.dispatch = (formData.get('dispatch') || '').trim() || `${merged.location.city} warehouse`;
      }
      if(key === 'productDefaults'){
        merged.productDefaults.category = formData.get('category') || merged.productDefaults.category;
        merged.productDefaults.currency = formData.get('currency') || 'NGN';
        merged.productDefaults.processing = formData.get('processing') || '2–3 business days';
      }
      if(key === 'inventory'){
        merged.inventory.lowStock = Number(formData.get('lowStock')) || 5;
        merged.inventory.notifyLow = formEl.querySelector('[name="notifyLow"]').checked;
        merged.inventory.notifyOut = formEl.querySelector('[name="notifyOut"]').checked;
        merged.inventory.hideOut = formEl.querySelector('[name="hideOut"]').checked;
      }
      if(key === 'orders'){
        merged.orders.processing = formData.get('processing') || '2–3 business days';
        merged.orders.cancellation = formData.get('cancellation') || 'Marketplace default';
        merged.orders.notifications = {
          newOrder: formEl.querySelector('[name="newOrder"]').checked,
          cancel: formEl.querySelector('[name="cancel"]').checked,
          delivered: formEl.querySelector('[name="delivered"]').checked
        };
      }
      if(key === 'shipping'){
        merged.shipping.local = formEl.querySelector('[name="local"]').checked;
        merged.shipping.national = formEl.querySelector('[name="national"]').checked;
        merged.shipping.pickup = formEl.querySelector('[name="pickup"]').checked;
        merged.shipping.free = formEl.querySelector('[name="free"]').checked;
        merged.shipping.localFee = (formData.get('localFee') || '2000').toString();
        merged.shipping.nationalFee = (formData.get('nationalFee') || '5000').toString();
        merged.shipping.dispatch = (formData.get('dispatch') || '').trim() || 'Port Harcourt warehouse';
        merged.shipping.processing = formData.get('processing') || '2–3 business days';
      }
      if(key === 'returns'){
        merged.returns.window = formData.get('window') || 'Marketplace default';
        merged.returns.conditions = {
          unused: formEl.querySelector('[name="unused"]').checked,
          packaging: formEl.querySelector('[name="packaging"]').checked,
          purchase: formEl.querySelector('[name="purchase"]').checked
        };
      }
      if(key === 'payout'){
        merged.payout.method = formData.get('method') || 'Bank transfer';
        merged.payout.schedule = formData.get('schedule') || 'Weekly';
        merged.payout.bank = (formData.get('bank') || '').trim() || 'Access Bank';
        merged.payout.accountNumber = (formData.get('accountNumber') || '').trim() || '***********1234';
      }
      if(key === 'notifications'){
        merged.notifications.channels = {
          inApp: formEl.querySelector('[name="inApp"]').checked,
          email: formEl.querySelector('[name="email"]').checked,
          sms: formEl.querySelector('[name="sms"]').checked
        };
        merged.notifications.orders = {
          newOrder: formEl.querySelector('[name="newOrder"]').checked,
          cancel: formEl.querySelector('[name="cancel"]').checked,
          delivered: formEl.querySelector('[name="delivered"]').checked,
          returnRequest: formEl.querySelector('[name="returnRequest"]').checked
        };
        merged.notifications.products = {
          approved: formEl.querySelector('[name="approved"]').checked,
          rejected: formEl.querySelector('[name="rejected"]').checked,
          lowStock: formEl.querySelector('[name="lowStock"]').checked,
          outOfStock: formEl.querySelector('[name="outOfStock"]').checked
        };
      }
      if(key === 'privacy'){
        merged.privacy.public.showStoreLocation = formEl.querySelector('[name="showStoreLocation"]').checked;
        merged.privacy.public.showStoreDescription = formEl.querySelector('[name="showStoreDescription"]').checked;
        merged.privacy.public.showSellerRating = formEl.querySelector('[name="showSellerRating"]').checked;
      }
    });
    if(!merged.account.email || !merged.account.email.includes('@')) { toast('Please use a valid email address.', 'alert-triangle'); return; }
    if(!merged.account.phone || merged.account.phone.length < 9) { toast('Please enter a valid phone number.', 'alert-triangle'); return; }
    if(merged.store.description && merged.store.description.length < 20) { toast('Store description must be at least 20 characters.', 'alert-circle'); return; }
    saveSellerSettings(merged);
    updateSellerProfileFromSettings(merged);
    toast('✓ All settings saved successfully.', 'badge-check');
    route();
    return;
  }

  saveSellerSettings(settings);
  updateSellerProfileFromSettings(settings);
  toast('✓ Changes saved successfully.', 'badge-check');
  route();
}

document.addEventListener('click', (event) => {
  const btn = event.target.closest('[data-settings-action]');
  if(!btn) return;
  const action = btn.dataset.settingsAction;
  const section = btn.dataset.settingsSection;

  if(action === 'save-section'){ saveSettingsSection(section); }
  if(action === 'cancel-section'){ route(); }
  if(action === 'preview-store'){
    const settings = getSellerSettings();
    window.alert(`Store preview\n\n${settings.store.name}\n${settings.store.description}\n${settings.location.city}, ${settings.location.state}\nVerified seller`);
  }
  if(action === 'change-photo'){
    const input = document.createElement('input'); input.type='file'; input.accept='image/*'; input.onchange = () => {
      const file = input.files && input.files[0]; if(!file) return;
      const reader = new FileReader(); reader.onload = () => { const settings = getSellerSettings(); settings.account.profileImage = reader.result; saveSellerSettings(settings); toast('✓ Profile photo updated.', 'image-up'); route(); }; reader.readAsDataURL(file);
    }; input.click();
  }
  if(action === 'verify-email'){
    const email = prompt('Enter the 6-digit verification code sent to your email.', '123456');
    if(email && email.trim().length >= 4){ const settings = getSellerSettings(); settings.account.emailVerified = true; saveSellerSettings(settings); toast('✓ Email verified.', 'badge-check'); route(); }
  }
  if(action === 'start-verification'){
    const proceed = window.confirm('Start the seller verification workflow? This simulates the marketplace review process.');
    if(proceed){ const settings = getSellerSettings(); settings.verification.status = 'Under Review'; saveSellerSettings(settings); toast('Verification started — under review.', 'shield-check'); route(); }
  }
  if(action === 'logout-other-sessions'){
    const settings = getSellerSettings(); settings.security.sessions = settings.security.sessions.filter(s => s.active); saveSellerSettings(settings); toast('Other sessions have been logged out.', 'log-out'); route();
  }
  if(action === 'reset-section'){
    const defaults = getSellerSettings();
    const cleanDefaults = JSON.parse(JSON.stringify({
      account: defaults.account,
      store: defaults.store,
      productDefaults: defaults.productDefaults,
      inventory: defaults.inventory,
      orders: defaults.orders,
      shipping: defaults.shipping,
      returns: defaults.returns,
      payout: defaults.payout,
      notifications: defaults.notifications,
      privacy: defaults.privacy
    }));
    const settings = getSellerSettings();
    settings[section] = cleanDefaults[section] || settings[section];
    saveSellerSettings(settings);
    toast('Section reset to default values.', 'rotate-ccw');
    route();
  }
  if(action === 'reset-all'){
    if(!window.confirm('Reset notification and seller settings to their default values?')) return;
    LS.del('anilyfeSellerSettings');
    toast('Settings reset to default.', 'rotate-ccw'); route();
  }
  if(action === 'fee-breakdown'){
    const settings = getSellerSettings();
    window.alert(`Fee breakdown\n\nProduct sale: ₦10,000\nMarketplace commission (15%): ₦1,500\nShipping: ₦${settings.shipping.localFee || '2,000'}\nRefund adjustment: ${settings.fees.refund}\nSeller earnings: ₦8,500`);
  }
  if(action === 'payout-add'){
    const bank = prompt('Enter payout bank name', 'Access Bank');
    const account = prompt('Enter account number', '1234567890');
    if(bank && account){ const settings = getSellerSettings(); settings.payoutAccounts.push({ bank, masked: '**** **** ' + String(account).slice(-4), verified: true }); saveSellerSettings(settings); toast('Payout account added.', 'wallet'); route(); }
  }
  if(action === 'pause-store'){
    const settings = getSellerSettings(); settings.storeStatus = 'Temporarily Closed'; saveSellerSettings(settings); toast('Store status updated to Temporarily Closed.', 'pause-circle'); route();
  }
  if(action === 'close-store'){
    const settings = getSellerSettings(); settings.storeStatus = 'Closed'; saveSellerSettings(settings); toast('Store has been marked as closed.', 'store'); route();
  }
  if(action === 'delete-account'){
    const value = prompt('Type DELETE to continue', '');
    if(value === 'DELETE'){ const u = currentUser(); if(u){ LS.set('session', null); toast('Seller account simulated as deleted.', 'trash-2'); location.hash='#/'; } }
  }
  if(action === 'add-shipping-option'){
    const label = prompt('Shipping option name', 'Express Delivery');
    const fee = prompt('Shipping fee', '3500');
    if(label && fee){ const settings = getSellerSettings(); settings.shipping.options.push({ id: `opt-${Date.now()}`, label, fee, enabled: true }); saveSellerSettings(settings); toast('Shipping option added.', 'truck'); route(); }
  }
});

document.addEventListener('input', (event) => {
  if(event.target.id === 'settingsSearch'){
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('[data-section]').forEach(section => {
      const text = section.dataset.section.toLowerCase();
      const match = !query || text.includes(query) || section.textContent.toLowerCase().includes(query);
      section.style.display = match ? '' : 'none';
    });
  }
});

document.addEventListener('change', (event) => {
  const select = event.target.closest('[name="state"]');
  if(select){
    const state = select.value;
    const settings = getSellerSettings();
    settings.location.state = state;
    settings.location.city = (NIGERIAN_CITIES[state] || NIGERIAN_CITIES['Rivers'])[0];
    saveSellerSettings(settings);
    route();
  }
});

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
