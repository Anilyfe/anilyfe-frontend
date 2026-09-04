/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Marketing landing page / logged-out home feed. */

function viewLanding(){
  const niches = [
    {n:'Hoodies',   i:'shirt',     d:'Cosplay-grade fleece & street fits'},
    {n:'Keychains', i:'key-round', d:'Acrylic charms & metal tags'},
    {n:'Figures',   i:'bot',       d:'Scale figures, Nendoroids & statues'},
    {n:'Manga',     i:'book-open', d:'Volumes, box sets & light novels'},
    {n:'Posters',   i:'image',     d:'Gallery prints & wall scrolls'},
    {n:'Digital',   i:'music-2',   d:'Soundtracks, wallpapers & packs'},
  ];
  const loop = niches.map(x=>`
    <div class="glass-dark rounded-2xl p-5 w-60 shrink-0 group cursor-default">
      <div class="w-12 h-12 rounded-xl bg-[rgba(208,227,255,.12)] border border-[rgba(208,227,255,.2)] flex items-center justify-center mb-4 transition group-hover:bg-[#334EAC] group-hover:scale-110" style="transition:.3s">
        <i data-lucide="${x.i}" style="width:22px;height:22px;color:#D0E3FF"></i>
      </div>
      <div class="font-display font-bold text-white text-lg">${x.n}</div>
      <div class="text-xs text-[#9FB6E8] mt-1 leading-relaxed">${x.d}</div>
    </div>`).join('');

  return `
  <div class="min-h-screen hero-ambient relative overflow-hidden">
    <div class="absolute inset-0 grid-lines"></div>
    ${sparks(26,1)}
    <div class="shoot" style="top:16%;left:78%"></div>
    <div class="shoot" style="top:40%;left:95%;animation-delay:2.6s"></div>

    <!-- nav -->
    <header class="relative z-10 max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO_D('text-2xl')}
      <nav class="hidden md:flex items-center gap-7 text-[#C9D9F5] text-sm font-semibold">
        <a href="#niches" class="hover:text-white transition">Niches</a>
        <a href="#sell" class="hover:text-white transition">Sell</a>
        <a href="#/marketplace" class="hover:text-white transition">Marketplace</a>
      </nav>
      <div class="flex items-center gap-3">
        ${regionSelect('hidden sm:block !w-44 [&_select]:!bg-[rgba(8,31,92,.5)] [&_select]:!text-[#D0E3FF] [&_select]:!border-[rgba(208,227,255,.25)]')}
        <a href="#/auth" class="btn btn-ghost !py-2 !text-xs">Sign in</a>
      </div>
    </header>

    <!-- hero -->
    <section class="relative z-10 max-w-7xl mx-auto px-5 pt-14 pb-24 md:pt-24 md:pb-32">
      <div class="max-w-3xl">
        <div class="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 text-xs font-bold text-[#D0E3FF] mb-7 reveal">
          <span class="w-2 h-2 rounded-full bg-[#7FB0FF] pulse-dot"></span> THE ANIME MARKETPLACE · MADE PERSONAL
        </div>
        <h1 class="font-display font-extrabold text-white leading-[1.02] text-5xl md:text-7xl reveal">
          Welcome to<br/><span class="text-[#D0E3FF]">Anilyfe</span><span class="text-[#E9B949]">.</span>
        </h1>
        <p class="mt-6 text-[#AFC4EC] text-base md:text-lg leading-relaxed max-w-xl reveal">
          Figures, fits, manga and more — bought and sold by fans across Africa and the world.
          Discover approved sellers, track hot deals, and rep the culture you love.
        </p>
        <div class="mt-9 flex flex-wrap gap-4 reveal">
          <a href="#/marketplace" class="btn btn-primary !px-7 !py-3.5 !text-sm">Explore Marketplace <i data-lucide="arrow-right" style="width:17px;height:17px"></i></a>
          <a href="#sell" class="btn !px-7 !py-3.5 !text-sm !bg-white/10 !text-white !border !border-[rgba(208,227,255,.3)] hover:!bg-white/20">Become a Seller</a>
        </div>
        <div class="mt-12 flex flex-wrap gap-8 reveal">
          ${[['4','Anime niches'],['100%','Buyer protection'],['24/7','Support']].map(s=>`
            <div><div class="font-display font-extrabold text-2xl text-white">${s[0]}</div><div class="text-[11px] uppercase tracking-widest text-[#708BD1] font-bold mt-1">${s[1]}</div></div>`).join('')}
        </div>
      </div>
      <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block float-slow">
        <div class="glass-dark rounded-3xl p-8 rotate-3 hover:rotate-0 transition duration-500">
          ${kunaiSVG(true).replace('class="kunai"','class="kunai" style="height:190px"')}
          <div class="text-center mt-3 font-tech italic font-bold text-[#E9B949] tracking-widest text-sm">EST. FOR THE CULTURE</div>
        </div>
      </div>
    </section>

    <!-- niches marquee -->
    <section id="niches" class="relative z-10 py-16 border-t border-[rgba(208,227,255,.12)]">
      <div class="max-w-7xl mx-auto px-5 flex items-end justify-between mb-8">
        <div>
          <div class="font-tech text-xs font-bold tracking-[.25em] text-[#708BD1] mb-2">BROWSE THE SHELVES</div>
          <h2 class="font-display font-bold text-3xl text-white">Every niche an otaku could want</h2>
        </div>
        <a href="#/marketplace" class="hidden sm:flex items-center gap-2 text-sm font-bold text-[#D0E3FF] hover:text-white transition">View all <i data-lucide="chevron-right" style="width:16px;height:16px"></i></a>
      </div>
      <div class="marquee"><div class="marquee-track pr-5">${loop}${loop}</div></div>
    </section>

    <!-- community -->
    <section id="community" class="relative z-10 py-8 md:py-12">
      <div class="max-w-7xl mx-auto px-5">
        <div class="glass rounded-3xl p-8 md:p-12">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div class="max-w-2xl">
              <div class="font-tech text-xs font-bold tracking-[.25em] text-[#334EAC] mb-3">COMMUNITY</div>
              <h2 class="font-display font-extrabold text-3xl md:text-4xl text-[#081F5C] leading-tight">Join the Anilyfe community</h2>
              <p class="mt-4 text-[#4a5a8c] leading-relaxed">Connect with collectors, creators and anime sellers across Nigeria. Discover deals, updates, and fresh drops before anyone else.</p>
            </div>
            <button class="btn btn-primary !px-7 !py-3.5 !text-sm" data-action="toast" data-msg="Community space opens soon — stay tuned!">Join Community <i data-lucide="arrow-right" style="width:16px;height:16px"></i></button>
          </div>
        </div>
      </div>
    </section>

    <!-- become a seller -->
    <section id="sell" class="relative z-10 py-20">
      <div class="max-w-7xl mx-auto px-5">
        <div class="glass rounded-3xl p-8 md:p-14 grid md:grid-cols-2 gap-10 items-center reveal">
          <div>
            <div class="font-tech text-xs font-bold tracking-[.25em] text-[#334EAC] mb-3">SELLER PROGRAM</div>
            <h2 class="font-display font-extrabold text-3xl md:text-4xl text-[#081F5C] leading-tight">Turn your collection into a storefront.</h2>
            <p class="mt-4 text-[#4a5a8c] leading-relaxed">Apply in under a minute — business name, what you sell, starting price. Once the primary administrator approves your identity, your products go live to every buyer on Anilyfe.</p>
            <ul class="mt-6 space-y-3">
              ${[['store','Your own seller ID & dashboard'],['badge-check','Admin approval keeps buyers safe'],['banknote','Sell in Naira, Cedis, Dollars & more']].map(f=>`
              <li class="flex items-center gap-3 text-sm font-semibold text-[#081F5C]"><span class="w-9 h-9 rounded-xl bg-[#E7F1FF] flex items-center justify-center shrink-0"><i data-lucide="${f[0]}" style="width:17px;height:17px;color:#334EAC"></i></span>${f[1]}</li>`).join('')}
            </ul>
            <a href="#/auth" class="btn btn-primary mt-8 !px-7 !py-3">Become a Seller <i data-lucide="arrow-right" style="width:16px;height:16px"></i></a>
          </div>
          <div class="relative">
            <div class="rounded-2xl overflow-hidden border-4 border-white shadow-2xl rotate-2 hover:rotate-0 transition duration-500">
              <img src="${IMG.fig1}" alt="Anime figures" class="w-full h-72 object-cover" onerror="this.parentElement.style.background='linear-gradient(150deg,#D0E3FF,#708BD1)';this.remove()"/>
            </div>
            <div class="absolute -bottom-5 -left-5 glass rounded-2xl px-5 py-4 -rotate-3">
              <div class="font-display font-extrabold text-2xl text-[#081F5C]">320+</div>
              <div class="text-[11px] font-bold uppercase tracking-widest text-[#708BD1]">sales by top sellers</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${siteFooter('relative z-10 border-t border-[rgba(208,227,255,.12)] bg-[rgba(8,31,92,.8)] text-white')}
  </div>`;
}
