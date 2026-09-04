/**
 * ANILyfe Seller Service
 * Handles seller profile, store status, Founding Seller assignment, and commission data.
 * Designed as a clean async service layer ready for REST/GraphQL backend integration.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_profile';

  function defaultSeller() {
    return {
      id: 'SLR-001',
      accountId: 'ACC-8921',
      storeName: 'Abyss Atelier',
      slug: 'abyss-atelier',
      logo: 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300',
      banner: 'https://images.pexels.com/photos/34634037/pexels-photo-34634037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800',
      description: 'Premium anime figures, apparel, collectibles, and boutique essentials curated for anime fans and collectors across Nigeria and West Africa.',
      category: 'Figures & Collectibles',
      country: 'Nigeria',
      state: 'Lagos',
      city: 'Lekki Phase 1',
      contact: {
        phone: '+234 802 345 6789',
        email: 'store@abyss-atelier.ng',
        dispatchAddress: 'Suite 4B, Cyber Plaza, Admiralty Way, Lekki Phase 1, Lagos'
      },
      rating: 4.9,
      reviewCount: 142,
      verificationStatus: 'Verified', // Not Started | Information Required | Under Review | Verified | Rejected | Suspended
      badges: [
        { id: 'founding', name: 'Founding Seller #001', type: 'founding', active: true },
        { id: 'verified', name: 'Verified Seller', type: 'verified', active: true }
      ],
      foundingSellerNumber: '001', // Assigned manually by Admin; seller cannot modify
      foundingSellerActive: true,
      commissionRate: {
        rate: 15, // Default 15% ANILyfe commission rate
        label: 'Standard Seller (15%)',
        type: 'standard',
        lastUpdatedByAdmin: '2026-08-01',
        notice: 'Marketplace commission is determined authoritatively by the backend platform.'
      },
      storeStatus: 'Live', // Live | Temporarily Closed | Suspended | Under Review
      featuredProductIds: ['PRD-LFY5', 'PRD-GOJO', 'PRD-NRTS'],
      deliverySettings: {
        local: true,
        nationwide: true,
        pickup: true,
        freeShippingInState: true,
        sameStateFee: 2000,
        outsideStateFee: 4500,
        dispatchLocation: 'Lekki Warehouse, Lagos',
        processingTime: '1-3 business days',
        deliveryInstructions: 'All fragile collectibles are double-bubble wrapped in anti-shock cartons.',
        pickupInstructions: 'Pickup available Mon-Fri 10am - 5pm with valid order code.'
      },
      returnPolicy: '7-day return window for unopened and factory-sealed collectibles. Return shipping covered by seller if item arrived damaged.',
      refundPolicy: 'Verified refunds are credited to original payment source within 3-5 business days upon item inspection.',
      createdAt: '2026-06-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    };
  }

  function getStoredProfile() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading seller profile', e);
    }
    const def = defaultSeller();
    saveProfile(def);
    return def;
  }

  function saveProfile(profile) {
    profile.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }

  const sellerService = {
    async getProfile() {
      // Simulate network latency for realistic UI behavior
      await new Promise(r => setTimeout(r, 40));
      return getStoredProfile();
    },

    async updateStore(storeUpdates) {
      await new Promise(r => setTimeout(r, 60));
      const current = getStoredProfile();
      
      // Prevent seller from tampering with sensitive backend-controlled fields:
      const { commissionRate, foundingSellerNumber, foundingSellerActive, badges, verificationStatus, ...allowedUpdates } = storeUpdates;
      
      const updated = {
        ...current,
        ...allowedUpdates,
        contact: {
          ...current.contact,
          ...(allowedUpdates.contact || {})
        }
      };

      saveProfile(updated);
      window.dispatchEvent(new CustomEvent('anilyfe:seller-updated', { detail: updated }));
      return updated;
    },

    async setStoreStatus(newStatus) {
      await new Promise(r => setTimeout(r, 50));
      const allowed = ['Live', 'Temporarily Closed', 'Suspended', 'Under Review'];
      if (!allowed.includes(newStatus)) {
        throw new Error(`Invalid store status: ${newStatus}`);
      }
      const current = getStoredProfile();
      current.storeStatus = newStatus;
      saveProfile(current);
      window.dispatchEvent(new CustomEvent('anilyfe:seller-updated', { detail: current }));
      return current;
    },

    async getFoundingSellerBadge() {
      const profile = getStoredProfile();
      if (profile.foundingSellerActive && profile.foundingSellerNumber) {
        return {
          number: profile.foundingSellerNumber,
          label: `Founding Seller #${profile.foundingSellerNumber}`,
          active: true
        };
      }
      return null;
    },

    async getCommissionRate() {
      const profile = getStoredProfile();
      // Strictly read-only to frontend
      return profile.commissionRate;
    },

    async updateFeaturedProducts(productIds) {
      const profile = getStoredProfile();
      profile.featuredProductIds = productIds;
      saveProfile(profile);
      return profile;
    }
  };

  window.sellerService = sellerService;
})();
