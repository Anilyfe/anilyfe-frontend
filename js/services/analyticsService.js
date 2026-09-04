/**
 * ANILyfe Analytics Service
 * Provides revenue, orders, conversion, product popularity, and Nigerian regional marketplace trends.
 * Privacy-preserving: Returns aggregated statistical metrics without exposing private buyer data.
 */
(function() {
  const analyticsService = {
    async getOverview(dateRange = '30d') {
      await new Promise(r => setTimeout(r, 40));

      const timeSeries = {
        'today': {
          labels: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'],
          revenue: [15000, 32000, 75000, 42000, 68000, 24000],
          orders: [1, 2, 4, 2, 3, 1],
          productsSold: [1, 3, 5, 2, 4, 1]
        },
        '7d': {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          revenue: [45000, 68000, 92000, 115000, 140000, 185000, 160000],
          orders: [2, 3, 5, 6, 8, 10, 8],
          productsSold: [3, 4, 7, 8, 11, 14, 10]
        },
        '30d': {
          labels: ['W1', 'W2', 'W3', 'W4'],
          revenue: [280000, 390000, 520000, 480000],
          orders: [14, 19, 26, 23],
          productsSold: [18, 25, 34, 31]
        },
        '3m': {
          labels: ['July', 'August', 'September'],
          revenue: [1100000, 1450000, 1670000],
          orders: [54, 72, 82],
          productsSold: [70, 94, 108]
        },
        '6m': {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          revenue: [850000, 960000, 1100000, 1250000, 1450000, 1670000],
          orders: [42, 48, 55, 62, 72, 82],
          productsSold: [55, 64, 72, 80, 94, 108]
        }
      };

      const selectedSeries = timeSeries[dateRange] || timeSeries['30d'];

      return {
        dateRange,
        series: selectedSeries,
        kpis: {
          todaySales: 256000,
          totalRevenue: 4220000,
          totalOrders: 142,
          productsSold: 188,
          storeViews: 8940,
          productViews: 34210,
          pendingOrders: 3,
          pendingReturns: 1,
          sellerRating: 4.9,
          availableBalance: 320000,
          pendingBalance: 85000
        },
        ordersBreakdown: {
          total: 142,
          completed: 132,
          cancelled: 6,
          returned: 4,
          completionRate: '93.0%'
        },
        productPerformance: {
          bestSellers: [
            { id: 'PRD-LFY5', name: 'Luffy Gear 5 Masterpiece Figure', unitsSold: 64, revenue: 1600000, conversionRate: '4.8%' },
            { id: 'PRD-GOJO', name: 'JJK Domain Expansion Cyber Hoodie', unitsSold: 58, revenue: 1044000, conversionRate: '5.2%' },
            { id: 'PRD-NRTS', name: 'Naruto Sage Mode Collector Figure', unitsSold: 38, revenue: 836000, conversionRate: '3.9%' }
          ],
          lowPerforming: [
            { id: 'PRD-DSLP', name: 'Demon Slayer Infinity Castle Poster', views: 820, unitsSold: 0, reason: 'Out of Stock' }
          ]
        },
        locationTrends: {
          inStatePercentage: 62, // e.g. Lagos customers
          outsideStatePercentage: 38, // Nationwide
          topStates: [
            { state: 'Lagos', share: '62%', orders: 88, status: 'Home Region (Free Shipping Active)' },
            { state: 'Abuja (FCT)', share: '18%', orders: 26, status: 'High Value Orders' },
            { state: 'Rivers (Port Harcourt)', share: '9%', orders: 13, status: 'Fast Growing' },
            { state: 'Oyo (Ibadan)', share: '6%', orders: 8, status: 'Standard Delivery' },
            { state: 'Kano', share: '5%', orders: 7, status: 'Emerging' }
          ],
          topCities: ['Lekki/VI', 'Ikeja', 'Maitama (Abuja)', 'Trans-Amadi (PH)', 'Bodija (Ibadan)']
        }
      };
    }
  };

  window.analyticsService = analyticsService;
})();
