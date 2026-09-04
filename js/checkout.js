/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Checkout is a prototype flow: it records nothing on a server, just
   clears the local cart and confirms with a toast. Replace this with a
   real order-creation call (POST /orders, payment step, etc.) when the
   backend exists. */

/* Checkout page (pages/checkout.html) — shows the order total and a single
   "Place order" button that calls checkoutNow() below. */
function viewCheckout(){
  const cart = LS.get('cart', []);
  const products = LS.get('products', []);
  const total = cart.reduce((s,c)=>{ const p=products.find(x=>x.id===c.id); return s + (p?p.price*c.qty:0); },0);
  return `
  <div class="min-h-screen" style="background:var(--off)">
    <header class="max-w-2xl mx-auto px-5 py-5 flex items-center justify-between">
      ${LOGO('text-2xl')}
      <a href="#/cart" class="btn btn-ghost text-xs"><i data-lucide="arrow-left" style="width:14px;height:14px"></i> Back to cart</a>
    </header>
    <main class="max-w-2xl mx-auto px-5 pb-24">
      <h1 class="font-display text-2xl font-extrabold mb-6">Checkout</h1>
      <div class="card p-6 space-y-4">
        <div class="flex justify-between text-sm"><span style="color:var(--mid)">Items</span><span>${cart.length}</span></div>
        <div class="flex justify-between font-display text-lg font-extrabold"><span>Total</span><span>${fmt(total)}</span></div>
        <p class="text-xs" style="color:var(--mid)">This is a prototype checkout — no real payment is processed, orders aren't sent anywhere yet.</p>
        <button class="btn btn-primary w-full" data-action="checkout">Place order</button>
      </div>
    </main>
  </div>`;
}

function checkoutNow(){
  toast('Checkout is a prototype flow — order recorded locally. 🎉', 'badge-check');
  LS.set('cart', []);
  route();
}
