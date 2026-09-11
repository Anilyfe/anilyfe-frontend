/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Checkout is a prototype flow: it records nothing on a server, just
   clears the local cart and confirms with a toast. Replace this with a
   real order-creation call (POST /orders, payment step, etc.) when the
   backend exists. */

/* Checkout page (pages/checkout.html) — shows the order total and a single
   "Place order" button that calls checkoutNow() below. */
function viewCheckout(){
  const totals = getCartTotals();
  const cart = LS.get('cart', []);
  return `
  <div class="min-h-screen" style="background:var(--off)">
    <header class="max-w-2xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/cart" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back to cart</a>
    </header>
    <main class="max-w-2xl mx-auto px-5 pb-24">
      <h1 class="font-display text-2xl font-extrabold mb-6">Checkout</h1>
      <div class="card p-6 space-y-4">
        <div class="flex justify-between text-sm"><span style="color:var(--mid)">Items</span><span>${totals.items.reduce((n,x)=>n+x.qty,0)}</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--mid)">Subtotal</span><span>${fmt(totals.subtotal)}</span></div>
        <div class="flex justify-between text-sm"><span style="color:var(--mid)">Shipping</span><span>${fmt(totals.shipping)}</span></div>
        ${totals.savings ? `<div class="flex justify-between text-sm text-emerald-700"><span>Savings</span><span>-${fmt(totals.savings)}</span></div>` : ''}
        <div class="flex justify-between font-display text-lg font-extrabold border-t pt-3"><span>Total</span><span>${fmt(totals.total)}</span></div>
        <p class="text-xs" style="color:var(--mid)">Payment is not processed by this static front-end. The order is recorded as Pending Payment so it can be connected to Paystack/backend processing later.</p>
        <button class="btn btn-primary w-full" data-action="checkout">Place order</button>
      </div>
    </main>
  </div>`;
}

function checkoutNow(){
  const u = currentUser();
  if(!u){ location.hash='#/auth'; return; }
  const totals = getCartTotals();
  if(!totals.items.length){ toast('Your cart is empty.', 'shopping-cart'); location.hash='#/cart'; return; }
  const existing = LS.get('orders', []);
  const created = [];
  const groups = new Map();
  totals.items.forEach(x => { const arr=groups.get(x.product.sellerId)||[]; arr.push(x); groups.set(x.product.sellerId,arr); });
  for(const [sellerId, items] of groups){
    const ship = totals.shippingBreakdown.find(x=>x.sellerId===sellerId)?.fee || 0;
    const subtotal = items.reduce((n,x)=>n+x.lineTotal,0);
    const order = { id:'ANL-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,5).toUpperCase(), buyerId:u.id, buyer:{id:u.id,name:u.name,email:u.email}, sellerId, items:items.map(x=>({productId:x.product.id,productName:x.product.name,sku:x.product.sku||'',quantity:x.qty,unitPrice:x.unit,lineTotal:x.lineTotal})), subtotal, shipping:ship, total:subtotal+ship, paymentStatus:'Pending Payment', orderStatus:'New', createdAt:new Date().toISOString(), timeline:[{status:'New',label:'Order created',timestamp:new Date().toISOString(),note:'Awaiting payment processing.'}] };
    existing.push(order); created.push(order);
  }
  LS.set('orders', existing);
  localStorage.setItem('anilyfe_seller_orders', JSON.stringify(existing));
  LS.set('cart', []);
  toast(`${created.length} order${created.length===1?'':'s'} recorded. Payment is still pending.`, 'badge-check');
  location.hash='#/orders';
}
