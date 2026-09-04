/**
 * ANILyfe Notification Service
 * Handles categorized seller alerts across orders, products, finances, KYC verification, and security.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_notifications';

  function defaultNotifications() {
    return [
      {
        id: 'NOTIF-01',
        category: 'orders',
        type: 'order_received',
        title: 'New Order Received (#ORD-ANL-8821)',
        message: 'Efe Okafor ordered 1x Monkey D. Luffy Gear 5 Masterpiece Figure (₦22,500). Please pack and confirm.',
        timestamp: '15 minutes ago',
        date: '2026-09-04T08:30:00Z',
        read: false,
        link: '#/seller/orders'
      },
      {
        id: 'NOTIF-02',
        category: 'products',
        type: 'product_rejected',
        title: 'Product Requires Revision (#PRD-OPBX)',
        message: 'One Piece Wano Kuni Arc Box Set was rejected by admin: "Photos must show the ISBN seal and actual box set exterior."',
        timestamp: '2 hours ago',
        date: '2026-09-04T06:45:00Z',
        read: false,
        link: '#/seller/products'
      },
      {
        id: 'NOTIF-03',
        category: 'financial',
        type: 'payout_available',
        title: 'Payout Ready for Withdrawal',
        message: 'Your available balance of ₦320,000 has settled and is available for payout to your registered bank account.',
        timestamp: '1 day ago',
        date: '2026-09-03T10:00:00Z',
        read: false,
        link: '#/seller/earnings'
      },
      {
        id: 'NOTIF-04',
        category: 'products',
        type: 'product_approved',
        title: 'Product Approved by Marketplace Admin',
        message: 'Jujutsu Kaisen "Domain Expansion" Cyber-Heavyweight Hoodie was approved and published to the live marketplace.',
        timestamp: '2 days ago',
        date: '2026-09-02T14:00:00Z',
        read: true,
        link: '#/seller/products'
      },
      {
        id: 'NOTIF-05',
        category: 'verification',
        type: 'verification_approved',
        title: 'KYC Seller Verification Active',
        message: 'Your Tier-1 Seller Verification was reviewed and verified. Verified Seller badge is active.',
        timestamp: '4 days ago',
        date: '2026-08-31T11:00:00Z',
        read: true,
        link: '#/seller/verification'
      },
      {
        id: 'NOTIF-06',
        category: 'security',
        type: 'login_new',
        title: 'New Sign-in from Lagos',
        message: 'Successful seller session started from Chrome on Windows 11 (IP: 102.89.44.12).',
        timestamp: 'Today at 07:15',
        date: '2026-09-04T07:15:00Z',
        read: true,
        link: '#/seller/settings'
      }
    ];
  }

  function getStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultNotifications();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    return def;
  }

  const notificationService = {
    async getNotifications(category = 'All') {
      await new Promise(r => setTimeout(r, 30));
      let list = getStored();
      if (category && category !== 'All') {
        list = list.filter(n => n.category.toLowerCase() === category.toLowerCase());
      }
      return list;
    },

    async getUnreadCount() {
      const list = getStored();
      return list.filter(n => !n.read).length;
    },

    async markAsRead(id) {
      const list = getStored();
      const item = list.find(n => n.id === id);
      if (item) item.read = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('anilyfe:notifications-updated'));
      return true;
    },

    async markAllAsRead() {
      const list = getStored();
      list.forEach(n => { n.read = true; });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('anilyfe:notifications-updated'));
      return true;
    },

    async addNotification(notif) {
      const list = getStored();
      list.unshift({
        id: `NOTIF-${Date.now().toString(36).toUpperCase()}`,
        timestamp: 'Just now',
        date: new Date().toISOString(),
        read: false,
        ...notif
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('anilyfe:notifications-updated'));
      return list[0];
    }
  };

  window.notificationService = notificationService;
})();
