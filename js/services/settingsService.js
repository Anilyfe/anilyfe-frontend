/**
 * ANILyfe Settings Service
 * Manages seller preferences, security settings, 12 granular notification toggles,
 * store operating modes, and dangerous store management actions.
 * Security: Commission settings are explicitly absent / locked to backend authority.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_settings';

  function defaultSettings() {
    const user = window.currentUser ? window.currentUser() : null;
    return {
      account: { name: user?.name || '', email: user?.email || '', phone: user?.phone || '', avatar: user?.profilePicture || '' },
      notifications: { orders:true, payments:true, shipping:true, returns:true, refunds:true, reviews:true, questions:true, productApproval:true, productRejection:true, verification:true, security:true, announcements:false },
      payoutSchedule: '',
      security: { twoFactorEnabled:false, twoFactorMethod:'', activeSessions:[], loginHistory:[] },
      privacy: { storeVisibility:'Public', searchIndexing:true },
      storeStatus:'Live', updatedAt:new Date().toISOString()
    };
  }

  function getStoredSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultSettings();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    return def;
  }

  const settingsService = {
    async getSettings() {
      await new Promise(r => setTimeout(r, 40));
      return getStoredSettings();
    },

    async updateAccount(accountData) {
      await new Promise(r => setTimeout(r, 50));
      const s = getStoredSettings();
      s.account = { ...s.account, ...accountData };
      s.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      window.dispatchEvent(new CustomEvent('anilyfe:settings-updated'));
      return s.account;
    },

    async updateNotifications(toggles) {
      await new Promise(r => setTimeout(r, 50));
      const s = getStoredSettings();
      s.notifications = { ...s.notifications, ...toggles };
      s.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      window.dispatchEvent(new CustomEvent('anilyfe:settings-updated'));
      return s.notifications;
    },

    async toggle2FA(enabled) {
      await new Promise(r => setTimeout(r, 60));
      const s = getStoredSettings();
      s.security.twoFactorEnabled = enabled;
      s.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      window.dispatchEvent(new CustomEvent('anilyfe:settings-updated'));
      return s.security;
    },

    async logoutAllOtherSessions() {
      await new Promise(r => setTimeout(r, 50));
      const s = getStoredSettings();
      s.security.activeSessions = s.security.activeSessions.filter(x => x.current);
      s.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      window.dispatchEvent(new CustomEvent('anilyfe:settings-updated'));
      return s.security.activeSessions;
    },

    async setStoreStatus(newStatus) {
      await new Promise(r => setTimeout(r, 60));
      const s = getStoredSettings();
      s.storeStatus = newStatus;
      s.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      // Also sync to sellerService profile
      await window.sellerService.setStoreStatus(newStatus);
      return s.storeStatus;
    }
  };

  window.settingsService = settingsService;
})();
