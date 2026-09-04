/**
 * ANILyfe Product Service
 * Handles product catalog, multi-step creation data, variant management,
 * and the strict product approval lifecycle:
 * Draft -> Pending Approval -> Admin Review -> Approved -> Published
 * Rejected -> Rejection Reason -> Fix -> Resubmit -> Pending Approval
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_products';

  function defaultProducts() {
    return [
      {
        id: 'PRD-LFY5',
        sellerId: 'SLR-001',
        name: 'Monkey D. Luffy Gear 5 "Sun God Nika" Masterpiece Figure',
        slug: 'luffy-gear-5-masterpiece-figure',
        brand: 'Bandai Spirits / Megahouse',
        category: 'Figures & Collectibles',
        subcategory: 'Scale Figures',
        price: 25000,
        discount: 10,
        salePrice: 22500,
        saleStartDate: '2026-09-01',
        saleEndDate: '2026-09-30',
        shortDescription: 'Official 24cm PVC master figure capturing Luffy in peak awakening Gear 5 form with dynamic celestial aura stand.',
        description: 'Immaculately detailed collectible sculpted with luminous cloud trails, celestial purple lightning arcs, and authentic anime-accurate metallic shading. Includes interchangeable smiling head sculpt and heavy duty acrylic display base.',
        images: [
          'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/38250877/pexels-photo-38250877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/38250875/pexels-photo-38250875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Celestial White', 'Sun Gold Accent'],
        sizes: ['Standard (24cm)'],
        variants: [
          { id: 'VAR-LFY-01', color: 'Celestial White', size: 'Standard (24cm)', sku: 'ANL-LFY5-WHT', price: 25000, stock: 8, available: true },
          { id: 'VAR-LFY-02', color: 'Sun Gold Accent', size: 'Standard (24cm)', sku: 'ANL-LFY5-GLD', price: 27500, stock: 4, available: true }
        ],
        sku: 'ANL-LFY5-NIKA',
        stock: 12,
        inventory: {
          reserved: 2,
          available: 10,
          lowStockThreshold: 5
        },
        shipping: {
          weightKg: 1.2,
          fragile: true,
          freeShippingInState: true,
          dispatchDays: '1-2 business days'
        },
        approvalStatus: 'Published', // Draft | Pending Approval | Approved | Published | Rejected | Out of Stock | Archived
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: '2026-08-10T14:00:00Z',
        createdAt: '2026-08-01T10:00:00Z',
        updatedAt: '2026-09-02T12:00:00Z',
        rating: 4.9,
        reviewsCount: 38
      },
      {
        id: 'PRD-GOJO',
        sellerId: 'SLR-001',
        name: 'Jujutsu Kaisen "Domain Expansion" Cyber-Heavyweight Hoodie',
        slug: 'jjk-domain-expansion-cyber-hoodie',
        brand: 'Abyss Wear Lab',
        category: 'Clothing & Apparel',
        subcategory: 'Hoodies & Sweatshirts',
        price: 18000,
        discount: 15,
        salePrice: 15300,
        saleStartDate: '2026-09-01',
        saleEndDate: '2026-09-20',
        shortDescription: '450 GSM French terry anime techwear hoodie with reflective holographic Gojo infinite void typography.',
        description: 'Engineered for comfort and high-impact streetwear styling in Lagos climate. Heavyweight breathable cotton, double-lined hood, and high-density Japanese kanji screen-print with metallic thread highlights.',
        images: [
          'https://images.pexels.com/photos/607961/pexels-photo-607961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/34247821/pexels-photo-34247821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Onyx Black', 'Electric Blue', 'Chalk White'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        variants: [
          { id: 'VAR-GOJ-01', color: 'Onyx Black', size: 'M', sku: 'ANL-JJK-BLK-M', price: 18000, stock: 6, available: true },
          { id: 'VAR-GOJ-02', color: 'Onyx Black', size: 'L', sku: 'ANL-JJK-BLK-L', price: 18000, stock: 8, available: true },
          { id: 'VAR-GOJ-03', color: 'Onyx Black', size: 'XL', sku: 'ANL-JJK-BLK-XL', price: 18000, stock: 4, available: true },
          { id: 'VAR-GOJ-04', color: 'Electric Blue', size: 'M', sku: 'ANL-JJK-BLU-M', price: 18000, stock: 3, available: true },
          { id: 'VAR-GOJ-05', color: 'Electric Blue', size: 'L', sku: 'ANL-JJK-BLU-L', price: 18000, stock: 4, available: true }
        ],
        sku: 'ANL-JJK-TECH-01',
        stock: 25,
        inventory: {
          reserved: 4,
          available: 21,
          lowStockThreshold: 8
        },
        shipping: {
          weightKg: 0.8,
          fragile: false,
          freeShippingInState: true,
          dispatchDays: '1-2 business days'
        },
        approvalStatus: 'Published',
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: '2026-08-14T11:00:00Z',
        createdAt: '2026-08-05T09:00:00Z',
        updatedAt: '2026-09-01T15:00:00Z',
        rating: 4.8,
        reviewsCount: 29
      },
      {
        id: 'PRD-NRTS',
        sellerId: 'SLR-001',
        name: 'Naruto Shippuden Sage Mode Collector Edition Figure (26cm)',
        slug: 'naruto-sage-mode-collector-figure',
        brand: 'Kotobukiya ArtFX',
        category: 'Figures & Collectibles',
        subcategory: 'Scale Figures',
        price: 22000,
        discount: 0,
        salePrice: 22000,
        shortDescription: 'Sage Mode Naruto with giant summoning scroll and interchangeable toad flame hands.',
        description: 'Authentic licensed PVC & ABS figure featuring master-painted orange pigment eyelids, realistic textured cape, and stone-carved Mount Myoboku pedestal.',
        images: [
          'https://images.pexels.com/photos/38250877/pexels-photo-38250877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Sage Orange'],
        sizes: ['Standard (26cm)'],
        variants: [
          { id: 'VAR-NRT-01', color: 'Sage Orange', size: 'Standard (26cm)', sku: 'ANL-NAR-SAGE-01', price: 22000, stock: 5, available: true }
        ],
        sku: 'ANL-NAR-SAGE-01',
        stock: 5,
        inventory: {
          reserved: 1,
          available: 4,
          lowStockThreshold: 5
        },
        shipping: {
          weightKg: 1.1,
          fragile: true,
          freeShippingInState: true,
          dispatchDays: '2-3 business days'
        },
        approvalStatus: 'Pending Approval', // Waiting for Admin review
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: null,
        createdAt: '2026-08-25T14:30:00Z',
        updatedAt: '2026-08-25T14:30:00Z',
        rating: 4.8,
        reviewsCount: 14
      },
      {
        id: 'PRD-DSLP',
        sellerId: 'SLR-001',
        name: 'Demon Slayer: Kimetsu no Yaiba Infinity Castle Foil Poster',
        slug: 'demon-slayer-infinity-castle-foil-poster',
        brand: 'Ufotable Originals',
        category: 'Posters & Wall Art',
        subcategory: 'Metallic Foil Prints',
        price: 3500,
        discount: 0,
        salePrice: 3500,
        shortDescription: 'Museum grade 300gsm metallic foil paper print depicting the Upper Moons confrontation.',
        description: 'High dynamic range CMYK offset print with selective holographic silver stamping on premium German cardstock. Ships rolled inside heavy PVC postal tube to prevent creases.',
        images: [
          'https://images.pexels.com/photos/3964758/pexels-photo-3964758.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/3091203/pexels-photo-3091203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Holo Foil Dark'],
        sizes: ['A3 (30x42cm)', 'A2 (42x59cm)'],
        variants: [
          { id: 'VAR-DS-01', color: 'Holo Foil Dark', size: 'A3 (30x42cm)', sku: 'ANL-DS-A3', price: 3500, stock: 0, available: false },
          { id: 'VAR-DS-02', color: 'Holo Foil Dark', size: 'A2 (42x59cm)', sku: 'ANL-DS-A2', price: 5500, stock: 0, available: false }
        ],
        sku: 'ANL-DS-FOIL',
        stock: 0,
        inventory: {
          reserved: 0,
          available: 0,
          lowStockThreshold: 10
        },
        shipping: {
          weightKg: 0.3,
          fragile: false,
          freeShippingInState: false,
          dispatchDays: '1-2 business days'
        },
        approvalStatus: 'Out of Stock', // Automatically designated out of stock
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: '2026-07-15T10:00:00Z',
        createdAt: '2026-07-01T12:00:00Z',
        updatedAt: '2026-08-30T09:00:00Z',
        rating: 4.9,
        reviewsCount: 51
      },
      {
        id: 'PRD-OPBX',
        sellerId: 'SLR-001',
        name: 'One Piece Wano Kuni Arc Luxury Hardcover Box Set Vol 1-3',
        slug: 'one-piece-wano-box-set-hardcover',
        brand: 'Shueisha Manga Imports',
        category: 'Manga & Books',
        subcategory: 'Box Sets',
        price: 32000,
        discount: 10,
        salePrice: 28800,
        shortDescription: 'Collector slipcase containing full color Wano act 1 to 3 with translated creator commentary.',
        description: 'Deluxe gold embossed collector box with velvet inner liner. Includes mini sketchbook and exclusive Oda illustration card.',
        images: [
          'https://images.pexels.com/photos/6214570/pexels-photo-6214570.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          'https://images.pexels.com/photos/18848524/pexels-photo-18848524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Crimson Gold'],
        sizes: ['Box Set Edition'],
        variants: [
          { id: 'VAR-OP-01', color: 'Crimson Gold', size: 'Box Set Edition', sku: 'ANL-OP-WANO-BX', price: 32000, stock: 7, available: true }
        ],
        sku: 'ANL-OP-WANO-SET',
        stock: 7,
        inventory: {
          reserved: 0,
          available: 7,
          lowStockThreshold: 4
        },
        shipping: {
          weightKg: 2.4,
          fragile: false,
          freeShippingInState: true,
          dispatchDays: '2-4 business days'
        },
        approvalStatus: 'Rejected', // Rejected by marketplace admin
        rejectionReason: 'Product photos must include at least one clear shot showing the ISBN seal and actual box set exterior in natural studio lighting. Stock mockups alone are insufficient.',
        rejectedAt: '2026-09-02T16:45:00Z',
        publishedAt: null,
        createdAt: '2026-08-28T10:00:00Z',
        updatedAt: '2026-09-02T16:45:00Z',
        rating: 4.7,
        reviewsCount: 11
      },
      {
        id: 'PRD-DRAFT-01',
        sellerId: 'SLR-001',
        name: 'Chainsaw Man Denji & Pochita Dual PVC Figure',
        slug: 'chainsaw-man-denji-pochita-figure',
        brand: 'Good Smile Company',
        category: 'Figures & Collectibles',
        subcategory: 'Pop Up Parade',
        price: 16500,
        discount: 0,
        salePrice: 16500,
        shortDescription: 'Pop Up Parade 18cm Denji pulling starter cord with companion Pochita desk miniature.',
        description: 'Vibrant pop-art finish with metallic chrome effect on chainsaw head and arm attachments.',
        images: [
          'https://images.pexels.com/photos/16075343/pexels-photo-16075343.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: ['Classic Orange / Blood Red'],
        sizes: ['18cm'],
        variants: [
          { id: 'VAR-CSM-01', color: 'Classic Orange / Blood Red', size: '18cm', sku: 'ANL-CSM-DENJI', price: 16500, stock: 15, available: true }
        ],
        sku: 'ANL-CSM-DENJI-01',
        stock: 15,
        inventory: {
          reserved: 0,
          available: 15,
          lowStockThreshold: 5
        },
        shipping: {
          weightKg: 0.9,
          fragile: true,
          freeShippingInState: true,
          dispatchDays: '1-3 business days'
        },
        approvalStatus: 'Draft',
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: null,
        createdAt: '2026-09-03T18:00:00Z',
        updatedAt: '2026-09-03T18:00:00Z',
        rating: 5.0,
        reviewsCount: 0
      }
    ];
  }

  function getStoredProducts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading products', e);
    }
    const def = defaultProducts();
    saveProducts(def);
    return def;
  }

  function saveProducts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    // Also sync to global ANILyfe products if needed
    try {
      const globalProducts = JSON.parse(localStorage.getItem('anilyfe_products')) || [];
      // Replace or merge seller's published products into the public marketplace list
      const published = list.filter(p => ['Published', 'Approved', 'Out of Stock'].includes(p.approvalStatus));
      const others = globalProducts.filter(p => p.sellerId !== 'SLR-001');
      const formattedForMarketplace = published.map(p => ({
        id: p.id,
        sellerId: p.sellerId,
        name: p.name,
        slug: p.slug,
        price: p.salePrice || p.price,
        stock: p.stock,
        category: p.category,
        img: p.images && p.images[0] ? p.images[0] : null,
        images: p.images,
        rating: p.rating || 4.8,
        reviews: p.reviewsCount || 0,
        off: p.discount || 0,
        description: p.description,
        variants: p.variants,
        colors: p.colors,
        sizes: p.sizes,
        sku: p.sku,
        approvalStatus: p.approvalStatus,
        createdAt: new Date(p.createdAt).getTime()
      }));
      localStorage.setItem('anilyfe_products', JSON.stringify([...others, ...formattedForMarketplace]));
    } catch (e) {
      // ignore sync errors
    }
  }

  const productService = {
    async getProducts(filter = {}) {
      await new Promise(r => setTimeout(r, 40));
      let list = getStoredProducts();

      if (filter.status && filter.status !== 'All') {
        if (filter.status === 'Active' || filter.status === 'Published') {
          list = list.filter(p => p.approvalStatus === 'Published');
        } else if (filter.status === 'Drafts') {
          list = list.filter(p => p.approvalStatus === 'Draft');
        } else {
          list = list.filter(p => p.approvalStatus === filter.status);
        }
      }

      if (filter.category && filter.category !== 'All') {
        list = list.filter(p => p.category === filter.category);
      }

      if (filter.search) {
        const query = filter.search.toLowerCase().trim();
        list = list.filter(p =>
          (p.name && p.name.toLowerCase().includes(query)) ||
          (p.sku && p.sku.toLowerCase().includes(query)) ||
          (p.category && p.category.toLowerCase().includes(query))
        );
      }

      return list;
    },

    async getProductById(id) {
      await new Promise(r => setTimeout(r, 30));
      const list = getStoredProducts();
      return list.find(p => p.id === id) || null;
    },

    async getProductBySlug(slug) {
      await new Promise(r => setTimeout(r, 30));
      const list = getStoredProducts();
      return list.find(p => p.slug === slug || p.id === slug) || null;
    },

    async createProduct(data) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredProducts();
      const id = `PRD-${Date.now().toString(36).toUpperCase()}`;
      const slug = (data.name || 'product')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const basePrice = Number(data.price || 0);
      const discount = Number(data.discount || 0);
      const salePrice = discount > 0 ? Math.round(basePrice * (1 - discount / 100)) : basePrice;

      // Calculate aggregate stock from variants if variants are supplied
      let variants = Array.isArray(data.variants) && data.variants.length ? data.variants : [
        {
          id: `VAR-${Date.now()}-1`,
          color: (data.colors && data.colors[0]) || 'Standard',
          size: (data.sizes && data.sizes[0]) || 'Standard',
          sku: data.sku || `SKU-${id}`,
          price: basePrice,
          stock: Number(data.stock || 10),
          available: true
        }
      ];

      const totalStock = variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);

      const newProduct = {
        id,
        sellerId: 'SLR-001',
        name: data.name || 'Untitled Product',
        slug,
        brand: data.brand || '',
        category: data.category || 'Figures & Collectibles',
        subcategory: data.subcategory || '',
        price: basePrice,
        discount,
        salePrice,
        saleStartDate: data.saleStartDate || '',
        saleEndDate: data.saleEndDate || '',
        shortDescription: data.shortDescription || '',
        description: data.description || '',
        images: Array.isArray(data.images) && data.images.length ? data.images : [
          'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
        ],
        colors: data.colors || ['Standard'],
        sizes: data.sizes || ['Standard'],
        variants,
        sku: data.sku || `ANL-${id}`,
        stock: totalStock,
        inventory: {
          reserved: 0,
          available: totalStock,
          lowStockThreshold: Number(data.lowStockThreshold || 5)
        },
        shipping: data.shipping || {
          weightKg: Number(data.weightKg || 1),
          fragile: Boolean(data.fragile),
          freeShippingInState: true,
          dispatchDays: '1-3 business days'
        },
        // STRICT REQUIREMENT: When submitting for approval, product goes to 'Pending Approval', NEVER directly to 'Approved' or 'Published'
        approvalStatus: data.submitForApproval ? 'Pending Approval' : 'Draft',
        rejectionReason: null,
        rejectedAt: null,
        publishedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: 5.0,
        reviewsCount: 0
      };

      list.unshift(newProduct);
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return newProduct;
    },

    async updateProduct(id, updates) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredProducts();
      const index = list.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');

      const existing = list[index];

      // SECURITY REQUIREMENT: Sellers cannot set approvalStatus directly to Approved or Published!
      if (updates.approvalStatus && ['Approved', 'Published'].includes(updates.approvalStatus) && !updates.__adminOverride) {
        delete updates.approvalStatus;
      }

      const basePrice = updates.price !== undefined ? Number(updates.price) : existing.price;
      const discount = updates.discount !== undefined ? Number(updates.discount) : existing.discount;
      const salePrice = discount > 0 ? Math.round(basePrice * (1 - discount / 100)) : basePrice;

      let variants = updates.variants || existing.variants;
      let totalStock = variants.reduce((sum, v) => sum + Number(v.stock || 0), 0);

      const updated = {
        ...existing,
        ...updates,
        price: basePrice,
        discount,
        salePrice,
        variants,
        stock: totalStock,
        inventory: {
          ...existing.inventory,
          available: Math.max(0, totalStock - (existing.inventory.reserved || 0)),
          ...(updates.inventory || {})
        },
        updatedAt: new Date().toISOString()
      };

      list[index] = updated;
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return updated;
    },

    async submitForApproval(id) {
      // Moves Draft or Rejected product to Pending Approval
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');

      item.approvalStatus = 'Pending Approval';
      item.rejectionReason = null;
      item.rejectedAt = null;
      item.updatedAt = new Date().toISOString();

      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return item;
    },

    async resubmitRejected(id, fixes = {}) {
      // Allows seller to update product with corrections and resubmit to Pending Approval
      await new Promise(r => setTimeout(r, 70));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');

      Object.assign(item, fixes);
      item.approvalStatus = 'Pending Approval';
      item.rejectionReason = null;
      item.rejectedAt = null;
      item.updatedAt = new Date().toISOString();

      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return item;
    },

    async archiveProduct(id) {
      await new Promise(r => setTimeout(r, 50));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');
      item.approvalStatus = 'Archived';
      item.updatedAt = new Date().toISOString();
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return item;
    },

    async restoreProduct(id) {
      await new Promise(r => setTimeout(r, 50));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');
      item.approvalStatus = item.stock > 0 ? 'Published' : 'Draft';
      item.updatedAt = new Date().toISOString();
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return item;
    },

    async duplicateProduct(id) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');

      const dupId = `PRD-${Date.now().toString(36).toUpperCase()}`;
      const copy = JSON.parse(JSON.stringify(item));
      copy.id = dupId;
      copy.name = `${item.name} (Copy)`;
      copy.slug = `${item.slug}-copy-${Date.now().toString(36).slice(-4)}`;
      copy.approvalStatus = 'Draft';
      copy.rejectionReason = null;
      copy.rejectedAt = null;
      copy.publishedAt = null;
      copy.createdAt = new Date().toISOString();
      copy.updatedAt = new Date().toISOString();

      list.unshift(copy);
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return copy;
    },

    async deleteDraft(id) {
      await new Promise(r => setTimeout(r, 50));
      const list = getStoredProducts();
      const index = list.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      if (list[index].approvalStatus !== 'Draft') {
        throw new Error('Only draft products can be permanently deleted');
      }
      list.splice(index, 1);
      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return true;
    },

    /**
     * Admin Simulator Method
     * Used ONLY to demonstrate the approval lifecycle in this prototype.
     * Real backend executes this securely in the Admin Service.
     */
    async simulateAdminReview(id, decision, reason = '') {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredProducts();
      const item = list.find(p => p.id === id);
      if (!item) throw new Error('Product not found');

      if (decision === 'approve') {
        item.approvalStatus = 'Published';
        item.publishedAt = new Date().toISOString();
        item.rejectionReason = null;
      } else if (decision === 'reject') {
        item.approvalStatus = 'Rejected';
        item.rejectionReason = reason || 'Product specifications do not meet marketplace standards. Please provide studio photos and accurate sizing.';
        item.rejectedAt = new Date().toISOString();
      }
      item.updatedAt = new Date().toISOString();

      saveProducts(list);
      window.dispatchEvent(new CustomEvent('anilyfe:products-updated'));
      return item;
    }
  };

  window.productService = productService;
})();
