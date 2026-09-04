/**
 * ANILyfe Settings Service
 * Manages seller preferences, security settings, 12 granular notification toggles,
 * store operating modes, and dangerous store management actions.
 * Security: Commission settings are explicitly absent / locked to backend authority.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_settings';

  function defaultSettings() {
    return {
      account: {
        name: 'Kenji Takahashi',
        email: 'kenji@abyss-atelier.ng',
        phone: '+234 802 345 6789',
        avatar: 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300'
      },
      notifications: {
        orders: true,
        payments: true,
        shipping: true,
        returns: true,
        refunds: true,
        reviews: true,
        questions: true,
        productApproval: true,
        productRejection: true,
        verification: true,
        security: true,
        announcements: false
      },
      payoutSchedule: 'Bi-weekly', // Weekly | Bi-weekly | Monthly
      security: {
        twoFactorEnabled: true,
        twoFactorMethod: 'Authenticator App (TOTP)',
        activeSessions: [
          { id: 'SES-01', device: 'Chrome on Windows 11', location: 'Lagos, Nigeria', ip: '102.89.44.12', current: true, lastActive: 'Active now' },
          { id: 'SES-02', device: 'ANILyfe Mobile on Android', location: 'Lagos, Nigeria', ip: '105.112.23.88', current: false, lastActive: '4 hours ago' }
        ],
        loginHistory: [
          { date: '2026-09-04 07:15', device: 'Chrome / Windows', ip: '102.89.44.12', status: 'Success' },
          { date: '2026-09-03 14:22', device: 'Chrome / Windows', ip: '102.89.44.12', status: 'Success' },
          { date: '2026-09-01 09:04', device: 'Android App', ip: '105.112.23.88', status: 'Success' }
        ]
      },
      privacy: {
        storeVisibility: 'Public', // Public | Private
        searchIndexing: true
      },
      storeStatus: 'Live', // Live | Paused | Temporarily Closed | Closed
      updatedAt: new Date().toISOString()
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
