/* ANILyfe — extracted from the original single-file prototype (index.html) */

/* Regions/currency, category taxonomy, placeholder imagery and the
   localStorage seed data (sellers + products). Mirrored, for reference,
   in /data/products.json and /data/sellers.json. */

const REGIONS = [
  {code:'NG', name:'Nigeria',        flag:'🇳🇬', symbol:'₦',   rate:1,       dec:0},
  {code:'GH', name:'Ghana',          flag:'🇬🇭', symbol:'₵',   rate:0.0104,  dec:2},
  {code:'US', name:'United States',  flag:'🇺🇸', symbol:'$',   rate:0.00066, dec:2},
  {code:'GB', name:'United Kingdom', flag:'🇬🇧', symbol:'£',   rate:0.00052, dec:2},
  {code:'KE', name:'Kenya',          flag:'🇰🇪', symbol:'KSh ',rate:0.086,   dec:0},
  {code:'JP', name:'Japan',          flag:'🇯🇵', symbol:'¥',   rate:0.101,   dec:0},
  {code:'ZA', name:'South Africa',   flag:'🇿🇦', symbol:'R',   rate:0.012,   dec:2},
];
const region = () => REGIONS.find(r=>r.code===LS.get('region','NG')) || REGIONS[0];
const fmt = ngn => { const r = region(); const v = (Number(ngn)||0)*r.rate; return r.symbol + v.toLocaleString(undefined,{minimumFractionDigits:r.dec, maximumFractionDigits:r.dec}); };

const NIGERIAN_STATES_SHARED=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'];

/* ---------- categories ---------- */
const CATS = {
  'Figures & Collectibles':{icon:'bot',        short:'Figures'},
  'Clothing & Apparel':    {icon:'shirt',      short:'Hoodies'},
  'Accessories':           {icon:'key-round',  short:'Keychains'},
  'Manga & Books':         {icon:'book-open',  short:'Manga'},
  'Posters & Wall Art':    {icon:'image',      short:'Posters'},
  'Digital Products':      {icon:'music-2',    short:'Digital'},
  'Cosplay':               {icon:'sparkles',   short:'Cosplay'},
  'Home & Living':         {icon:'lamp',       short:'Home'},
};
const catKey = name => Object.keys(CATS).find(k=>k===name||CATS[k].short===name) || 'Figures & Collectibles';

/* ---------- seed data ---------- */
function seed(){
  // The marketplace starts empty. All marketplace records must be created by
  // authenticated users/admin workflows; no demo seller, product, order or admin is seeded.
  const legacyProducts = new Set(['PRD-LFY5','PRD-GOJO','PRD-NRTS','PRD-DSLP','PRD-JJKM','PRD-OSTP','PRD-AKTK','PRD-MKSA','PRD-OPBX','PRD-TKGH','PRD-CHIB','PRD-DRAFT-01','PRO-301','PRO-302','PRO-303','PRO-304']);
  const legacySellers = new Set(['SLR-001','SLR-OTAK','SLR-ANWN','SLR-MGDN','SLR-SHON','SEL-201','SEL-202','SEL-203']);
  ['products','sellers','orders','transactions','reviews','questions','payouts','notifications','inventoryHistory'].forEach(key=>{
    const rows=LS.get(key,[]);
    if(Array.isArray(rows)){
      const cleaned=rows.filter(x=>!legacyProducts.has(x.id)&&!legacySellers.has(x.id)&&!legacyProducts.has(x.productId)&&!legacyProducts.has(x.orderId));
      LS.set(key,cleaned);
    }
  });
  const emptyCollections = [
    'users','sellers','products','orders','transactions','reviews','questions',
    'payouts','notifications','inventoryHistory','admins'
  ];
  emptyCollections.forEach(key => {
    if (!Array.isArray(LS.get(key, null))) LS.set(key, []);
  });
  if (!LS.get('cart')) LS.set('cart', []);
  if (!LS.get('wishlist')) LS.set('wishlist', []);
  LS.set('seeded', true);
}

