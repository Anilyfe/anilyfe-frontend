/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Cart + wishlist mutations. Cart/wishlist state itself lives in
   localStorage (see js/app.js LS helper); this file only holds the
   actions triggered from data-action="add-cart" / "cart-remove" / "wish". */

function findProduct(id){
  let p = LS.get('products', []).find(x=>x.id===id);
  if (!p && window.productService) {
    const scList = LS.get('anilyfe_seller_products', []);
    const found = scList.find(x => x.id === id);
    if (found) {
      p = {
        id: found.id,
        sellerId: found.sellerId,
        name: found.name,
        price: found.salePrice || found.price,
        stock: found.stock,
        category: found.category,
        img: (found.images && found.images[0]) || null,
        rating: found.rating || 4.9,
        reviews: found.reviewsCount || 0
      };
    }
  }
  return p;
}

function cartAdd(id){
  const cart = LS.get('cart', []);
  const ex = cart.find(c=>c.id===id);
  if(ex) ex.qty++; else cart.push({id, qty:1});
  LS.set('cart', cart);
  const p = findProduct(id);
  toast(`Added "${esc(p?p.name:'item')}" to cart.`, 'shopping-cart');
  route();
}

function cartRemove(id){
  LS.set('cart', LS.get('cart', []).filter(c=>c.id!==id));
  route();
}

/* Cart page (pages/cart.html). Lists items currently in LS 'cart' with
   quantity, unit price and a running total in the active region's currency. */
function viewCart(){
  const cart = LS.get('cart', []);
  const rows = cart.map(c=>{
    const p = findProduct(c.id);
    if(!p) return '';
    return `
    <div class="flex items-center gap-4 py-4 border-b" style="border-color:var(--light)">
      <div class="prod-media w-16 h-16 shrink-0">${p.img?`<img src="${p.img}" alt="">`:`<div class="ph-icon"><i data-lucide="package" style="width:20px;height:20px"></i></div>`}</div>
      <div class="flex-1 min-w-0">
        <div class="font-bold text-sm truncate">${esc(p.name)}</div>
        <div class="text-xs" style="color:var(--mid)">Qty ${c.qty} · ${fmt(p.price)} each</div>
      </div>
      <div class="font-display font-extrabold">${fmt(p.price*c.qty)}</div>
      <button class="btn btn-danger !py-2 !px-3 text-xs" data-action="cart-remove" data-id="${p.id}"><i data-lucide="trash-2" style="width:13px;height:13px"></i></button>
    </div>`;
  }).join('');
  const total = cart.reduce((s,c)=>{ const p=findProduct(c.id); return s + (p?p.price*c.qty:0); },0);
  return `
  <div class="min-h-screen" style="background:var(--off)">
    <header class="max-w-3xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/marketplace" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Keep shopping</a>
    </header>
    <main class="max-w-3xl mx-auto px-5 pb-24">
      <h1 class="font-display text-2xl font-extrabold mb-6">Your cart</h1>
      ${cart.length? `<div class="card p-5">${rows}
        <div class="flex items-center justify-between pt-5">
          <div class="font-display text-lg font-extrabold">Total: ${fmt(total)}</div>
          <a href="#/checkout" class="btn btn-primary">Checkout <i data-lucide="arrow-right" style="width:14px;height:14px"></i></a>
        </div></div>`
      : `<div class="card p-10 text-center"><i data-lucide="shopping-cart" style="width:28px;height:28px;color:var(--mid)" class="mx-auto mb-3"></i><p class="text-sm" style="color:var(--mid)">Your cart is empty.</p></div>`}
    </main>
  </div>`;
}

function viewWishlist(){
  const u = currentUser();
  if(!u){ location.hash='#/auth'; return ''; }
  const products = LS.get('products',[]);
  const saved = LS.get('wishlist',[]);
  const rows = saved.map(id=> products.find(p=>p.id===id)).filter(Boolean);
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/marketplace" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Keep browsing</a>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <h1 class="font-display font-extrabold text-2xl mb-6">Saved products</h1>
      ${rows.length ? `<div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">${rows.map(p=>`
        <div class="card p-3">
          <div class="rounded-2xl overflow-hidden bg-[#E7F1FF] border border-[#D0E3FF]">
            ${p.img?`<img src="${p.img}" alt="${esc(p.name)}" class="w-full h-40 object-cover" onerror="this.remove()"/>`:`<div class="w-full h-40 flex items-center justify-center"><i data-lucide="heart" style="width:25px;height:25px;color:#708BD1"></i></div>`}
          </div>
          <div class="mt-3">
            <div class="text-sm font-extrabold">${esc(p.name)}</div>
            <div class="font-display font-extrabold text-lg mt-1">${fmt(p.price)}</div>
            <div class="mt-3 flex gap-2">
              <a href="#/product/${p.id}" class="btn btn-outline !px-3 !py-2 !text-[10px] flex-1">View</a>
              <button class="btn btn-primary !px-3 !py-2 !text-[10px] flex-1" data-action="add-cart" data-id="${p.id}">Cart</button>
            </div>
          </div>
        </div>`).join('')}</div>` : `<div class="card p-12 text-center"><i data-lucide="heart" style="width:28px;height:28px;color:#708BD1" class="mx-auto mb-4"></i><p class="text-sm text-[#708BD1]">No saved products yet.</p><a href="#/marketplace" class="btn btn-primary mt-4">Explore Marketplace</a></div>`}
    </main>
  </div>`;
}

function viewOrders(){
  const u = currentUser();
  if(!u){ location.hash='#/auth'; return ''; }
  const sample = LS.get('orders', [
    {id:'ANL-1042', status:'Processing', total:32000, itemCount:2, date:'2026-08-28'},
    {id:'ANL-1038', status:'Shipped', total:18250, itemCount:1, date:'2026-08-21'},
    {id:'ANL-1027', status:'Delivered', total:28000, itemCount:3, date:'2026-08-15'}
  ]);
  return `
  <div class="min-h-screen bg-[#F6FCFF]">
    <header class="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/marketplace" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Market</a>
    </header>
    <main class="max-w-6xl mx-auto px-5 pb-20">
      <h1 class="font-display font-extrabold text-2xl mb-6">My orders</h1>
      <div class="space-y-4">
        ${sample.map(order=>`
          <div class="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 reveal">
            <div>
              <div class="font-display font-extrabold text-lg">${esc(order.id)}</div>
              <div class="text-xs text-[#708BD1] font-bold mt-1">${order.date}</div>
            </div>
            <div class="flex items-center gap-3">
              <span class="badge ${order.status==='Delivered'?'!bg-[#E6F7EC] !text-[#1F9D55]':order.status==='Shipped'?'!bg-[#E7F1FF] !text-[#334EAC]':'!bg-[#FFF7E0] !text-[#B7791F]'}">${order.status}</span>
              <span class="text-xs font-bold text-[#5a6a9c]">${order.itemCount} items</span>
              <span class="font-display font-extrabold text-lg">${fmt(order.total)}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </main>
  </div>`;
}

function wishlistToggle(id){
  let w = LS.get('wishlist', []);
  if(w.includes(id)){
    w = w.filter(x=>x!==id);
    toast('Removed from wishlist.', 'heart-off');
  } else {
    w.push(id);
    toast('Saved to wishlist ♥', 'heart');
  }
  LS.set('wishlist', w);
  route();
}
