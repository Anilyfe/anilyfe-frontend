/* ANILyfe V1 shared UI primitives. Original mascot/art only. */
(function(){
  const fallbackImage='assets/images/placeholder.svg';
  document.addEventListener('error',event=>{
    const image=event.target;
    if(!(image instanceof HTMLImageElement))return;
    if(image.dataset.fallbackApplied==='true'){
      image.classList.add('image-fallback-unavailable');
      return;
    }
    image.dataset.fallbackApplied='true';
    image.src=fallbackImage;
    event.stopImmediatePropagation();
  },true);
  const IMG = (name) => `assets/images/${name}.png`;
  /* ImageSlot: every image on the site is a PNG in assets/images/. Sets explicit dimensions to prevent layout shift. */
  const ImageSlot = (name, alt='', cls='', width=null, height=null) => `<img src="${IMG(name)}" alt="${esc(alt)}" class="${cls}" ${width?`width="${width}"`:''} ${height?`height="${height}"`:''} loading="lazy" onerror="this.style.display='none'">`;
  const mascot = (size='72') => `<div class="anilyfe-mascot relative mx-auto w-[${size}px] h-[${size}px]" aria-hidden="true"><svg viewBox="0 0 96 96" class="w-full h-full" fill="none" width="${size}" height="${size}"><rect x="10" y="10" width="76" height="76" rx="24" fill="#E7F1FF" stroke="#334EAC" stroke-width="3"/><path d="M31 42c5-9 29-9 34 0" stroke="#334EAC" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="52" r="5" fill="#334EAC"/><circle cx="62" cy="52" r="5" fill="#334EAC"/><path d="M36 67c7 5 17 5 24 0" stroke="#334EAC" stroke-width="4" stroke-linecap="round"/><path d="M48 10v-6M28 14l-4-5M68 14l4-5" stroke="#708BD1" stroke-width="3" stroke-linecap="round"/></svg><img src="assets/images/loader-mascot.png" width="512" height="512" alt="" class="absolute inset-0 h-full w-full object-contain" onload="var v=this.parentNode.querySelector('svg');if(v)v.style.display='none'" onerror="this.style.display='none'"></div>`;
  const AnimeLoader = (message='Loading marketplace data...') => `<div class="anilyfe-loader flex min-h-[220px] items-center justify-center p-8 text-center" role="status" aria-live="polite"><div>${mascot('72')}<div class="mt-4 font-display font-bold text-anilyfe-700">${esc(message)}</div><div class="mx-auto mt-3 h-1 w-32 overflow-hidden rounded-full bg-anilyfe-100"><div class="h-full w-1/2 rounded-full bg-anilyfe-500 animate-[anilyfe-loading_900ms_ease-in-out_infinite]"></div></div></div></div>`;
  const Skeleton = (kind='card') => kind==='table' ? `<div class="space-y-3 animate-pulse">${[1,2,3,4].map(()=>`<div class="h-12 rounded-xl bg-anilyfe-100"></div>`).join('')}</div>` : `<div class="grid grid-cols-2 gap-4 animate-pulse sm:grid-cols-3 lg:grid-cols-4">${[1,2,3,4].map(()=>`<div class="overflow-hidden rounded-2xl border border-anilyfe-100 bg-white"><div class="aspect-square bg-anilyfe-100"></div><div class="space-y-2 p-4"><div class="h-3 w-2/3 rounded bg-anilyfe-100"></div><div class="h-4 w-full rounded bg-anilyfe-100"></div><div class="h-3 w-1/2 rounded bg-anilyfe-100"></div></div></div>`).join('')}</div>`;
  const EmptyState = (title='No records to display', message='There is nothing here yet.', action='') => `<div class="rounded-3xl border border-dashed border-anilyfe-200 bg-white p-10 text-center"><img src="assets/images/empty.png" width="320" height="144" alt="" class="mx-auto h-36 w-full max-w-xs rounded-2xl object-cover" onerror="this.replaceWith(Object.assign(document.createElement('div'),{innerHTML:ANILyfeUI.mascot('64')}).firstChild)"><h3 class="mt-4 font-display text-lg font-bold text-anilyfe-700">${esc(title)}</h3><p class="mx-auto mt-2 max-w-md text-sm text-slate-500">${esc(message)}</p>${action}</div>`;
  const ErrorState = (title='Something went wrong', message='We could not load this section. Please try again.', retry='route()') => `<div class="rounded-3xl border border-red-100 bg-white p-10 text-center"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-error"><i data-lucide="alert-triangle" style="width:28px;height:28px"></i></div><h3 class="mt-4 font-display text-lg font-bold text-slate-800">${esc(title)}</h3><p class="mx-auto mt-2 max-w-md text-sm text-slate-500">${esc(message)}</p><button class="btn btn-primary mt-5" onclick="${retry}">Retry</button></div>`;
  const Badge = (text,type='info') => { const map={success:'bg-emerald-50 text-emerald-700 border-emerald-200',warning:'bg-amber-50 text-amber-700 border-amber-200',error:'bg-red-50 text-red-700 border-red-200',info:'bg-anilyfe-100 text-anilyfe-700 border-anilyfe-200'}; return `<span class="inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${map[type]||map.info}">${esc(text)}</span>`; };
  const Button = (label, cls='btn-primary', attrs='') => `<button class="btn ${cls}" ${attrs}>${label}</button>`;
  const Card = (content, cls='') => `<section class="card ${cls}">${content}</section>`;
  window.ANILyfeUI={ImageSlot,IMG,mascot,AnimeLoader,Skeleton,EmptyState,ErrorState,Badge,Button,Card};
})();
