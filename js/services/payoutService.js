/**
 * ANILyfe Payout Service
 * Handles seller financial ledger, settlement balances, Nigerian bank accounts,
 * and payout withdrawal requests.
 * Real money movement will eventually be executed and validated server-side.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_payouts';

  const NIGERIAN_BANKS = [
    { code: '058', name: 'Guaranty Trust Bank (GTBank)' },
    { code: '057', name: 'Zenith Bank' },
    { code: '044', name: 'Access Bank' },
    { code: '011', name: 'First Bank of Nigeria' },
    { code: '033', name: 'United Bank for Africa (UBA)' },
    { code: '039', name: 'Stanbic IBTC Bank' },
    { code: '50211', name: 'Kuda Microfinance Bank' },
    { code: '50515', name: 'Moniepoint MFB' },
    { code: '999992', name: 'OPay Digital Services' }
  ];

  function defaultPayouts() {
    return {
      availableBalance: 320000,
      pendingBalance: 85000,
      totalEarnings: 4220000,
      totalWithdrawn: 3815000,
      totalMarketplaceFees: 633000,
      totalRefundAdjustments: 20000,
      bankAccount: {
        bankName: 'Guaranty Trust Bank (GTBank)',
        bankCode: '058',
        accountNumber: '0123456789',
        accountName: 'ABYSS ATELIER CONCEPT LTD',
        verified: true
      },
      schedule: 'Bi-weekly (Every 2nd Friday)',
      history: [
        {
          id: 'PO-ANL-2026-08',
          amount: 250000,
          bank: 'GTBank (••••6789)',
          status: 'Completed',
          reference: 'PAY-TRX-9982104',
          requestedAt: '2026-08-28T10:00:00Z',
          completedAt: '2026-08-29T14:30:00Z'
        },
        {
          id: 'PO-ANL-2026-07',
          amount: 450000,
          bank: 'GTBank (••••6789)',
          status: 'Completed',
          reference: 'PAY-TRX-8821940',
          requestedAt: '2026-08-14T09:30:00Z',
          completedAt: '2026-08-15T11:00:00Z'
        },
        {
          id: 'PO-ANL-2026-06',
          amount: 380000,
          bank: 'GTBank (••••6789)',
          status: 'Completed',
          reference: 'PAY-TRX-7719203',
          requestedAt: '2026-07-31T11:00:00Z',
          completedAt: '2026-08-01T15:20:00Z'
        }
      ],
      transactions: [
        { id: 'ORD-ANL-8821', gross: 25000, discount: 2500, shipping: 2000, commission: 3375, adjustment: 0, earnings: 21125, date: '2026-09-04', status: 'Settled (Available)' },
        { id: 'ORD-ANL-8820', gross: 36000, discount: 5400, shipping: 2000, commission: 4590, adjustment: 0, earnings: 28010, date: '2026-09-03', status: 'Pending Clearance' },
        { id: 'ORD-ANL-8818', gross: 18000, discount: 0, shipping: 4500, commission: 2700, adjustment: 0, earnings: 19800, date: '2026-09-02', status: 'Settled (Available)' },
        { id: 'ORD-ANL-8815', gross: 25000, discount: 0, shipping: 4500, commission: 3750, adjustment: 0, earnings: 25750, date: '2026-08-30', status: 'Settled (Available)' },
        { id: 'ORD-ANL-8812', gross: 18000, discount: 0, shipping: 2000, commission: 2700, adjustment: -18000, earnings: 0, date: '2026-08-28', status: 'Refund Adjusted' }
      ]
    };
  }

  function getStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultPayouts();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    return def;
  }

  const payoutService = {
    async getOverview() {
      await new Promise(r => setTimeout(r, 40));
      return getStored();
    },

    getNigerianBanks() {
      return NIGERIAN_BANKS;
    },

    async simulateVerifyAccount(bankCode, accountNumber) {
      await new Promise(r => setTimeout(r, 300));
      if (!accountNumber || accountNumber.length !== 10) {
        throw new Error('Nigerian NUBAN account numbers must be exactly 10 digits.');
      }
      const bank = NIGERIAN_BANKS.find(b => b.code === bankCode);
      return {
        verified: true,
        accountName: 'ABYSS ATELIER CONCEPT LTD',
        accountNumber,
        bankName: bank ? bank.name : 'Verified Financial Institution'
      };
    },

    async updatePayoutAccount(accountDetails) {
      await new Promise(r => setTimeout(r, 80));
      const current = getStored();
      current.bankAccount = {
        ...current.bankAccount,
        ...accountDetails,
        verified: true
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('anilyfe:payouts-updated'));
      return current.bankAccount;
    },

    async requestPayout(amount) {
      await new Promise(r => setTimeout(r, 100));
      const current = getStored();
      const numAmount = Number(amount);

      if (isNaN(numAmount) || numAmount <= 0) {
        throw new Error('Please enter a valid payout amount.');
      }
      if (numAmount < 10000) {
        throw new Error('Minimum withdrawal amount on ANILyfe is ₦10,000.');
      }
      if (numAmount > current.availableBalance) {
        throw new Error(`Insufficient available balance (₦${current.availableBalance.toLocaleString('en-NG')} available).`);
      }

      current.availableBalance -= numAmount;
      current.totalWithdrawn += numAmount;

      const newPayout = {
        id: `PO-ANL-${Date.now().toString(36).toUpperCase()}`,
        amount: numAmount,
        bank: `${current.bankAccount.bankName} (••••${current.bankAccount.accountNumber.slice(-4)})`,
        status: 'Processing',
        reference: `PAY-TRX-${Date.now().toString(36).toUpperCase()}`,
        requestedAt: new Date().toISOString(),
        completedAt: null
      };

      current.history.unshift(newPayout);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));

      // Also trigger a notification
      if (window.notificationService) {
        window.notificationService.addNotification({
          category: 'financial',
          type: 'payout_requested',
          title: 'Payout Request Initiated',
          message: `Your request to withdraw ₦${numAmount.toLocaleString('en-NG')} has been queued for bank transfer processing.`,
          link: '#/seller/earnings'
        });
      }

      window.dispatchEvent(new CustomEvent('anilyfe:payouts-updated'));
      return newPayout;
    }
  };

  window.payoutService = payoutService;
})();
