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

/* ---------- image assets ---------- */
const IMG = {
  fig1:'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  fig2:'https://images.pexels.com/photos/38250877/pexels-photo-38250877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  fig3:'https://images.pexels.com/photos/38250875/pexels-photo-38250875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  fig4:'https://images.pexels.com/photos/16075343/pexels-photo-16075343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  hood1:'https://images.pexels.com/photos/607961/pexels-photo-607961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  hood2:'https://images.pexels.com/photos/34247821/pexels-photo-34247821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  manga1:'https://images.pexels.com/photos/6214570/pexels-photo-6214570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  manga2:'https://images.pexels.com/photos/18848524/pexels-photo-18848524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poster1:'https://images.pexels.com/photos/3964758/pexels-photo-3964758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  poster2:'https://images.pexels.com/photos/3091203/pexels-photo-3091203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  night:'https://images.pexels.com/photos/34634037/pexels-photo-34634037.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
};

/* ---------- seed data ---------- */
function seed(){
  if(LS.get('seeded')) return;
  const sellers = [
    {id:'SLR-OTAK', userId:null, businessName:'Otaku Hub',     sells:'Figures, digital packs & rare imports', startingPrice:1500,  status:'approved', rating:4.9, sales:320, createdAt:Date.now()-86400000*90},
    {id:'SLR-ANWN', userId:null, businessName:'Anime World NG',sells:'Hoodies, apparel & cosplay wear',       startingPrice:5000,  status:'approved', rating:4.8, sales:280, createdAt:Date.now()-86400000*75},
    {id:'SLR-MGDN', userId:null, businessName:'Manga Den',     sells:'Posters, prints & wall art',            startingPrice:2000,  status:'approved', rating:4.9, sales:250, createdAt:Date.now()-86400000*60},
    {id:'SLR-SHON', userId:null, businessName:'Shonen Store',  sells:'Manga volumes & box sets',              startingPrice:3500,  status:'approved', rating:4.7, sales:210, createdAt:Date.now()-86400000*45},
  ];
  const P = (id,sellerId,name,price,stock,category,img,rating,reviews,off)=>({id,sellerId,name,price,stock,category,img:img||null,rating,reviews,off:off||0,createdAt:Date.now()});
  const products = [
    P('PRD-LFY5','SLR-OTAK','Luffy Gear 5 Figure',25000,12,'Figures & Collectibles',IMG.fig1,4.8,120),
    P('PRD-NRTS','SLR-ANWN','Naruto Sage Mode Figure',22000,8,'Figures & Collectibles',IMG.fig2,4.9,512,22),
    P('PRD-GOJO','SLR-ANWN','Gojo Satoru Hoodie',18000,25,'Clothing & Apparel',IMG.hood1,4.7,95),
    P('PRD-DSLP','SLR-MGDN','Demon Slayer Poster',3500,60,'Posters & Wall Art',IMG.poster1,4.9,80),
    P('PRD-JJKM','SLR-SHON','Jujutsu Kaisen Vol. 0-20',28000,6,'Manga & Books',IMG.manga1,4.8,60),
    P('PRD-OSTP','SLR-OTAK','Anime Soundtrack Pack',1500,999,'Digital Products',null,4.6,70),
    P('PRD-AKTK','SLR-OTAK','Akatsuki Cloak Figure',31000,4,'Figures & Collectibles',IMG.fig3,4.9,210),
    P('PRD-MKSA','SLR-ANWN','Mikasa Street Hoodie',16500,18,'Clothing & Apparel',IMG.hood2,4.6,44),
    P('PRD-OPBX','SLR-SHON','One Piece Box Set',32000,9,'Manga & Books',IMG.manga2,4.8,130),
    P('PRD-TKGH','SLR-MGDN','Retro Anime Poster Set',4000,40,'Posters & Wall Art',IMG.poster2,4.7,58),
    P('PRD-CHIB','SLR-OTAK','Chibi Figure Bundle',12500,15,'Figures & Collectibles',IMG.fig4,4.7,88),
  ];
  LS.set('users', []);
  LS.set('sellers', []);
  LS.set('products', []);
  LS.set('admins', [{id:'ADM-ROOT', username:'admin', password:'anilyfe@admin', createdAt:Date.now()}]);
  LS.set('cart', []);
  LS.set('wishlist', []);
  LS.set('dealEnd', Date.now() + (2*86400 + 14*3600 + 35*60 + 42)*1000);
  LS.set('seeded', true);
}

