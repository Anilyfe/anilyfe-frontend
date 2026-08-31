/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Sign in / create account view + modal. */

let authMode = 'create'; // create | login
function viewAuth(){
  const creating = authMode==='create';
  return `
  <div class="min-h-screen auth-ambient relative overflow-hidden">
    ${sparks(16,2)}
    <header class="relative z-10 max-w-7xl mx-auto px-5 py-5 flex items-center justify-between gap-3">
      ${LOGO('text-2xl')}
      <div class="flex items-center gap-3">
        ${regionSelect('!w-44')}
        <span class="hidden sm:inline-flex glass rounded-full px-4 py-2 text-[10px] font-extrabold tracking-[.2em] text-[#334EAC]">MARKETPLACE GATEWAY</span>
      </div>
    </header>

    <main class="relative z-10 max-w-7xl mx-auto px-5 pt-10 md:pt-20 pb-24">
      <div class="max-w-2xl">
        <div class="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-bold text-[#334EAC] mb-6 reveal"><i data-lucide="sparkle" style="width:14px;height:14px"></i> An anime marketplace, made personal</div>
        <h1 class="font-display font-extrabold text-[#081F5C] text-5xl md:text-6xl leading-[1.05] reveal">Choose your <span class="text-[#334EAC]">Anilyfe</span> path.</h1>
        <p class="mt-5 text-[#3d4d80] text-base md:text-lg leading-relaxed reveal">
          ${creating ? 'Start with the account that fits your role. Seller access is activated only after administrator approval.' : 'Welcome back. Sign in to your buyer account or seller identity to continue.'}
        </p>
        <div class="mt-7 flex items-center gap-3 reveal">
          <button class="btn ${creating?'btn-primary':'btn-ghost'} !py-2.5" data-action="auth-mode" data-mode="create">Create account <i data-lucide="arrow-right" style="width:15px;height:15px"></i></button>
          <button class="btn ${!creating?'btn-primary':'btn-ghost'} !py-2.5" data-action="auth-mode" data-mode="login">Log in</button>
        </div>
        <div class="mt-5 flex items-center gap-2 text-xs text-[#5a6a9c] font-semibold reveal"><i data-lucide="shield-check" style="width:15px;height:15px;color:#334EAC"></i> No public administrator escalation. The primary administrator controls approvals.</div>
      </div>

      <div class="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl">
        <!-- 01 Buyer -->
        <div class="glass rounded-2xl p-7 flex flex-col reveal group hover:-translate-y-1.5 transition duration-300">
          <div class="flex items-start justify-between">
            <span class="w-11 h-11 rounded-xl bg-[#E7F1FF] border border-[#D0E3FF] flex items-center justify-center group-hover:bg-[#334EAC] transition"><i data-lucide="user-round" style="width:20px;height:20px;color:#334EAC" class="group-hover:!text-white"></i></span>
            <span class="font-tech text-xs font-bold text-[#708BD1]">01</span>
          </div>
          <h3 class="font-display font-bold text-2xl text-[#081F5C] mt-5">Buyer</h3>
          <p class="text-sm text-[#4a5a8c] mt-2 leading-relaxed flex-1">Discover approved products, save favourites, prepare a cart, and contact sellers.</p>
          <button class="btn btn-primary w-full mt-6" data-action="auth-open" data-mode="${authMode}" data-role="buyer">${creating?'Create buyer account':'Buyer log in'}</button>
          <button class="mt-3 text-xs font-bold text-[#334EAC] hover:underline" data-action="auth-switch" data-mode="${creating?'login':'create'}" data-role="buyer">${creating?'Already buying? Buyer log in':'New here? Create buyer account'}</button>
        </div>
        <!-- 02 Seller -->
        <div class="glass rounded-2xl p-7 flex flex-col reveal group hover:-translate-y-1.5 transition duration-300">
          <div class="flex items-start justify-between">
            <span class="w-11 h-11 rounded-xl bg-[#E7F1FF] border border-[#D0E3FF] flex items-center justify-center group-hover:bg-[#334EAC] transition"><i data-lucide="store" style="width:20px;height:20px;color:#334EAC" class="group-hover:!text-white"></i></span>
            <span class="font-tech text-xs font-bold text-[#708BD1]">02</span>
          </div>
          <h3 class="font-display font-bold text-2xl text-[#081F5C] mt-5">Seller</h3>
          <p class="text-sm text-[#4a5a8c] mt-2 leading-relaxed flex-1">Create an identity, apply for a shop, then add listings, prices and stock after approval.</p>
          <button class="btn btn-primary w-full mt-6" data-action="auth-open" data-mode="${authMode}" data-role="seller">${creating?'Create seller identity':'Seller log in'}</button>
          <button class="mt-3 text-xs font-bold text-[#334EAC] hover:underline" data-action="auth-switch" data-mode="${creating?'login':'create'}" data-role="seller">${creating?'Already selling? Seller log in':'New here? Create seller identity'}</button>
        </div>
      </div>

      <p class="mt-10 text-xs text-[#5a6a9c] font-semibold">Buying in <b>${region().name}</b> — prices display in <b>${region().symbol.trim()}</b>. Change region any time from the top bar.</p>
    </main>
  </div>`;
}

/* ---------- auth modal ---------- */
function openAuthModal(mode, role){
  const creating = mode==='create';
  const root = document.getElementById('modal-root');
  root.innerHTML = `
  <div class="modal-back" data-action="close-modal-bg">
    <div class="modal-card glass rounded-3xl w-full max-w-md p-8 relative" onclick="event.stopPropagation()">
      <button class="absolute top-4 right-4 icon-btn !w-9 !h-9" data-action="close-modal"><i data-lucide="x" style="width:17px;height:17px"></i></button>
      <div class="flex items-center gap-3 mb-1">
        <span class="w-10 h-10 rounded-xl bg-[#334EAC] flex items-center justify-center"><i data-lucide="${role==='seller'?'store':'user-round'}" style="width:18px;height:18px;color:#fff"></i></span>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] text-[#708BD1]">${creating?'CREATE ACCOUNT':'LOG IN'} · ${region().flag}</div>
          <h3 class="font-display font-bold text-xl text-[#081F5C]">${role==='seller'?'Seller identity':'Buyer account'}</h3>
        </div>
      </div>
      <p class="text-xs text-[#5a6a9c] mb-5">${creating ? (role==='seller'?'Your shop goes to Pending Approval after signup.':'Start browsing and saving favourites instantly.') : 'Enter your credentials to continue.'}</p>
      <form id="authForm" class="space-y-4">
        ${creating?`<div><label class="lbl">Full name</label><input class="inp" name="name" required placeholder="e.g. Ada Okafor"/></div>`:''}
        <div><label class="lbl">Email</label><input class="inp" type="email" name="email" required placeholder="you@anilyfe.com"/></div>
        <div><label class="lbl">Password</label><input class="inp" type="password" name="password" required minlength="6" placeholder="Minimum 6 characters"/></div>
        ${creating&&role==='seller'?`
          <div><label class="lbl">Business name</label><input class="inp" name="business" required placeholder="e.g. Chibi Corner"/></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="lbl">What you sell</label><input class="inp" name="sells" required placeholder="Figures, hoodies…"/></div>
            <div><label class="lbl">Starting price</label><input class="inp" type="number" name="price" required min="1" placeholder="₦"/></div>
          </div>`:''}
        <button class="btn btn-primary w-full !py-3" type="submit">${creating?'Create '+(role==='seller'?'seller identity':'buyer account'):'Log in'} <i data-lucide="arrow-right" style="width:16px;height:16px"></i></button>
      </form>
    </div>
  </div>`;
  lucide.createIcons();
  document.getElementById('authForm').addEventListener('submit', e=>{
    e.preventDefault();
    const f = new FormData(e.target);
    const email = (f.get('email')||'').trim().toLowerCase();
    const pass = f.get('password')||'';
    const users = LS.get('users',[]);
    if(creating){
      if(users.find(u=>u.email===email)){ toast('An account with this email already exists.','alert-triangle'); return; }
      const u = {id:uid('USR'), name:(f.get('name')||'').trim(), email, password:pass, role, region:region().code, createdAt:Date.now()};
      users.push(u); LS.set('users',users); LS.set('session',u.id);
      if(role==='seller'){
        const sellers = LS.get('sellers',[]);
        sellers.push({id:uid('SLR'), userId:u.id, businessName:(f.get('business')||'').trim(), sells:(f.get('sells')||'').trim(), startingPrice:Number(f.get('price'))||0, status:'pending', rating:0, sales:0, createdAt:Date.now()});
        LS.set('sellers',sellers);
      }
      closeModal();
      toast(`Welcome to Anilyfe, ${esc(u.name.split(' ')[0])}! 🎉`,'party-popper');
      location.hash = role==='seller' ? '#/seller' : '#/marketplace';
    } else {
      const u = users.find(x=>x.email===email && x.password===pass);
      if(!u){ toast('Invalid email or password.','lock-keyhole'); return; }
      if(role==='seller' && !sellerOf(u.id)){ toast('No seller identity found for this account. Sign up as a seller or apply from your profile.','store'); return; }
      LS.set('session',u.id);
      closeModal();
      toast(`Welcome back, ${esc(u.name.split(' ')[0])}.`,'hand');
      location.hash = (role==='seller') ? '#/seller' : '#/marketplace';
    }
  });
}
function closeModal(){ document.getElementById('modal-root').innerHTML=''; }
