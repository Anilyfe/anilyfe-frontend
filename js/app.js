/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Core storage, session and small shared UI helpers used across every page. */

const LS = {
  get(k, d){ try{ const v = JSON.parse(localStorage.getItem('anilyfe_'+k)); return v===null||v===undefined? d : v; }catch(e){ return d; } },
  set(k, v){ localStorage.setItem('anilyfe_'+k, JSON.stringify(v)); },
  del(k){ localStorage.removeItem('anilyfe_'+k); }
};
const uid = p => (p||'ID') + '-' + Math.random().toString(36).slice(2,6).toUpperCase() + Date.now().toString(36).slice(-3).toUpperCase();
const esc = s => String(s??'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));


const currentUser  = () => { const id = LS.get('session',null); return LS.get('users',[]).find(u=>u.id===id) || null; };
const currentAdmin = () => { const id = LS.get('adminSession',null); return LS.get('admins',[]).find(a=>a.id===id) || null; };
const sellerOf = userId => LS.get('sellers',[]).find(s=>s.userId===userId) || null;
const approvedProducts = () => { const ok = LS.get('sellers',[]).filter(s=>s.status==='approved').map(s=>s.id); return LS.get('products',[]).filter(p=>ok.includes(p.sellerId)); };


function kunaiSVG(dark){
  return `<svg class="kunai" viewBox="0 0 22 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="kg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FCE9A8"/><stop offset=".45" stop-color="#E9B949"/><stop offset="1" stop-color="#9A6A0B"/></linearGradient></defs>
    <circle cx="11" cy="5.5" r="3.6" stroke="url(#kg)" stroke-width="2.6"/>
    <rect x="8.4" y="10" width="5.2" height="13" rx="1.4" fill="url(#kg)"/>
    <path d="M8.4 13h5.2M8.4 16.2h5.2M8.4 19.4h5.2" stroke="#8A5E07" stroke-width="1"/>
    <rect x="7" y="23" width="8" height="3" rx="1.2" fill="url(#kg)"/>
    <path d="M11 51 L5.6 31 Q11 27.4 16.4 31 Z" fill="url(#kg)"/>
    <path d="M11 49 L11 29.4" stroke="#8A5E07" stroke-width=".9"/>
  </svg>`;
}
function wordmark(cls, onDark){
  return `<span class="logo ${cls||''}"><span class="la">A</span><span class="ls ${onDark?'on-dark':''}">N</span>${kunaiSVG(onDark)}<span class="ls ${onDark?'on-dark':''}">LYFE</span></span>`;
}
/* Uses logo.png if present in root, otherwise the drawn wordmark */
function logoLink(href, onDark, size){
  const s = size||'text-2xl';
  return `<a href="${href}" class="inline-block ${s}" aria-label="Anilyfe home">
    <img src="logo.png" alt="Anilyfe" class="h-[1.15em] w-auto" onerror="this.outerHTML=window.__wm(this.dataset.od==='1',this.dataset.sz)" data-od="${onDark?'1':'0'}" data-sz="${s}">
  </a>`;
}
window.__wm = (od) => wordmark('', od);
/* simpler guaranteed version used directly in templates */
const LOGO  = (s) => `<a href="#/" class="${s||'text-2xl'} inline-block align-middle">${wordmark()}</a>`;
const LOGO_D = (s) => `<a href="#/" class="${s||'text-2xl'} inline-block align-middle">${wordmark('',true)}</a>`;

function siteFooter(extraClass=''){
  const dark = (extraClass || '').includes('text-white');
  const links = [
    {label:'Help Center', href:'#/help'},
    {label:'FAQ', href:'#/help'},
    {label:'Shipping', href:'#/help'},
    {label:'Returns', href:'#/help'},
    {label:'Payments', href:'#/help'},
    {label:'Contact', href:'#/help'},
    {label:'Privacy', href:'#/help'},
    {label:'Terms', href:'#/help'}
  ];
  const textColor = dark ? '#fff' : 'inherit';
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : '#D0E3FF';
  return `
  <footer class="${extraClass || 'border-t border-[rgba(208,227,255,.12)] py-8 bg-white/60 backdrop-blur-sm'}" style="color:${textColor};">
    <div class="max-w-7xl mx-auto px-5">
      <div class="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] py-8">
        <div>
          ${LOGO('text-2xl')}
          <p class="mt-4 text-sm max-w-xs leading-relaxed" style="color:${textColor}; opacity:${dark ? '.88' : '.82'};">ANILyfe is the anime marketplace for premium figures, manga, apparel, collectibles and trusted seller experiences across Nigeria.</p>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">SHOP</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Marketplace</a></li>
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Featured deals</a></li>
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Best sellers</a></li>
            <li><a href="#/auth" class="hover:opacity-100" style="color:${textColor};">Become a seller</a></li>
          </ul>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">HELP</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            ${links.slice(0,6).map(l=>`<li><a href="${l.href}" class="hover:opacity-100" style="color:${textColor};">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">SUPPORT</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            <li><span class="font-semibold" style="color:${textColor};">Email:</span> support@anilyfe.com</li>
            <li><span class="font-semibold" style="color:${textColor};">Phone:</span> +234 (0) 800 ANILYFE</li>
            <li><span class="font-semibold" style="color:${textColor};">Hours:</span> Mon–Sat, 8am–8pm</li>
            <li><a href="#/help" class="font-bold hover:underline" style="color:${textColor};">Need help? Visit Help Center</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold" style="border-color:${borderColor}; color:${textColor}; opacity:${dark ? '1' : '.9'};">
        <span>© ${new Date().getFullYear()} Anilyfe · The anime marketplace, made personal.</span>
        <div class="flex flex-wrap justify-center gap-4">
          ${links.map((link, idx)=>`<a href="${link.href}" class="${idx>=2?'hidden sm:inline':''}" style="color:${textColor};">${link.label}</a>`).join('')}
        </div>
      </div>
    </div>
  </footer>`;
}

function viewInfoPage({eyebrow, title, subtitle, cards = [], faq = [], ctaLabel='Browse marketplace', ctaLink='#/marketplace', contact = false}){
  const rows = cards.length ? `
    <div class="mt-8 grid lg:grid-cols-3 gap-6">
      ${cards.map(card => `
        <div class="card p-6 reveal">
          <div class="font-display font-bold text-xl mb-4">${card.title}</div>
          <ul class="space-y-3 text-sm text-[#4a5a8c]">
            ${card.items.map(item => `<li>• ${item}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>` : '';

  const faqSection = faq.length ? `
    <div class="mt-10 card p-6 reveal">
      <div class="font-display font-bold text-2xl mb-6">FAQ</div>
      <div class="space-y-5">
        ${faq.map(item => `
          <div class="border-b border-[#D0E3FF] pb-4 last:border-b-0 last:pb-0">
            <div class="font-bold text-[#081F5C]">${item.q}</div>
            <p class="mt-2 text-sm text-[#4a5a8c] leading-relaxed">${item.a}</p>
          </div>
        `).join('')}
      </div>
    </div>` : '';

  const supportCard = contact ? `
    <div class="mt-10 card p-6 md:p-8 reveal">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1]">SUPPORT</div>
          <h2 class="font-display font-extrabold text-2xl text-[#081F5C] mt-3">Need a direct hand?</h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="#/contact" class="btn btn-primary text-xs">Contact support</a>
          <a href="#/marketplace" class="btn btn-ghost text-xs">Back to marketplace</a>
        </div>
      </div>
    </div>` : `
    <div class="mt-10 card p-6 md:p-8 reveal">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1]">ANILYFE</div>
          <h2 class="font-display font-extrabold text-2xl text-[#081F5C] mt-3">Still need help?</h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="#/contact" class="btn btn-primary text-xs">Contact us</a>
          <a href="${ctaLink}" class="btn btn-ghost text-xs">${ctaLabel}</a>
        </div>
      </div>
    </div>`;

  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between gap-3">
      ${LOGO('text-2xl')}
      <div class="flex items-center gap-3">
        <a href="#/marketplace" class="btn btn-ghost text-xs">Marketplace</a>
        <a href="#/auth" class="btn btn-primary text-xs">Sign in</a>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <div class="card p-8 md:p-10 reveal">
        <div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1] mb-3">${eyebrow}</div>
        <h1 class="font-display font-extrabold text-4xl text-[#081F5C]">${title}</h1>
        <p class="mt-3 text-[#4a5a8c] max-w-2xl">${subtitle}</p>
      </div>
      ${rows}
      ${faqSection}
      ${supportCard}
    </main>
    ${siteFooter('border-t border-[#D0E3FF] bg-white mt-8')}
  </div>`;
}

function viewHelp(){
  const faqs = [
    {q:'How do I buy safely on ANILyfe?', a:'All purchases are handled through the marketplace checkout flow, with seller verification and buyer protection designed for secure transactions.'},
    {q:'How long does shipping take?', a:'Delivery times vary by seller and location, but most products are dispatched within 2–5 business days.'},
    {q:'Can I return an item?', a:'Yes. Eligible returns are managed through the buyer order and returns workflow, with refund status tracked in the account area.'},
    {q:'Is seller approval required?', a:'Yes. Sellers must complete registration and pass administrator review before they can publish products.'},
    {q:'What payment methods are supported?', a:'V1 supports Nigeria with NGN and Paystack-ready checkout flow. The architecture is ready for provider expansion later.'}
  ];

  return viewInfoPage({
    eyebrow:'HELP CENTER',
    title:'How can we help?',
    subtitle:'Browse common marketplace questions, shipping guidance, returns and seller support topics below.',
    cards:[
      {title:'Marketplace basics', items:['Find products by category, seller, and location','Compare prices and stock before checkout','Save products to your wishlist','Track orders and refunds in your account']},
      {title:'Buyers', items:['Secure checkout with Paystack-ready flow','Local and nationwide delivery options','Seller verification and ratings','Returns and refund management']},
      {title:'Sellers', items:['Apply through seller registration','Create products with variants and inventory','Manage orders, payouts and listings','Review product moderation and approvals']}
    ],
    faq:faqs,
    contact:true
  });
}

function viewFaq(){
  return viewInfoPage({
    eyebrow:'FAQ',
    title:'Frequently asked questions',
    subtitle:'Everything buyers and sellers need to know before they buy, sell, ship, or request support on ANILyfe.',
    faq:[
      {q:'How do I place an order?', a:'Add products to your cart, confirm the seller, shipping option and delivery address, then continue to checkout and complete payment.'},
      {q:'Are sellers verified?', a:'Verified status is granted after registration and review. Buyer protection is built around trusted seller verification and delivery tracking.'},
      {q:'Do you support local pickup?', a:'Yes. Some sellers offer pickup and local delivery depending on their dispatch location and product availability.'},
      {q:'Can I check stock before buying?', a:'Yes. Product pages display stock status, color and size availability, and seller inventory information.'},
      {q:'What happens if my order is delayed?', a:'You can monitor the order status from your account. If your order is delayed beyond the expected window, you can request support through the contact center.'}
    ],
    ctaLabel:'Go shopping',
    ctaLink:'#/marketplace'
  });
}

function viewShipping(){
  return viewInfoPage({
    eyebrow:'SHIPPING',
    title:'Shipping, delivery and dispatch',
    subtitle:'ANILyfe supports local delivery, nationwide shipping, and pickup where available. Seller-defined fees, stock, and shipping methods vary by storefront.',
    cards:[
      {title:'Delivery options', items:['Local delivery in seller state','Nationwide delivery across Nigeria','Pickup from approved seller locations']},
      {title:'What to expect', items:['Delivery times vary by seller and dispatch area','Tracking details are shared once the order ships','Free shipping may apply to selected products']},
      {title:'Seller rules', items:['Sellers set their shipping fees and processing time','Products are only shipped when stock is confirmed','All shipping is subject to final backend validation']}
    ],
    faq:[
      {q:'Can I choose my delivery method?', a:'Yes. During checkout you can usually choose between local delivery, nationwide shipping, or pickup if a seller offers those options.'},
      {q:'Who pays for shipping?', a:'Shipping fees are set by sellers unless a promotion or marketplace offer applies. Rates are shown at checkout before payment.'}
    ]
  });
}

function viewReturns(){
  return viewInfoPage({
    eyebrow:'RETURNS',
    title:'Returns and refunds',
    subtitle:'We make returns simple for marketplace orders. Buyers can request a return, track the decision, and follow the refund progress from their account.',
    cards:[
      {title:'Return steps', items:['Submit a return request from your order page','Select a reason and upload any needed details','Wait for seller or admin review']},
      {title:'Resolution', items:['Approved returns are sent back to the seller','Refunds are tracked in the buyer account','Marketplace commission and balances are updated after settlement']},
      {title:'Eligibility', items:['Returns depend on product condition and delivery status','Some items may be non-returnable by seller policy','The account tracks the final decision']}
    ],
    faq:[
      {q:'How long do I have to request a return?', a:'Return windows vary by seller and product, but the typical marketplace flow gives buyers a clear timeline once the order is delivered.'},
      {q:'When do refunds reflect?', a:'Refund timing depends on seller review, payment status, and the final marketplace reconciliation process.'}
    ]
  });
}

function viewPrivacy(){
  return viewInfoPage({
    eyebrow:'PRIVACY',
    title:'Privacy policy',
    subtitle:'ANILyfe protects buyer, seller and admin information. Marketplace account data, payment data and documents are handled according to secure marketplace standards.',
    cards:[
      {title:'What we collect', items:['Profile details and delivery addresses','Order and payment information','Seller verification details for approval workflows']},
      {title:'How we use it', items:['Improve marketplace security and buyer experience','Support delivery, verification and order tracking','Maintain account and seller management tools']},
      {title:'Protection', items:['Sensitive payment data stays on the backend','Role-based access is enforced for seller and admin flows','Data is never shared publicly without consent']}
    ],
    faq:[
      {q:'Do you share seller data publicly?', a:'Seller data is shown only where needed for storefront and shipping details, not private verification records.'},
      {q:'Is payment data stored in the frontend?', a:'No. Financial and payment secrets are kept server-side only in the proper architecture.'}
    ]
  });
}

function viewTerms(){
  return viewInfoPage({
    eyebrow:'TERMS',
    title:'Marketplace terms and conditions',
    subtitle:'By using ANILyfe, you agree to responsible buying, safe selling, timely payments, secure transactions, and marketplace rules for all product and order activity.',
    cards:[
      {title:'For buyers', items:['Purchase only approved listings','Review seller information, stock and delivery options','Report suspicious activity or unsafe products']},
      {title:'For sellers', items:['Provide accurate product details and pricing','Maintain stock and dispatch information','Follow verification and moderation guidelines']},
      {title:'Marketplace rules', items:['Orders and financial actions are subject to platform review','Misuse of the marketplace may trigger account restrictions','Admin moderation decisions are final for policy enforcement']}
    ],
    faq:[
      {q:'Who moderates listings?', a:'Seller products move through a submission and moderation workflow, with admin review supporting approved or rejected outcomes.'},
      {q:'Can a seller be blocked?', a:'Yes. Sellers may be suspended or rejected if they violate marketplace rules, policy, or verification requirements.'}
    ]
  });
}

function viewContact(){
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between gap-3">
      ${LOGO('text-2xl')}
      <div class="flex items-center gap-3">
        <a href="#/help" class="btn btn-ghost text-xs">Help center</a>
        <a href="#/marketplace" class="btn btn-primary text-xs">Shop now</a>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <div class="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
        <div class="card p-8 reveal">
          <div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1] mb-3">CONTACT</div>
          <h1 class="font-display font-extrabold text-4xl text-[#081F5C]">Talk to ANILyfe support</h1>
          <p class="mt-3 text-[#4a5a8c] leading-relaxed">Need help with an order, seller issue, refund, payment, or account problem? Reach out and we’ll guide you.</p>
          <div class="mt-8 space-y-4 text-sm text-[#4a5a8c]">
            <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-[#E7F1FF] flex items-center justify-center"><i data-lucide="mail" style="width:16px;height:16px;color:#334EAC"></i></span><div><div class="font-bold text-[#081F5C]">Email</div><div>support@anilyfe.com</div></div></div>
            <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-[#E7F1FF] flex items-center justify-center"><i data-lucide="phone" style="width:16px;height:16px;color:#334EAC"></i></span><div><div class="font-bold text-[#081F5C]">Phone</div><div>+234 (0) 800 ANILYFE</div></div></div>
            <div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-[#E7F1FF] flex items-center justify-center"><i data-lucide="clock-3" style="width:16px;height:16px;color:#334EAC"></i></span><div><div class="font-bold text-[#081F5C]">Hours</div><div>Mon–Sat · 8:00am–8:00pm</div></div></div>
          </div>
        </div>
        <div class="card p-8 reveal">
          <form onsubmit="event.preventDefault(); toast('Your support request has been noted. We will follow up shortly.','mail');">
            <div class="grid sm:grid-cols-2 gap-4">
              <div>
                <label class="lbl">Full name</label>
                <input class="inp" placeholder="Your full name" required>
              </div>
              <div>
                <label class="lbl">Email</label>
                <input class="inp" type="email" placeholder="you@anilyfe.com" required>
              </div>
            </div>
            <div class="mt-4">
              <label class="lbl">Topic</label>
              <select class="inp">
                <option>Order issue</option>
                <option>Seller issue</option>
                <option>Payment concern</option>
                <option>Return or refund</option>
                <option>Account issue</option>
                <option>Other</option>
              </select>
            </div>
            <div class="mt-4">
              <label class="lbl">Message</label>
              <textarea class="inp min-h-[140px]" placeholder="Tell us what you need help with…" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary w-full mt-5">Send request</button>
          </form>
        </div>
      </div>
    </main>
    ${siteFooter('border-t border-[#D0E3FF] bg-white mt-8')}
  </div>`;
}

function siteFooter(extraClass=''){
  const dark = (extraClass || '').includes('text-white');
  const links = [
    {label:'Help Center', href:'#/help'},
    {label:'FAQ', href:'#/faq'},
    {label:'Shipping', href:'#/shipping'},
    {label:'Returns', href:'#/returns'},
    {label:'Payments', href:'#/help'},
    {label:'Contact', href:'#/contact'},
    {label:'Privacy', href:'#/privacy'},
    {label:'Terms', href:'#/terms'}
  ];
  const textColor = dark ? '#fff' : 'inherit';
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : '#D0E3FF';
  return `
  <footer class="${extraClass || 'border-t border-[rgba(208,227,255,.12)] py-8 bg-white/60 backdrop-blur-sm'}" style="color:${textColor};">
    <div class="max-w-7xl mx-auto px-5">
      <div class="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 md:p-5 backdrop-blur-sm ${dark ? '' : 'hidden'}">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="font-tech text-[10px] font-bold tracking-[.2em] uppercase text-white/70">Stay in the loop</div>
            <div class="font-display font-bold text-xl text-white mt-1">Get anime drops, seller news and marketplace updates.</div>
          </div>
          <form class="flex flex-col sm:flex-row gap-2 w-full max-w-lg" onsubmit="event.preventDefault(); toast('You are subscribed to Anilyfe updates.','sparkles');">
            <input class="inp !bg-white/10 !text-white placeholder:text-white/60 !border-white/20 !rounded-xl flex-1" placeholder="Your email address" type="email" required>
            <button class="btn btn-primary !rounded-xl !px-4" type="submit">Join</button>
          </form>
        </div>
      </div>
      <div class="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] py-8">
        <div>
          ${LOGO('text-2xl')}
          <p class="mt-4 text-sm max-w-xs leading-relaxed" style="color:${textColor}; opacity:${dark ? '.88' : '.82'};">ANILyfe is the anime marketplace for premium figures, manga, apparel, collectibles and trusted seller experiences across Nigeria.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            ${['Verified sellers','Secure checkout','Nationwide shipping','Buyer protection'].map(item => `<span class="badge ${dark ? '!bg-white/10 !text-white border border-white/10' : '!bg-[#E7F1FF] !text-[#334EAC]'} text-[10px] font-extrabold">${item}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">SHOP</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Marketplace</a></li>
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Featured deals</a></li>
            <li><a href="#/marketplace" class="hover:opacity-100" style="color:${textColor};">Best sellers</a></li>
            <li><a href="#/auth" class="hover:opacity-100" style="color:${textColor};">Become a seller</a></li>
          </ul>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">HELP</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            ${links.slice(0,6).map(l=>`<li><a href="${l.href}" class="hover:opacity-100" style="color:${textColor};">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="font-tech text-[10px] font-bold tracking-[.2em] mb-3" style="color:${textColor}; opacity:${dark ? '.9' : '.8'};">SUPPORT</div>
          <ul class="space-y-2 text-sm" style="color:${textColor}; opacity:${dark ? '1' : '.9'};">
            <li><span class="font-semibold" style="color:${textColor};">Email:</span> support@anilyfe.com</li>
            <li><span class="font-semibold" style="color:${textColor};">Phone:</span> +234 (0) 800 ANILYFE</li>
            <li><span class="font-semibold" style="color:${textColor};">Hours:</span> Mon–Sat, 8am–8pm</li>
            <li><a href="#/help" class="font-bold hover:underline" style="color:${textColor};">Need help? Visit Help Center</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-semibold" style="border-color:${borderColor}; color:${textColor}; opacity:${dark ? '1' : '.9'};">
        <span>© ${new Date().getFullYear()} Anilyfe · The anime marketplace, made personal.</span>
        <div class="flex flex-wrap justify-center gap-4">
          ${links.map((link, idx)=>`<a href="${link.href}" class="${idx>=2?'hidden sm:inline':''}" style="color:${textColor};">${link.label}</a>`).join('')}
        </div>
      </div>
    </div>
  </footer>`;
}

function regionSelect(extra){  return `<div class="relative ${extra||''}">    <i data-lucide="globe-2" class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style="width:15px;height:15px;color:var(--blue)"></i>
    <select class="inp !pl-9 !py-2 !text-xs !font-bold" data-action="set-region" aria-label="Region & currency">
      ${REGIONS.map(r=>`<option value="${r.code}" ${r.code===region().code?'selected':''}>${r.flag} ${r.name} · ${r.symbol.trim()}</option>`).join('')}
    </select>
  </div>`;
}

/* ---------- shared: sparks ---------- */
function sparks(n, seedN){
  let out='';
  for(let i=0;i<(n||14);i++){
    const x=((i*137+ (seedN||0)*53)%100), y=((i*61+(seedN||0)*29)%100), s=(i%3)+2, d=(3+(i%5));
    out += `<span class="spark" style="left:${x}%;top:${y}%;width:${s}px;height:${s}px;--d:${d}s"></span>`;
  }
  return out;
}

/* ---------- shared: "coming soon" shell for not-yet-built sections ---------- */
function comingSoonView(title, icon, desc){
  return `
  <div class="min-h-screen" style="background:var(--off)">
    <header class="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back home</a>
    </header>
    <main class="max-w-3xl mx-auto px-5 py-24 text-center reveal in">
      <div class="w-16 h-16 rounded-2xl bg-[var(--vlight)] border border-[var(--light)] flex items-center justify-center mx-auto mb-6">
        <i data-lucide="${icon||'sparkles'}" style="width:26px;height:26px;color:var(--blue)"></i>
      </div>
      <h1 class="font-display text-3xl font-extrabold mb-3">${esc(title)}</h1>
      <p class="text-sm" style="color:var(--mid)">${esc(desc||'This section of Anilyfe is on the roadmap and not wired up in this prototype yet.')}</p>
      <a href="#/marketplace" class="btn btn-primary mt-8 inline-flex"><i data-lucide="store" style="width:15px;height:15px"></i> Browse the marketplace</a>
    </main>
  </div>`;
}

/* ---------- boot ---------- */
seed();
route();
