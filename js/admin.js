/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Admin login + dashboard views, and the seller-moderation / admin-account
   actions used from admin/*.html. Not in the original file tree spec, but
   split out here so admin logic isn't buried inside app.js. */

let adminTab='login';
let adminView='dashboard';

const ADMIN_VIEW_TYPES = [
  {k:'dashboard', i:'gauge', l:'Dashboard'},
  {k:'users', i:'users', l:'Users'},
  {k:'sellers', i:'store', l:'Sellers'},
  {k:'products', i:'package', l:'Products'},
  {k:'orders', i:'shopping-bag', l:'Orders'},
  {k:'payments', i:'wallet', l:'Payments'},
  {k:'reports', i:'flag', l:'Reports'},
  {k:'support', i:'life-buoy', l:'Support'},
  {k:'settings', i:'sliders-horizontal', l:'Settings'}
];

let adminSearch = '';

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

function adminEnsureSeedData(){
  const existingUsers = LS.get('users', []);
  if(!existingUsers.length){
    LS.set('users', [
      { id:'USR-001', name:'Ada Okafor', email:'ada@example.com', status:'Active', createdAt:Date.now()-86400000*18, region:'NG', role:'buyer' },
      { id:'USR-002', name:'Emeka Ibe', email:'emeka@example.com', status:'Suspended', createdAt:Date.now()-86400000*44, region:'NG', role:'buyer' },
      { id:'USR-003', name:'Grace Bello', email:'grace@example.com', status:'Active', createdAt:Date.now()-86400000*12, region:'NG', role:'seller' }
    ]);
  }
  if(!LS.get('sellers', []).length){
    LS.set('sellers', [
      { id:'SEL-201', businessName:'Otaku Hub', status:'pending', sells:'Figures & Statues', rating:4.8, sales:138, startingPrice:12000 },
      { id:'SEL-202', businessName:'Anime World NG', status:'approved', sells:'Clothing', rating:4.9, sales:265, startingPrice:15000 },
      { id:'SEL-203', businessName:'Manga Den', status:'pending', sells:'Manga & Books', rating:4.6, sales:96, startingPrice:9000 }
    ]);
  }
  if(!LS.get('products', []).length){
    LS.set('products', [
      { id:'PRO-301', name:'Luffy Gear 5 Figure', category:'Figures & Statues', sellerId:'SEL-201', price:25000, status:'pending', stock:12, img:'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80' },
      { id:'PRO-302', name:'Gojo Hoodie', category:'Clothing', sellerId:'SEL-202', price:18000, status:'approved', stock:22, img:'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80' },
      { id:'PRO-303', name:'Demon Slayer Poster', category:'Posters & Wall Art', sellerId:'SEL-203', price:3500, status:'approved', stock:34, img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80' },
      { id:'PRO-304', name:'One Piece Box Set', category:'Manga & Books', sellerId:'SEL-202', price:32000, status:'pending', stock:4, img:'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80' }
    ]);
  }
  if(!LS.get('orders', []).length){
    LS.set('orders', [
      { id:'ORD-1001', buyer:'Ada Okafor', seller:'Otaku Hub', product:'Luffy Gear 5 Figure', status:'Processing', paymentStatus:'Paid', total:25000, date:'2026-08-30', location:'Lagos' },
      { id:'ORD-1002', buyer:'Emeka Ibe', seller:'Anime World NG', product:'Gojo Hoodie', status:'Shipped', paymentStatus:'Paid', total:18000, date:'2026-08-29', location:'Abuja' },
      { id:'ORD-1003', buyer:'Grace Bello', seller:'Manga Den', product:'Demon Slayer Poster', status:'Delivered', paymentStatus:'Paid', total:3500, date:'2026-08-27', location:'Port Harcourt' },
      { id:'ORD-1004', buyer:'Ada Okafor', seller:'Shonen Store', product:'One Piece Box Set', status:'Cancelled', paymentStatus:'Failed', total:32000, date:'2026-08-25', location:'Kano' }
    ]);
  }
  if(!LS.get('transactions', []).length){
    LS.set('transactions', [
      { id:'TXN-201', orderId:'ORD-1001', buyer:'Ada Okafor', seller:'Otaku Hub', amount:25000, method:'Card', status:'Successful', date:'2026-08-30' },
      { id:'TXN-202', orderId:'ORD-1004', buyer:'Ada Okafor', seller:'Shonen Store', amount:32000, method:'Transfer', status:'Failed', date:'2026-08-25' },
      { id:'TXN-203', orderId:'ORD-1002', buyer:'Emeka Ibe', seller:'Anime World NG', amount:18000, method:'Card', status:'Successful', date:'2026-08-29' }
    ]);
  }
  if(!LS.get('reports', []).length){
    LS.set('reports', [
      { id:'REP-001', type:'Product', subject:'Fake lucky star poster', status:'Under Review', severity:'High', date:'2026-08-28' },
      { id:'REP-002', type:'Seller', subject:'Seller missed shipping deadline', status:'New', severity:'Medium', date:'2026-08-30' }
    ]);
  }
  if(!LS.get('tickets', []).length){
    LS.set('tickets', [
      { id:'TKT-101', customer:'Ada Okafor', category:'Orders', priority:'High', status:'Open', topic:'Order not yet marked shipped', date:'2026-08-30' },
      { id:'TKT-102', customer:'Grace Bello', category:'Payments', priority:'Medium', status:'Pending', topic:'Payout delay', date:'2026-08-29' }
    ]);
  }
  if(!LS.get('marketplaceSettings', []).length){
    LS.set('marketplaceSettings', {
      marketplaceName:'ANILyfe',
      marketplaceDescription:'Premium anime marketplace for figures, manga, fashion, and collectibles.',
      commission:15,
      sellerRegistrationEnabled:true,
      reviewSystemEnabled:true,
      maintenanceMode:false,
      defaultCurrency:'NGN',
      supportEmail:'support@anilyfe.com'
    });
  }
  if(!LS.get('admins', []).length){
    LS.set('admins', [{id:'ADM-ROOT', username:'admin', password:'anilyfe@admin', createdAt:Date.now(), role:'Super Admin'}]);
  }
  LS.set('adminSeeded', true);
}

function getAdminMetrics(){
  const users = LS.get('users', []);
  const sellers = LS.get('sellers', []);
  const products = LS.get('products', []);
  const orders = LS.get('orders', []);
  const transactions = LS.get('transactions', []);
  const reports = LS.get('reports', []);
  const tickets = LS.get('tickets', []);

  const approvedSellers = sellers.filter(s => s.status === 'approved').length;
  const pendingSellers = sellers.filter(s => s.status === 'pending').length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const suspendedUsers = users.filter(u => u.status === 'Suspended').length;
  const approvedProducts = products.filter(p => p.status === 'approved').length;
  const pendingProducts = products.filter(p => p.status === 'pending').length;
  const outOfStock = products.filter(p => p.stock <= 0).length;
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const marketplaceFee = totalRevenue * 0.15;
  const completedOrders = orders.filter(o => o.status === 'Delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'Processing' || o.status === 'New').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;

  return {
    users, sellers, products, orders, transactions, reports, tickets,
    approvedSellers, pendingSellers, activeUsers, suspendedUsers,
    approvedProducts, pendingProducts, outOfStock,
    totalRevenue, marketplaceFee, completedOrders, pendingOrders, cancelledOrders
  };
}

function adminMatchesSearch(value, text){
  if(!adminSearch) return true;
  return String(value || '').toLowerCase().includes(adminSearch.toLowerCase()) || String(text || '').toLowerCase().includes(adminSearch.toLowerCase());
}

function viewAdminDash(){
  adminEnsureSeedData();
  const a = currentAdmin();
  if(!a){ location.hash='#/admin-login'; return ''; }

  const metrics = getAdminMetrics();
  const users = metrics.users.filter(u => adminMatchesSearch(u.id, `${u.name} ${u.email} ${u.status}`));
  const sellers = metrics.sellers.filter(s => adminMatchesSearch(s.id, `${s.businessName} ${s.status} ${s.sells}`));
  const products = metrics.products.filter(p => adminMatchesSearch(p.id, `${p.name} ${p.category} ${p.status}`));
  const orders = metrics.orders.filter(o => adminMatchesSearch(o.id, `${o.buyer} ${o.seller} ${o.product} ${o.status}`));
  const transactions = metrics.transactions.filter(t => adminMatchesSearch(t.id, `${t.buyer} ${t.seller} ${t.status}`));
  const reports = metrics.reports.filter(r => adminMatchesSearch(r.id, `${r.type} ${r.subject} ${r.status}`));
  const tickets = metrics.tickets.filter(t => adminMatchesSearch(t.id, `${t.customer} ${t.category} ${t.topic} ${t.status}`));
  const topSellers = [...sellers]
    .filter(s => s.status === 'approved')
    .sort((a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0) || (Number(b.rating) || 0) - (Number(a.rating) || 0))
    .slice(0, 5);

  const nav = ADMIN_VIEW_TYPES.map(item => ({...item, badge: item.k === 'sellers' ? metrics.pendingSellers : item.k === 'products' ? metrics.pendingProducts : 0 }));
  const selected = nav.find(n => n.k === adminView) || nav[0];

  let body = '';

  if(adminView === 'dashboard') {
    const statData = [
      ['users', 'Total Users', metrics.users.length, '#334EAC'],
      ['store', 'Verified Sellers', metrics.approvedSellers, '#081F5C'],
      ['package', 'Products', metrics.products.length, '#708BD1'],
      ['wallet', 'Revenue', fmt(metrics.totalRevenue), '#E9B949'],
      ['shopping-bag', 'Orders', metrics.orders.length, '#2F6FED'],
      ['shield-alert', 'Reports', metrics.reports.length, '#B42318']
    ];

    body = `
      <div class="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-7">
        ${statData.map((x, idx) => `
          <div class="card p-5 reveal" style="transition-delay:${idx * 60}ms">
            <div class="flex items-center justify-between mb-3">
              <span class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:${x[3]}22">
                <i data-lucide="${x[0]}" style="width:18px;height:18px;color:${x[3]}"></i>
              </span>
            </div>
            <div class="font-display font-extrabold text-2xl">${x[2]}</div>
            <div class="text-[10px] font-bold uppercase tracking-widest text-[#708BD1] mt-1">${x[1]}</div>
          </div>
        `).join('')}
      </div>

      <div class="grid xl:grid-cols-[1.3fr_0.7fr] gap-5 mb-5">
        <div class="card p-5 reveal">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-display font-bold text-xl">Marketplace activity</h3>
            <div class="text-xs font-bold text-[#708BD1]">Last 30 days</div>
          </div>
          <div class="grid grid-cols-6 gap-2 items-end h-40">
            ${[48, 65, 58, 81, 76, 92, 74, 85, 80, 96, 110, 100].map((v, i) => `
              <div class="flex flex-col items-center gap-2">
                <div class="w-full rounded-t-2xl bg-gradient-to-t from-[#334EAC] to-[#7CA6FF]" style="height:${v}%"></div>
                <div class="text-[9px] font-bold text-[#708BD1]">${['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card p-5 reveal">
          <h3 class="font-display font-bold text-xl mb-4">Admin alerts</h3>
          <div class="space-y-3">
            ${[
              ['New seller application', metrics.pendingSellers, '#E9B949'],
              ['Products pending review', metrics.pendingProducts, '#334EAC'],
              ['Open support tickets', tickets.length, '#B42318'],
              ['Marketplace reports', reports.length, '#1F9D55']
            ].map(([label, value, color]) => `
              <div class="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E7F1FF] px-3 py-2.5">
                <span class="text-xs font-bold text-[#475569]">${label}</span>
                <span class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold text-white" style="background:${color}">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card p-5 reveal mb-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-xl">Top sellers</h3>
          <span class="text-[10px] font-bold uppercase tracking-[.2em] text-[#708BD1]">Live ranking</span>
        </div>
        ${topSellers.length ? topSellers.map((seller, index) => `
          <div class="flex items-center gap-3 py-3 border-b border-[#E7F1FF] last:border-0">
            <span class="w-8 h-8 rounded-xl bg-[#E7F1FF] text-[#334EAC] flex items-center justify-center font-display font-extrabold text-sm">#${index + 1}</span>
            <div class="flex-1 min-w-0">
              <div class="text-xs font-extrabold truncate">${esc(seller.businessName || 'Seller')}</div>
              <div class="text-[10px] text-[#708BD1] font-bold">${esc(seller.sells || 'Anime seller')} · ${seller.rating || 0}⭐</div>
            </div>
            <div class="text-right">
              <div class="font-display font-extrabold text-sm">${Number(seller.sales || 0).toLocaleString()}</div>
              <div class="text-[10px] text-[#708BD1] font-bold uppercase tracking-wider">sales</div>
            </div>
          </div>
        `).join('') : '<div class="text-sm text-[#708BD1]">No approved sellers are ranking yet.</div>'}
      </div>

      <div class="grid lg:grid-cols-2 gap-5">
        <div class="card p-5 reveal">
          <h3 class="font-display font-bold text-xl mb-4">Recent seller applications</h3>
          ${sellers.slice(0, 4).map(s => `
            <div class="flex items-center gap-3 py-2.5 border-b border-[#E7F1FF] last:border-0">
              <span class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] text-white flex items-center justify-center font-bold text-sm shrink-0">${esc(s.businessName ? s.businessName[0] : 'S')}</span>
              <div class="flex-1 min-w-0">
                <div class="text-xs font-extrabold truncate">${esc(s.businessName || 'Seller')}</div>
                <div class="text-[10px] text-[#708BD1] font-bold">${esc(s.status || 'pending')}</div>
              </div>
              <span class="badge ${s.status === 'approved' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : '!bg-[#FFF7E0] !text-[#B7791F]'}">${esc(s.status || 'pending')}</span>
            </div>
          `).join('') || '<div class="text-sm text-[#708BD1]">No seller applications match this search.</div>'}
        </div>

        <div class="card p-5 reveal">
          <h3 class="font-display font-bold text-xl mb-4">Inventory health</h3>
          ${Object.keys(CATS).slice(0, 5).map(cat => {
            const n = products.filter(p => p.category === cat).length;
            const high = Math.max(1, products.length || 1);
            return `
              <div class="mb-3">
                <div class="flex justify-between text-[11px] font-bold mb-1"><span>${cat}</span><span class="text-[#708BD1]">${n}</span></div>
                <div class="h-2 rounded-full bg-[#E7F1FF] overflow-hidden"><div class="h-full rounded-full bg-gradient-to-r from-[#334EAC] to-[#708BD1] transition-all duration-700" style="width:${Math.min(100, (n/high) * 100)}%"></div></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  if(adminView === 'users') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between gap-3 flex-wrap">
          <h3 class="font-display font-bold text-xl">User management</h3>
          <div class="flex items-center gap-2 text-xs font-bold text-[#708BD1]"><span>${users.length} users</span></div>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[760px]">
            <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Role</th><th>Joined</th><th class="!text-right">Actions</th></tr></thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td><div class="font-extrabold text-xs">${esc(u.name || 'User')}</div></td>
                  <td class="text-xs text-[#475569]">${esc(u.email || '—')}</td>
                  <td><span class="badge ${u.status === 'Active' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : '!bg-[#FEF3F2] !text-[#B42318]'}">${esc(u.status || 'Active')}</span></td>
                  <td class="text-xs font-bold text-[#708BD1] capitalize">${esc(u.role || 'buyer')}</td>
                  <td class="text-xs text-[#475569]">${new Date(u.createdAt || Date.now()).toLocaleDateString()}</td>
                  <td>
                    <div class="flex justify-end gap-2">
                      <button class="btn btn-ghost !py-1.5 !px-2 !text-[10px]" data-action="admin-user-status" data-id="${u.id}" data-status="${u.status === 'Active' ? 'Suspended' : 'Active'}">${u.status === 'Active' ? 'Suspend' : 'Restore'}</button>
                    </div>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No users found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'sellers') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between gap-3 flex-wrap">
          <h3 class="font-display font-bold text-xl">Seller management</h3>
          <span class="badge !bg-[#FFF7E0] !text-[#B7791F]">${metrics.pendingSellers} pending</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[820px]">
            <thead><tr><th>Seller</th><th>Category</th><th>Status</th><th>Rating</th><th>Sales</th><th class="!text-right">Actions</th></tr></thead>
            <tbody>
              ${sellers.map(s => `
                <tr>
                  <td><div class="flex items-center gap-3"><span class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#081F5C] to-[#334EAC] text-white flex items-center justify-center font-bold text-sm shrink-0">${esc((s.businessName || 'S')[0])}</span><div><div class="font-extrabold text-xs">${esc(s.businessName || 'Seller')}</div><div class="text-[10px] text-[#708BD1] font-bold">${esc(s.id || '—')}</div></div></div></td>
                  <td class="text-xs text-[#475569]">${esc(s.sells || 'Marketplace seller')}</td>
                  <td><span class="badge ${s.status === 'approved' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : s.status === 'pending' ? '!bg-[#FFF7E0] !text-[#B7791F]' : '!bg-[#FEF3F2] !text-[#B42318]'}">${esc(s.status || 'pending')}</span></td>
                  <td class="text-xs font-bold text-[#081F5C]">${s.rating || '0.0'} ★</td>
                  <td class="text-xs font-bold text-[#475569]">${s.sales || 0}</td>
                  <td>
                    <div class="flex justify-end gap-2">
                      ${s.status !== 'approved' ? `<button class="btn btn-primary !py-1.5 !px-2 !text-[10px]" data-action="admin-seller-status" data-id="${s.id}" data-status="approved">Approve</button>` : ''}
                      <button class="btn btn-danger !py-1.5 !px-2 !text-[10px]" data-action="admin-seller-status" data-id="${s.id}" data-status="suspended">Suspend</button>
                    </div>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No sellers found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'products') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
          <h3 class="font-display font-bold text-xl">Product moderation</h3>
          <span class="badge !bg-[#E7F1FF] !text-[#334EAC]">${metrics.pendingProducts} pending</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[920px]">
            <thead><tr><th>Product</th><th>Seller</th><th>Category</th><th>Status</th><th>Stock</th><th class="!text-right">Actions</th></tr></thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-[#E7F1FF] flex items-center justify-center"><i data-lucide="${CATS[catKey(p.category)]?.icon || 'package'}" style="width:16px;height:16px;color:#334EAC"></i></div><div><div class="font-extrabold text-xs">${esc(p.name)}</div><div class="text-[10px] text-[#708BD1] font-bold">${esc(p.id)}</div></div></div></td>
                  <td class="text-xs text-[#475569]">${esc((metrics.sellers.find(s => s.id === p.sellerId) || {}).businessName || 'Unknown')}</td>
                  <td class="text-xs font-bold text-[#708BD1]">${esc(p.category)}</td>
                  <td><span class="badge ${p.status === 'approved' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : p.status === 'pending' ? '!bg-[#FFF7E0] !text-[#B7791F]' : '!bg-[#FEF3F2] !text-[#B42318]'}">${esc(p.status || 'pending')}</span></td>
                  <td class="text-xs font-bold ${p.stock <= 0 ? 'text-[#B42318]' : 'text-[#475569]'}">${p.stock}</td>
                  <td>
                    <div class="flex justify-end gap-2">
                      <button class="btn btn-primary !py-1.5 !px-2 !text-[10px]" data-action="admin-product-action" data-id="${p.id}" data-status="approved">Approve</button>
                      <button class="btn btn-danger !py-1.5 !px-2 !text-[10px]" data-action="admin-product-action" data-id="${p.id}" data-status="rejected">Reject</button>
                    </div>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No products found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'orders') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
          <h3 class="font-display font-bold text-xl">Order management</h3>
          <span class="badge !bg-[#E7F1FF] !text-[#334EAC]">${orders.length} records</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[900px]">
            <thead><tr><th>Order ID</th><th>Buyer</th><th>Product</th><th>Status</th><th>Total</th><th>Location</th><th class="!text-right">Actions</th></tr></thead>
            <tbody>
              ${orders.map(order => `
                <tr>
                  <td class="font-tech text-xs font-bold text-[#334EAC]">${esc(order.id)}</td>
                  <td class="text-xs text-[#475569]">${esc(order.buyer)}</td>
                  <td class="text-xs text-[#475569]">${esc(order.product)}</td>
                  <td><span class="badge ${order.status === 'Delivered' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : order.status === 'Shipped' ? '!bg-[#E7F1FF] !text-[#334EAC]' : '!bg-[#FFF7E0] !text-[#B7791F]'}">${esc(order.status)}</span></td>
                  <td class="font-extrabold text-xs">${fmt(order.total || 0)}</td>
                  <td class="text-xs text-[#475569]">${esc(order.location)}</td>
                  <td><div class="flex justify-end gap-2"><button class="btn btn-ghost !py-1.5 !px-2 !text-[10px]" data-action="admin-order-action" data-id="${order.id}" data-status="Processing">Process</button></div></td>
                </tr>
              `).join('') || '<tr><td colspan="7" class="text-center text-sm text-[#708BD1] py-5">No orders found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'payments') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
          <h3 class="font-display font-bold text-xl">Payments & payouts</h3>
          <span class="badge !bg-[#E6F7EC] !text-[#1F9D55]">${transactions.filter(t => t.status === 'Successful').length} successful</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[840px]">
            <thead><tr><th>Transaction</th><th>Buyer</th><th>Seller</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              ${transactions.map(tx => `
                <tr>
                  <td class="font-tech text-xs font-bold text-[#334EAC]">${esc(tx.id)}</td>
                  <td class="text-xs text-[#475569]">${esc(tx.buyer)}</td>
                  <td class="text-xs text-[#475569]">${esc(tx.seller)}</td>
                  <td class="font-extrabold text-xs">${fmt(tx.amount || 0)}</td>
                  <td><span class="badge ${tx.status === 'Successful' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : '!bg-[#FEF3F2] !text-[#B42318]'}">${esc(tx.status)}</span></td>
                  <td class="text-xs text-[#475569]">${esc(tx.date)}</td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No transactions found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'reports') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
          <h3 class="font-display font-bold text-xl">Marketplace reports</h3>
          <span class="badge !bg-[#FEF3F2] !text-[#B42318]">${reports.length} active</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[760px]">
            <thead><tr><th>ID</th><th>Type</th><th>Subject</th><th>Status</th><th>Severity</th><th>Date</th></tr></thead>
            <tbody>
              ${reports.map(r => `
                <tr>
                  <td class="font-tech text-xs font-bold text-[#334EAC]">${esc(r.id)}</td>
                  <td class="text-xs font-bold text-[#708BD1]">${esc(r.type)}</td>
                  <td class="text-xs text-[#475569]">${esc(r.subject)}</td>
                  <td><span class="badge ${r.status === 'Resolved' ? '!bg-[#E6F7EC] !text-[#1F9D55]' : '!bg-[#FFF7E0] !text-[#B7791F]'}">${esc(r.status)}</span></td>
                  <td class="text-xs font-bold ${r.severity === 'High' ? 'text-[#B42318]' : 'text-[#B7791F]'}">${esc(r.severity)}</td>
                  <td class="text-xs text-[#475569]">${esc(r.date)}</td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No reports found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'support') {
    body = `
      <div class="card overflow-hidden reveal">
        <div class="p-5 border-b border-[#E7F1FF] flex items-center justify-between">
          <h3 class="font-display font-bold text-xl">Support center</h3>
          <span class="badge !bg-[#E7F1FF] !text-[#334EAC]">${tickets.length} tickets</span>
        </div>
        <div class="overflow-x-auto">
          <table class="tbl w-full min-w-[820px]">
            <thead><tr><th>ID</th><th>Customer</th><th>Category</th><th>Priority</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              ${tickets.map(ticket => `
                <tr>
                  <td class="font-tech text-xs font-bold text-[#334EAC]">${esc(ticket.id)}</td>
                  <td class="text-xs text-[#475569]">${esc(ticket.customer)}</td>
                  <td class="text-xs font-bold text-[#708BD1]">${esc(ticket.category)}</td>
                  <td><span class="badge ${ticket.priority === 'High' ? '!bg-[#FEF3F2] !text-[#B42318]' : '!bg-[#FFF7E0] !text-[#B7791F]'}">${esc(ticket.priority)}</span></td>
                  <td><span class="badge ${ticket.status === 'Open' ? '!bg-[#E7F1FF] !text-[#334EAC]' : '!bg-[#E6F7EC] !text-[#1F9D55]'}">${esc(ticket.status)}</span></td>
                  <td class="text-xs text-[#475569]">${esc(ticket.date)}</td>
                </tr>
              `).join('') || '<tr><td colspan="6" class="text-center text-sm text-[#708BD1] py-5">No support tickets found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  if(adminView === 'settings') {
    const settings = LS.get('marketplaceSettings', { marketplaceName:'ANILyfe', commission:15, maintenanceMode:false });
    body = `
      <div class="grid lg:grid-cols-2 gap-5">
        <div class="card p-5 reveal">
          <h3 class="font-display font-bold text-xl mb-4">Marketplace settings</h3>
          <div class="space-y-4">
            <div><label class="lbl">Marketplace name</label><input class="inp" id="admin-market-name" value="${esc(settings.marketplaceName || 'ANILyfe')}" /></div>
            <div><label class="lbl">Support email</label><input class="inp" id="admin-market-email" value="${esc(settings.supportEmail || 'support@anilyfe.com')}" /></div>
            <div><label class="lbl">Commission (%)</label><input class="inp" id="admin-market-commission" type="number" min="0" max="100" value="${settings.commission || 15}" /></div>
          </div>
          <div class="mt-5 flex justify-end">
            <button class="btn btn-primary" data-action="admin-save-settings">Save settings</button>
          </div>
        </div>

        <div class="card p-5 reveal">
          <h3 class="font-display font-bold text-xl mb-4">System toggles</h3>
          <div class="space-y-3">
            ${[
              ['Seller registration', 'sellerRegistrationEnabled', settings.sellerRegistrationEnabled !== false],
              ['Review system', 'reviewSystemEnabled', settings.reviewSystemEnabled !== false],
              ['Maintenance mode', 'maintenanceMode', !!settings.maintenanceMode]
            ].map(([label, key, enabled]) => `
              <div class="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E7F1FF] px-3 py-2.5">
                <span class="text-sm font-bold text-[#475569]">${label}</span>
                <button class="btn btn-ghost !py-1.5 !px-2 !text-[10px] ${enabled ? '!bg-[#E6F7EC] !text-[#1F9D55]' : '!bg-[#FEF3F2] !text-[#B42318]'}" data-action="admin-setting-toggle" data-key="${key}" data-enabled="${enabled}">${enabled ? 'Enabled' : 'Disabled'}</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="min-h-screen bg-[#F6FCFF] flex">
      <aside class="hidden md:flex flex-col w-72 shrink-0 bg-[#081F5C] text-white p-5 sticky top-0 h-screen">
        ${LOGO_D('text-2xl')}
        <div class="mt-2 mb-6 font-tech text-[9px] tracking-[.3em] text-[#708BD1] font-bold">ADMIN</div>
        <nav class="space-y-1.5 flex-1">
          ${nav.map(n => `
            <button class="side-item w-full !text-[#C9D9F5] hover:!bg-white/10 ${selected.k === n.k ? '!bg-white/15 !text-white' : ''}" data-action="admin-view" data-view="${n.k}">
              <i data-lucide="${n.i}" style="width:17px;height:17px"></i> ${n.l}
              ${n.badge ? `<span class="ml-auto min-w-5 h-5 px-1 rounded-full bg-[#E9B949] text-[#081F5C] text-[10px] font-extrabold flex items-center justify-center">${n.badge}</span>` : ''}
            </button>
          `).join('')}
        </nav>
        <div class="pt-5 border-t border-white/10">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-sm">${esc(a.username[0].toUpperCase())}</span>
            <div>
              <div class="text-xs font-extrabold">${esc(a.username)}</div>
              <div class="text-[10px] text-[#708BD1] font-bold">${esc(a.role || 'Supervisor')}</div>
            </div>
          </div>
          <button class="side-item w-full !text-[#FFB4A8] hover:!bg-[#B42318]/30" data-action="exit-admin"><i data-lucide="door-open" style="width:17px;height:17px"></i> Exit Admin</button>
        </div>
      </aside>

      <div class="flex-1 min-w-0">
        <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#D0E3FF] px-5 py-3.5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <span class="md:hidden">${LOGO_D('text-lg')}</span>
            <h2 class="font-display font-bold text-lg capitalize hidden md:block">${selected.l}</h2>
          </div>
          <div class="flex items-center gap-3 w-full max-w-xl justify-end">
            <input class="inp !py-2 !text-xs !w-full max-w-xs" data-admin-search placeholder="Search users, sellers, products..." value="${esc(adminSearch)}" />
            <select class="inp !w-auto !py-2 !text-xs md:hidden" data-action="admin-view-sel">
              ${nav.map(n => `<option value="${n.k}" ${selected.k === n.k ? 'selected' : ''}>${n.l}</option>`).join('')}
            </select>
          </div>
        </header>
        <main class="p-5 md:p-8">${body}</main>
      </div>
    </div>
  `;
}

function adminSetSettingsFromForm(){
  const settings = LS.get('marketplaceSettings', {});
  const name = document.getElementById('admin-market-name')?.value || settings.marketplaceName || 'ANILyfe';
  const email = document.getElementById('admin-market-email')?.value || settings.supportEmail || 'support@anilyfe.com';
  const commission = Number(document.getElementById('admin-market-commission')?.value || settings.commission || 15);
  LS.set('marketplaceSettings', {
    ...settings,
    marketplaceName: name,
    supportEmail: email,
    commission: Math.max(0, Math.min(100, commission))
  });
  toast('Marketplace settings updated.', 'badge-check');
  route();
}

function adminToggleSetting(key, enabled){
  const settings = LS.get('marketplaceSettings', {});
  settings[key] = !enabled;
  LS.set('marketplaceSettings', settings);
  toast(`${key.replace(/([A-Z])/g, ' $1')} ${settings[key] ? 'enabled' : 'disabled'}.`, 'toggle-left');
  route();
}

function adminUpdateUserStatus(id, status){
  const users = LS.get('users', []);
  const user = users.find(u => u.id === id);
  if(user){
    user.status = status;
    LS.set('users', users);
    toast(`User status updated to ${status}.`, 'user-check');
    route();
  }
}

function adminUpdateSellerStatus(id, status){
  const sellers = LS.get('sellers', []);
  const seller = sellers.find(s => s.id === id);
  if(seller){
    seller.status = status;
    LS.set('sellers', sellers);
    toast(`Seller status updated to ${status}.`, 'store');
    route();
  }
}

function adminUpdateProductStatus(id, status){
  const products = LS.get('products', []);
  const product = products.find(p => p.id === id);
  if(product){
    product.status = status;
    LS.set('products', products);
    toast(`Product marked as ${status}.`, 'package-check');
    route();
  }
}

function adminUpdateOrderStatus(id, status){
  const orders = LS.get('orders', []);
  const order = orders.find(o => o.id === id);
  if(order){
    order.status = status;
    LS.set('orders', orders);
    toast(`Order ${id} updated to ${status}.`, 'shopping-bag');
    route();
  }
}

function adminApproveSeller(id){ adminUpdateSellerStatus(id, 'approved'); }
function adminRemoveSeller(id){ adminUpdateSellerStatus(id, 'removed'); }
function adminRestoreSeller(id){ adminUpdateSellerStatus(id, 'pending'); }
function adminExit(){
  LS.del('adminSession');
  toast('Exited admin panel.', 'door-open');
  location.hash = '#/';
}

function adminLogin(formEl){
  const f = new FormData(formEl);
  const a = LS.get('admins', []).find(x => x.username === (f.get('username') || '').trim() && x.password === (f.get('password') || ''));
  if(!a){ toast('Invalid administrator credentials.', 'shield-alert'); return; }
  LS.set('adminSession', a.id);
  toast('Administrator access granted.', 'shield-check');
  location.hash = '#/admin-dashboard';
}

function adminRegister(formEl){
  const f = new FormData(formEl), admins = LS.get('admins', []);
  const un = (f.get('username') || '').trim();
  if(admins.find(x => x.username === un)){ toast('Username already taken.', 'alert-triangle'); return; }
  admins.push({id: uid('ADM'), username: un, password: f.get('password'), createdAt: Date.now(), role: 'Admin'});
  LS.set('admins', admins);
  LS.set('adminSession', admins[admins.length - 1].id);
  toast('Administrator identity created.', 'user-plus');
  location.hash = '#/admin-dashboard';
}
