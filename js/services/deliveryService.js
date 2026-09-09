/**
 * ANILyfe Delivery & Shipping Service
 * Manages seller shipping rules, in-state free shipping, nationwide rates,
 * dispatch locations, and pickup instructions.
 * Security: The final shipping calculation is performed authoritatively on backend.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_delivery';

  function defaultDelivery() { return {localDelivery:true,nationwideDelivery:true,pickupAvailable:false,freeShippingInState:false,sameStateFee:0,outsideStateFee:0,dispatchLocation:'',dispatchState:'',processingTime:'',deliveryInstructions:'',pickupInstructions:'',supportedCouriers:[],updatedAt:new Date().toISOString()}; }

  function getStoredDelivery() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultDelivery();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    return def;
  }

  const deliveryService = {
    async getSettings() {
      await new Promise(r => setTimeout(r, 40));
      return getStoredDelivery();
    },

    async updateSettings(updates) {
      await new Promise(r => setTimeout(r, 60));
      const current = getStoredDelivery();
      const updated = {
        ...current,
        ...updates,
        sameStateFee: Number(updates.sameStateFee !== undefined ? updates.sameStateFee : current.sameStateFee),
        outsideStateFee: Number(updates.outsideStateFee !== undefined ? updates.outsideStateFee : current.outsideStateFee),
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('anilyfe:delivery-updated', { detail: updated }));
      return updated;
    },

    /**
     * Backend Simulation:
     * Calculates fee based on customer's state versus seller's state
     */
    async simulateCalculateShipping(customerState) {
      const settings = getStoredDelivery();
      const isSameState = (customerState || '').toLowerCase().trim() === settings.dispatchState.toLowerCase().trim();

      if (!settings.dispatchState) return {isSameState:false,fee:settings.outsideStateFee||0,isFree:false,label:'Shipping rate not configured'};
      if (isSameState) {
        return {
          isSameState: true,
          fee: settings.freeShippingInState ? 0 : settings.sameStateFee,
          isFree: settings.freeShippingInState,
          label: settings.freeShippingInState ? `Free In-State Delivery (${settings.dispatchState})` : `Standard ${settings.dispatchState} Delivery`
        };
      } else {
        return {
          isSameState: false,
          fee: settings.outsideStateFee,
          isFree: false,
          label: `Nationwide Shipping (${customerState})`
        };
      }
    }
  };

  window.deliveryService = deliveryService;
})();
