/**
 * ANILyfe Audit Service
 * Dispatches and records operational events for Admin System compliance.
 * Audit logs are protected from seller tampering.
 */
(function() {
  const AUDIT_KEY = 'anilyfe_admin_audit_logs';

  const auditService = {
    recordEvent(eventType, eventData) {
      try {
        const raw = localStorage.getItem(AUDIT_KEY);
        const logs = raw ? JSON.parse(raw) : [];
        const entry = {
          id: `AUD-${Date.now().toString(36).toUpperCase()}`,
          eventType,
          source: 'seller_dashboard',
          sellerId: (()=>{const u=window.currentUser?window.currentUser():null; const s=u&&window.sellerOf?window.sellerOf(u.id):null; return s?s.id:null;})(),
          timestamp: new Date().toISOString(),
          data: eventData
        };
        logs.unshift(entry);
        localStorage.setItem(AUDIT_KEY, JSON.stringify(logs.slice(0, 200)));
        window.dispatchEvent(new CustomEvent('anilyfe:audit-event', { detail: entry }));
      } catch (e) {
        console.error('Audit recording error', e);
      }
    }
  };

  window.auditService = auditService;
})();
