/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Product card rendering + seller-side product form helpers. */

function productCard(p){
  const wish = LS.get('wishlist',[]);
  const liked = wish.includes(p.id);
  const seller = LS.get('sellers',[]).find(s=>s.id===p.sellerId);
  return `
  <div class="prod-card card !rounded-2xl p-3 flex flex-col">
    <div class="prod-media">
      <div class="ph-icon"><i data-lucide="${CATS[catKey(p.category)].icon}" style="width:44px;height:44px"></i></div>
      ${p.img?`<img src="${p.img}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()"/>`:''}
      <span class="absolute bottom-2 left-2 badge !bg-[#081F5C]/85 !text-white backdrop-blur">${CATS[catKey(p.category)].short}</span>
      ${p.off?`<span class="absolute top-2 left-2 badge !bg-[#E9B949] !text-[#081F5C]">-${p.off}%</span>`:''}
      <button class="absolute top-2 right-2 w-8 h-8 rounded-full ${liked?'bg-[#334EAC]':'bg-white/90'} flex items-center justify-center transition hover:scale-110" data-action="wish" data-id="${p.id}" aria-label="wishlist">
        <i data-lucide="heart" style="width:15px;height:15px;color:${liked?'#fff':'#334EAC'};${liked?'fill:#fff':''}"></i>
      </button>
    </div>
    <div class="pt-3 flex-1 flex flex-col">
      <div class="text-[13px] font-extrabold leading-snug line-clamp-2 min-h-[2.3em]">${esc(p.name)}</div>
      <div class="text-[10px] text-[#708BD1] font-bold mt-.5 mb-1.5 truncate">by ${esc(seller?seller.businessName:'Anilyfe')}</div>
      <div class="mt-auto flex items-end justify-between">
        <div>
          <div class="font-display font-extrabold text-[15px]">${fmt(p.price)}</div>
          <div class="flex items-center gap-1 text-[10px] text-[#708BD1] font-bold"><i data-lucide="star" style="width:10px;height:10px;color:#E9B949;fill:#E9B949"></i> ${p.rating} (${p.reviews})</div>
        </div>
        <div class="flex gap-2 items-center">
          <a href="#/product/${p.id}" class="btn btn-outline !py-1.5 !px-2 !text-[10px]">View</a>
          <button class="w-9 h-9 rounded-xl bg-[#E7F1FF] hover:bg-[#334EAC] group flex items-center justify-center transition" data-action="add-cart" data-id="${p.id}" aria-label="add to cart">
            <i data-lucide="plus" style="width:16px;height:16px;color:#334EAC" class="group-hover:!text-white"></i>
          </button>
        </div>
      </div>
      ${p.stock<=5?`<div class="mt-2 text-[10px] font-extrabold text-[#B7791F] flex items-center gap-1"><i data-lucide="alert-triangle" style="width:11px;height:11px"></i> Only ${p.stock} left</div>`:''}
    </div>
  </div>`;
}

function viewProduct(id){
  const products = LS.get('products',[]);
  const p = products.find(x=>x.id===id) || products[0];
  if(!p) return `
  <div class="min-h-screen bg-[#F6FCFF] flex items-center justify-center px-5">
    <div class="card p-10 text-center">
      <div class="w-16 h-16 rounded-2xl bg-[#E7F1FF] flex items-center justify-center mx-auto mb-4"><i data-lucide="package-search" style="width:28px;height:28px;color:#334EAC"></i></div>
      <h1 class="font-display font-extrabold text-2xl">Product unavailable</h1>
      <p class="text-sm text-[#708BD1] mt-2">This item is no longer available on the marketplace.</p>
      <a href="#/marketplace" class="btn btn-primary mt-5">Browse products</a>
    </div>
  </div>`;
  const seller = LS.get('sellers',[]).find(s=>s.id===p.sellerId) || {businessName:'Anilyfe'};
  const liked = LS.get('wishlist',[]).includes(p.id);
  const related = products.filter(x=>x.id!==p.id && x.category===p.category).slice(0,4);
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <div class="flex items-center gap-2">
        <a href="#/marketplace" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back</a>
        <button class="btn btn-primary !py-2 !px-3" data-action="add-cart" data-id="${p.id}"><i data-lucide="shopping-cart" style="width:14px;height:14px"></i> Add to cart</button>
      </div>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
        <div class="card p-4 reveal">
          <div class="rounded-2xl overflow-hidden bg-[#E7F1FF] border border-[#D0E3FF] relative">
            <div class="aspect-[4/3] w-full bg-[#E7F1FF] flex items-center justify-center">
              ${p.img?`<img src="${p.img}" alt="${esc(p.name)}" class="w-full h-full object-cover" onerror="this.remove()"/>`:`<i data-lucide="${CATS[catKey(p.category)].icon}" style="width:80px;height:80px;color:#708BD1"></i>`}
            </div>
            <span class="absolute bottom-3 left-3 badge !bg-[#081F5C]/85 !text-white">${CATS[catKey(p.category)].short}</span>
            ${p.off?`<span class="absolute top-3 left-3 badge !bg-[#E9B949] !text-[#081F5C]">-${p.off}%</span>`:''}
          </div>
          <div class="mt-4 grid grid-cols-4 gap-2">
            ${[p.img || '', p.img || '', p.img || '', p.img || ''].slice(0,4).map((img, idx)=>`<div class="aspect-square rounded-xl border border-[#D0E3FF] bg-[#F6FCFF] overflow-hidden ${idx===0?'ring-2 ring-[#334EAC]':''}">${img?`<img src="${img}" class="w-full h-full object-cover" onerror="this.remove()"/>`:`<div class="w-full h-full flex items-center justify-center"><i data-lucide="${CATS[catKey(p.category)].icon}" style="width:18px;height:18px;color:#708BD1"></i></div>`}</div>`).join('')}
          </div>
        </div>
        <div class="reveal">
          <div class="font-tech text-[10px] font-bold tracking-[.25em] text-[#708BD1]">ANIME MARKETPLACE</div>
          <h1 class="font-display font-extrabold text-3xl mt-2">${esc(p.name)}</h1>
          <div class="flex items-center gap-2 mt-2 text-sm text-[#5a6a9c]">
            <span class="inline-flex items-center gap-1 font-bold"><i data-lucide="star" style="width:14px;height:14px;color:#E9B949;fill:#E9B949"></i> ${p.rating}</span>
            <span>(${p.reviews} reviews)</span>
            <span class="badge !bg-[#E6F7EC] !text-[#1F9D55]">${p.stock > 0 ? `${p.stock} available` : 'Out of stock'}</span>
          </div>
          <div class="mt-5 flex items-end gap-3">
            <div class="font-display font-extrabold text-4xl text-[#081F5C]">${fmt(p.price)}</div>
            ${p.off?`<span class="text-sm line-through text-[#708BD1]">${fmt(p.price * (1 + p.off/100))}</span>`:''}
          </div>
          <div class="mt-6 card p-4">
            <div class="font-display font-bold text-base mb-3">Color</div>
            <div class="flex flex-wrap gap-2">
              ${['Black','White','Blue','Purple'].map(c=>`<button class="rounded-full border border-[#D0E3FF] bg-white px-3 py-1.5 text-xs font-bold ${c==='Black'?'!bg-[#081F5C] !text-white':''}">${c}</button>`).join('')}
            </div>
            <div class="font-display font-bold text-base mt-4 mb-3">Size</div>
            <div class="flex flex-wrap gap-2">
              ${['S','M','L','XL'].map(s=>`<button class="rounded-full border border-[#D0E3FF] bg-white px-3 py-1.5 text-xs font-bold ${s==='M'?'!bg-[#E7F1FF] !text-[#081F5C]':''}">${s}</button>`).join('')}
            </div>
          </div>
          <div class="mt-6 flex gap-3 flex-wrap">
            <button class="btn btn-primary flex-1 min-w-[180px]" data-action="add-cart" data-id="${p.id}"><i data-lucide="shopping-cart" style="width:15px;height:15px"></i> Add to Cart</button>
            <button class="btn btn-outline flex-1 min-w-[180px]" data-action="wish" data-id="${p.id}"><i data-lucide="heart" style="width:15px;height:15px;${liked?'fill:#334EAC':''}"></i> ${liked ? 'Saved' : 'Save'}</button>
          </div>
          <div class="mt-7 card p-4">
            <div class="font-display font-bold text-sm mb-2">Seller</div>
            <div class="flex items-center justify-between gap-3">
              <div>
                <div class="font-bold text-base">${esc(seller.businessName)}</div>
                <div class="text-xs text-[#708BD1] font-bold">${esc(seller.sells || 'Anime marketplace specialist')}</div>
              </div>
              <a href="#/seller/${seller.id}" class="btn btn-ghost !px-3 !py-2 !text-xs">Store</a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 mt-12">
        <div class="card p-6 reveal">
          <div class="font-display font-bold text-xl mb-4">Description</div>
          <p class="text-sm leading-relaxed text-[#5a6a9c]">${esc(p.name)} is a premium anime collectible designed for fans who want standout quality, collector-grade finishing, and fast delivery across Nigeria. Each piece is sourced from trusted sellers and kept compatible with modern marketplace standards.</p>
          <div class="mt-5 grid sm:grid-cols-3 gap-3 text-xs">
            <div class="rounded-xl bg-[#F6FCFF] border border-[#D0E3FF] p-3"><div class="font-bold text-[#081F5C]">Shipping</div><div class="mt-1 text-[#5a6a9c]">Nationwide</div></div>
            <div class="rounded-xl bg-[#F6FCFF] border border-[#D0E3FF] p-3"><div class="font-bold text-[#081F5C]">Dispatch</div><div class="mt-1 text-[#5a6a9c]">2-4 days</div></div>
            <div class="rounded-xl bg-[#F6FCFF] border border-[#D0E3FF] p-3"><div class="font-bold text-[#081F5C]">Verified</div><div class="mt-1 text-[#5a6a9c]">Seller verified</div></div>
          </div>
        </div>
        <div class="card p-6 reveal">
          <div class="font-display font-bold text-xl mb-4">Why shoppers love it</div>
          <ul class="space-y-3 text-sm text-[#5a6a9c]">
            <li class="flex gap-2"><i data-lucide="badge-check" style="width:16px;height:16px;color:#1F9D55"></i> Secure marketplace purchase</li>
            <li class="flex gap-2"><i data-lucide="truck" style="width:16px;height:16px;color:#334EAC"></i> Reliable delivery and tracking</li>
            <li class="flex gap-2"><i data-lucide="shield-check" style="width:16px;height:16px;color:#334EAC"></i> Buyer protection and seller accountability</li>
          </ul>
        </div>
      </div>
      <div class="mt-12 reveal">
        <div class="flex items-center justify-between mb-4">
          <h2 class="font-display font-bold text-xl">You may also like</h2>
          <a href="#/marketplace" class="text-xs font-bold text-[#334EAC]">Browse all</a>
        </div>
        <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          ${related.map(item=>productCard(item)).join('') || '<div class="card p-8 text-sm text-[#708BD1]">No related products yet.</div>'}
        </div>
      </div>
    </main>
  </div>`;
}

const PRODUCT_COLOR_OPTIONS = ['Black','White','Blue','Purple','Red','Pink','Green','Yellow','Orange','Grey','Silver','Gold','Brown','Navy','Beige','Teal','Cyan','Peach'];
const PRODUCT_SIZE_OPTIONS = ['XS','S','M','L','XL','XXL','XXXL','2XS','3XS','4XS','One Size','Custom'];

function readImageFile(file){
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Image read failed'));
    reader.readAsDataURL(file);
  });
}

function previewProductImages(inputEl){
  const wrap = document.getElementById('productImagePreview');
  if(!wrap || !inputEl.files || !inputEl.files.length){ wrap.innerHTML = ''; return; }
  wrap.innerHTML = '';
  Array.from(inputEl.files).slice(0,4).forEach(file => {
    const url = URL.createObjectURL(file);
    const node = document.createElement('div');
    node.className = 'aspect-square rounded-xl overflow-hidden border border-[#D0E3FF] bg-[#F6FCFF]';
    node.innerHTML = `<img src="${url}" class="w-full h-full object-cover" onerror="this.remove()" />`;
    wrap.appendChild(node);
  });
}

/* Fired on submit of #productForm, from the seller dashboard. */
async function productAdd(formEl){
  const f = new FormData(formEl), u = currentUser(), s = sellerOf(u.id);
  const products = LS.get('products', []);
  const fileInput = formEl.querySelector('input[name="images"]');
  const colorSelect = formEl.querySelector('select[name="colors"]');
  const sizeSelect = formEl.querySelector('select[name="sizes"]');
  const files = Array.from(fileInput?.files || []).slice(0,4);
  const images = files.length ? await Promise.all(files.map(file => readImageFile(file))) : [];
  const colors = colorSelect ? (colorSelect.multiple ? Array.from(colorSelect.selectedOptions).map(o => o.value.trim()).filter(Boolean) : [colorSelect.value].filter(Boolean)) : (f.get('colors') || '').split(',').map(v => v.trim()).filter(Boolean);
  const sizes = sizeSelect ? (sizeSelect.multiple ? Array.from(sizeSelect.selectedOptions).map(o => o.value.trim()).filter(Boolean) : [sizeSelect.value].filter(Boolean)) : (f.get('sizes') || '').split(',').map(v => v.trim()).filter(Boolean);
  const description = ((f.get('description')||'').trim());
  if(!description){ toast('Product description is required.', 'alert-circle'); return; }
  if(description.length > 500){ toast('Product description must be 500 characters or less.', 'alert-circle'); return; }
  const product = {
    id: uid('PRD'), sellerId: s.id,
    name: (f.get('name')||'').trim(),
    description,
    price: Number(f.get('price'))||0,
    stock: Number(f.get('stock'))||0,
    category: f.get('category') || 'Figures & Collectibles',
    img: images[0] || null,
    gallery: images,
    colors: colors.length ? colors : ['Black'],
    sizes: sizes.length ? sizes : ['M'],
    rating: 5.0, reviews: 0, off: 0, createdAt: Date.now()
  };
  products.push(product);
  LS.set('products', products);
  toast(`"${esc(product.name)}" added to your catalog.`, 'package-plus');
  sellerTab = 'dashboard';
  route();
}

/* Fired from a "Delete" button in the seller product table
   (data-action="del-product"). Two-step confirm: first click arms it,
   second click within ~2.6s actually deletes. */
function productDelete(btnEl){
  if(btnEl.dataset.armed){
    LS.set('products', LS.get('products', []).filter(p=>p.id!==btnEl.dataset.id));
    toast('Product deleted.', 'trash-2');
    route();
  } else {
    btnEl.dataset.armed = '1';
    btnEl.innerHTML = 'Confirm?';
    btnEl.classList.add('!bg-[#B42318]', '!text-white', '!border-transparent');
    setTimeout(()=>{
      if(btnEl.isConnected){
        delete btnEl.dataset.armed;
        btnEl.innerHTML = '<i data-lucide="trash-2" style="width:12px;height:12px"></i> Delete';
        lucide.createIcons();
        btnEl.classList.remove('!bg-[#B42318]', '!text-white', '!border-transparent');
      }
    }, 2600);
  }
}
