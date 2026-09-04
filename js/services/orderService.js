/**
 * ANILyfe Order Service
 * Handles order lifecycle, fulfillment state transitions, shipment tracking,
 * returns, and commission/earnings breakdown.
 * Security: Sellers cannot manipulate payment totals or commission rates.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_orders';

  function defaultOrders() {
    return [
      {
        id: 'ORD-ANL-8821',
        date: '2026-09-04T08:30:00Z',
        buyer: {
          name: 'Efe Okafor',
          email: 'efe.okafor@gmail.com',
          phone: '+234 803 112 4455',
          state: 'Lagos',
          city: 'Victoria Island',
          address: 'Plot 12, Bishop Aboyade Cole St, Victoria Island, Lagos'
        },
        items: [
          {
            productId: 'PRD-LFY5',
            productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
            productImage: 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Celestial White',
            size: 'Standard (24cm)',
            variant: 'Celestial White / Standard (24cm)',
            sku: 'ANL-LFY5-WHT',
            quantity: 1,
            unitPrice: 25000,
            discount: 2500,
            salePrice: 22500,
            commissionRate: 15,
            commissionAmount: 3375,
            sellerEarnings: 19125
          }
        ],
        subtotal: 25000,
        discountTotal: 2500,
        netProductTotal: 22500,
        shippingFee: 2000, // Lagos in-state shipping
        marketplaceCommission: 3375, // 15% of N22,500
        sellerEarnings: 21125, // N22,500 net - N3,375 comm + N2,000 shipping
        paymentStatus: 'Paid',
        orderStatus: 'New', // New | Confirmed | Processing | Ready to Ship | Shipped | Delivered | Cancelled | Return Requested | Returned
        deliveryStatus: 'Order Placed',
        courier: 'Kwik Delivery',
        trackingNumber: null,
        timeline: [
          { status: 'New', label: 'Order Placed & Paid', timestamp: '2026-09-04T08:30:00Z', note: 'Customer paid with Paystack (Verified).' }
        ]
      },
      {
        id: 'ORD-ANL-8820',
        date: '2026-09-03T15:20:00Z',
        buyer: {
          name: 'Moyo Adebayo',
          email: 'moyo.adebayo@yahoo.com',
          phone: '+234 818 990 2233',
          state: 'Lagos',
          city: 'Ikeja',
          address: '14 Allen Avenue, Ikeja, Lagos'
        },
        items: [
          {
            productId: 'PRD-GOJO',
            productName: 'Jujutsu Kaisen Cyber-Heavyweight Hoodie',
            productImage: 'https://images.pexels.com/photos/607961/pexels-photo-607961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Onyx Black',
            size: 'L',
            variant: 'Onyx Black / L',
            sku: 'ANL-JJK-BLK-L',
            quantity: 2,
            unitPrice: 18000,
            discount: 2700,
            salePrice: 15300,
            commissionRate: 15,
            commissionAmount: 4590,
            sellerEarnings: 26010
          }
        ],
        subtotal: 36000,
        discountTotal: 5400,
        netProductTotal: 30600,
        shippingFee: 2000,
        marketplaceCommission: 4590,
        sellerEarnings: 28010,
        paymentStatus: 'Paid',
        orderStatus: 'Processing',
        deliveryStatus: 'Being Packed',
        courier: 'GIG Logistics',
        trackingNumber: null,
        timeline: [
          { status: 'New', label: 'Order Placed', timestamp: '2026-09-03T15:20:00Z', note: 'Payment settled via Paystack.' },
          { status: 'Confirmed', label: 'Order Confirmed', timestamp: '2026-09-03T16:00:00Z', note: 'Confirmed by Abyss Atelier.' },
          { status: 'Processing', label: 'Processing in Lekki Warehouse', timestamp: '2026-09-03T17:15:00Z', note: 'Items picked and packaged with protective bubble wrap.' }
        ]
      },
      {
        id: 'ORD-ANL-8818',
        date: '2026-09-02T11:10:00Z',
        buyer: {
          name: 'Tolu Bassey',
          email: 'tolu.bassey@outlook.com',
          phone: '+234 809 443 1122',
          state: 'Abuja (FCT)',
          city: 'Maitama',
          address: 'House 8, Nile Street, Maitama District, Abuja'
        },
        items: [
          {
            productId: 'PRD-GOJO',
            productName: 'Jujutsu Kaisen Cyber-Heavyweight Hoodie',
            productImage: 'https://images.pexels.com/photos/607961/pexels-photo-607961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Electric Blue',
            size: 'M',
            variant: 'Electric Blue / M',
            sku: 'ANL-JJK-BLU-M',
            quantity: 1,
            unitPrice: 18000,
            discount: 0,
            salePrice: 18000,
            commissionRate: 15,
            commissionAmount: 2700,
            sellerEarnings: 15300
          }
        ],
        subtotal: 18000,
        discountTotal: 0,
        netProductTotal: 18000,
        shippingFee: 4500, // Nationwide outside-state rate
        marketplaceCommission: 2700,
        sellerEarnings: 19800,
        paymentStatus: 'Paid',
        orderStatus: 'Shipped',
        deliveryStatus: 'In Transit to Abuja Hub',
        courier: 'DHL Express',
        trackingNumber: 'DHL-NG-9920148',
        timeline: [
          { status: 'New', label: 'Order Placed', timestamp: '2026-09-02T11:10:00Z', note: 'Payment verified.' },
          { status: 'Confirmed', label: 'Order Confirmed', timestamp: '2026-09-02T11:45:00Z', note: 'Order approved.' },
          { status: 'Processing', label: 'Processing', timestamp: '2026-09-02T13:00:00Z', note: 'Package sealed.' },
          { status: 'Ready to Ship', label: 'Dispatched to Courier', timestamp: '2026-09-02T15:30:00Z', note: 'Handed over to DHL Lekki Facility.' },
          { status: 'Shipped', label: 'In Transit', timestamp: '2026-09-02T17:00:00Z', note: 'Tracking #DHL-NG-9920148. Scheduled Abuja delivery in 48h.' }
        ]
      },
      {
        id: 'ORD-ANL-8815',
        date: '2026-08-30T14:00:00Z',
        buyer: {
          name: 'Kemi Samuel',
          email: 'kemi.samuel@gmail.com',
          phone: '+234 813 778 0099',
          state: 'Rivers',
          city: 'Port Harcourt',
          address: '22 Peter Odili Road, Trans-Amadi, Port Harcourt'
        },
        items: [
          {
            productId: 'PRD-LFY5',
            productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
            productImage: 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Celestial White',
            size: 'Standard (24cm)',
            variant: 'Celestial White / Standard (24cm)',
            sku: 'ANL-LFY5-WHT',
            quantity: 1,
            unitPrice: 25000,
            discount: 0,
            salePrice: 25000,
            commissionRate: 15,
            commissionAmount: 3750,
            sellerEarnings: 21250
          }
        ],
        subtotal: 25000,
        discountTotal: 0,
        netProductTotal: 25000,
        shippingFee: 4500,
        marketplaceCommission: 3750,
        sellerEarnings: 25750,
        paymentStatus: 'Paid',
        orderStatus: 'Delivered',
        deliveryStatus: 'Delivered & Signed',
        courier: 'GIG Logistics',
        trackingNumber: 'GIG-PH-448201',
        timeline: [
          { status: 'New', label: 'Order Placed', timestamp: '2026-08-30T14:00:00Z', note: 'Payment verified.' },
          { status: 'Shipped', label: 'Dispatched to Port Harcourt', timestamp: '2026-08-31T10:00:00Z', note: 'Waybill #GIG-PH-448201.' },
          { status: 'Delivered', label: 'Delivered to Customer', timestamp: '2026-09-02T14:20:00Z', note: 'Signed for by recipient Kemi Samuel.' }
        ]
      },
      {
        id: 'ORD-ANL-8812',
        date: '2026-08-28T09:15:00Z',
        buyer: {
          name: 'Chinedu Eze',
          email: 'chinedu.eze@gmail.com',
          phone: '+234 806 555 1234',
          state: 'Lagos',
          city: 'Surulere',
          address: '45 Bode Thomas St, Surulere, Lagos'
        },
        items: [
          {
            productId: 'PRD-GOJO',
            productName: 'Jujutsu Kaisen Cyber-Heavyweight Hoodie',
            productImage: 'https://images.pexels.com/photos/607961/pexels-photo-607961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Onyx Black',
            size: 'S',
            variant: 'Onyx Black / S',
            sku: 'ANL-JJK-BLK-S',
            quantity: 1,
            unitPrice: 18000,
            discount: 0,
            salePrice: 18000,
            commissionRate: 15,
            commissionAmount: 2700,
            sellerEarnings: 15300
          }
        ],
        subtotal: 18000,
        discountTotal: 0,
        netProductTotal: 18000,
        shippingFee: 2000,
        marketplaceCommission: 2700,
        sellerEarnings: 0,
        paymentStatus: 'Refunded',
        orderStatus: 'Returns',
        deliveryStatus: 'Item Returned to Warehouse',
        courier: 'Kwik Delivery',
        trackingNumber: 'KWK-RET-1092',
        returnReason: 'Wrong size selected by customer. Item returned unworn with factory tags intact.',
        returnStatus: 'Accepted',
        refundStatus: 'Completed by ANILyfe Finance (₦20,000 refunded to buyer card)',
        timeline: [
          { status: 'New', label: 'Order Placed', timestamp: '2026-08-28T09:15:00Z', note: 'Paid.' },
          { status: 'Delivered', label: 'Delivered', timestamp: '2026-08-29T16:00:00Z', note: 'Customer received.' },
          { status: 'Returns', label: 'Return Requested', timestamp: '2026-08-30T10:00:00Z', note: 'Customer requested size exchange or refund.' },
          { status: 'Returns', label: 'Return Inspected & Accepted', timestamp: '2026-08-31T15:00:00Z', note: 'Sealed tag verified. Refund adjustment authorized.' }
        ]
      },
      {
        id: 'ORD-ANL-8809',
        date: '2026-08-25T17:40:00Z',
        buyer: {
          name: 'Farouk Danjuma',
          email: 'farouk.d@gmail.com',
          phone: '+234 802 888 7766',
          state: 'Kano',
          city: 'Nassarawa',
          address: '18 Bompai Road, Kano'
        },
        items: [
          {
            productId: 'PRD-LFY5',
            productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
            productImage: 'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            color: 'Celestial White',
            size: 'Standard (24cm)',
            variant: 'Celestial White / Standard (24cm)',
            sku: 'ANL-LFY5-WHT',
            quantity: 1,
            unitPrice: 25000,
            discount: 0,
            salePrice: 25000,
            commissionRate: 15,
            commissionAmount: 3750,
            sellerEarnings: 0
          }
        ],
        subtotal: 25000,
        discountTotal: 0,
        netProductTotal: 25000,
        shippingFee: 4500,
        marketplaceCommission: 0,
        sellerEarnings: 0,
        paymentStatus: 'Cancelled',
        orderStatus: 'Cancelled',
        deliveryStatus: 'Cancelled Before Dispatch',
        cancellationReason: 'Buyer requested cancellation within 1-hour grace period due to duplicate order.',
        timeline: [
          { status: 'New', label: 'Order Placed', timestamp: '2026-08-25T17:40:00Z', note: 'Pending settlement.' },
          { status: 'Cancelled', label: 'Order Cancelled', timestamp: '2026-08-25T18:10:00Z', note: 'Cancelled within grace period. Inventory released back to stock.' }
        ]
      }
    ];
  }

  function getStoredOrders() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading orders', e);
    }
    const def = defaultOrders();
    saveOrders(def);
    return def;
  }

  function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  const orderService = {
    async getOrders(filters = {}) {
      await new Promise(r => setTimeout(r, 40));
      let list = getStoredOrders();

      if (filters.status && filters.status !== 'All') {
        if (filters.status === 'Returns') {
          list = list.filter(o => o.orderStatus === 'Returns' || o.orderStatus === 'Return Requested');
        } else if (filters.status === 'Refunds') {
          list = list.filter(o => o.paymentStatus === 'Refunded' || o.orderStatus === 'Refunds');
        } else {
          list = list.filter(o => o.orderStatus === filters.status);
        }
      }

      if (filters.search) {
        const q = filters.search.toLowerCase().trim();
        list = list.filter(o =>
          o.id.toLowerCase().includes(q) ||
          (o.buyer && o.buyer.name && o.buyer.name.toLowerCase().includes(q)) ||
          o.items.some(it =>
            (it.productName && it.productName.toLowerCase().includes(q)) ||
            (it.sku && it.sku.toLowerCase().includes(q))
          )
        );
      }

      if (filters.paymentStatus && filters.paymentStatus !== 'All') {
        list = list.filter(o => o.paymentStatus === filters.paymentStatus);
      }

      if (filters.dateRange) {
        // filter by range if provided
      }

      return list;
    },

    async getOrderById(id) {
      await new Promise(r => setTimeout(r, 30));
      const list = getStoredOrders();
      return list.find(o => o.id === id) || null;
    },

    async updateOrderStatus(id, newStatus, note = '') {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredOrders();
      const order = list.find(o => o.id === id);
      if (!order) throw new Error('Order not found');

      order.orderStatus = newStatus;
      order.timeline.push({
        status: newStatus,
        label: `Marked as ${newStatus}`,
        timestamp: new Date().toISOString(),
        note: note || `Updated by seller to ${newStatus}.`
      });

      saveOrders(list);
      window.dispatchEvent(new CustomEvent('anilyfe:orders-updated'));
      return order;
    },

    async confirmOrder(id) {
      return this.updateOrderStatus(id, 'Confirmed', 'Seller confirmed item availability.');
    },

    async processOrder(id) {
      return this.updateOrderStatus(id, 'Processing', 'Items packed and sealed in tamper-proof box.');
    },

    async markReadyToShip(id) {
      return this.updateOrderStatus(id, 'Ready to Ship', 'Waybill printed; awaiting dispatch pickup.');
    },

    async addTrackingAndShip(id, { courier, trackingNumber, note }) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredOrders();
      const order = list.find(o => o.id === id);
      if (!order) throw new Error('Order not found');

      order.orderStatus = 'Shipped';
      order.deliveryStatus = `In Transit via ${courier}`;
      order.courier = courier;
      order.trackingNumber = trackingNumber;
      order.timeline.push({
        status: 'Shipped',
        label: `Dispatched with ${courier}`,
        timestamp: new Date().toISOString(),
        note: `Tracking code #${trackingNumber}. ${note || ''}`
      });

      saveOrders(list);
      window.dispatchEvent(new CustomEvent('anilyfe:orders-updated'));
      return order;
    },

    async markDelivered(id) {
      return this.updateOrderStatus(id, 'Delivered', 'Customer confirmed receipt of goods.');
    },

    async cancelOrder(id, reason) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredOrders();
      const order = list.find(o => o.id === id);
      if (!order) throw new Error('Order not found');
      if (['Shipped', 'Delivered'].includes(order.orderStatus)) {
        throw new Error('Cannot cancel an order that has already shipped or been delivered.');
      }

      order.orderStatus = 'Cancelled';
      order.cancellationReason = reason || 'Cancelled by seller due to inventory constraint.';
      order.timeline.push({
        status: 'Cancelled',
        label: 'Order Cancelled',
        timestamp: new Date().toISOString(),
        note: order.cancellationReason
      });

      saveOrders(list);
      window.dispatchEvent(new CustomEvent('anilyfe:orders-updated'));
      return order;
    },

    async handleReturn(id, decision, reason = '') {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredOrders();
      const order = list.find(o => o.id === id);
      if (!order) throw new Error('Order not found');

      order.returnStatus = decision;
      order.timeline.push({
        status: 'Returns',
        label: `Return ${decision}`,
        timestamp: new Date().toISOString(),
        note: reason || `Seller decision: ${decision}`
      });

      saveOrders(list);
      window.dispatchEvent(new CustomEvent('anilyfe:orders-updated'));
      return order;
    }
  };

  window.orderService = orderService;
})();
