/**
 * ANILyfe Store Service
 * Manages seller storefront branding, policies, featured product curation, and public store URL.
 * Strictly marketplace storefront management: No social feeds or followers.
 */
(function() {
  const storeService = {
    async getStorefront() {
      const profile = await window.sellerService.getProfile();
      const allProducts = await window.productService.getProducts();

      // Only published or approved products appear on the public storefront
      const publicProducts = allProducts.filter(p =>
        ['Published', 'Approved', 'Out of Stock'].includes(p.approvalStatus)
      );

      const featured = publicProducts.filter(p =>
        profile.featuredProductIds && profile.featuredProductIds.includes(p.id)
      );

      return {
        profile,
        products: publicProducts,
        featuredProducts: featured.length ? featured : publicProducts.slice(0, 3),
        shareUrl: `${window.location.origin}/#/store/${profile.slug}`
      };
    },

    async updateStorefront(data) {
      return window.sellerService.updateStore(data);
    },

    getShareableLink(slug) {
      const base = window.location.origin + window.location.pathname;
      return `${base}#/store/${slug || 'abyss-atelier'}`;
    }
  };

  window.storeService = storeService;
})();
