/**
 * ANILyfe Review & Question Service
 * Handles marketplace customer reviews and product inquiries.
 * Strict marketplace behavior: No social discussions or feeds.
 */
(function() {
  const REVIEWS_KEY = 'anilyfe_seller_reviews';
  const QUESTIONS_KEY = 'anilyfe_seller_questions';

  function defaultReviews() {
    return [
      {
        id: 'REV-01',
        productId: 'PRD-LFY5',
        productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
        buyerName: 'James Uche',
        rating: 5,
        reviewText: 'Legit Japanese import! Box came with zero dents, double bubble-wrapped. The purple lightning effects and aura look insane on my shelf in Lekki.',
        photos: [
          'https://images.pexels.com/photos/16075337/pexels-photo-16075337.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300'
        ],
        verifiedPurchase: true,
        date: '2026-09-02',
        sellerResponse: 'Arigatou James! We take extra care double-boxing all high-tier anime figures. Enjoy Gear 5!',
        answered: true,
        reported: false
      },
      {
        id: 'REV-02',
        productId: 'PRD-GOJO',
        productName: 'Jujutsu Kaisen Cyber-Heavyweight Hoodie',
        buyerName: 'Sade Makanjuola',
        rating: 4,
        reviewText: 'Fabric is top quality heavyweight French terry. Screen print is sharp and holographic. Sizing is slightly athletic, so size up if you prefer an oversized fit.',
        photos: [],
        verifiedPurchase: true,
        date: '2026-09-01',
        sellerResponse: null,
        answered: false,
        reported: false
      },
      {
        id: 'REV-03',
        productId: 'PRD-DSLP',
        productName: 'Demon Slayer Infinity Castle Foil Poster',
        buyerName: 'Nnamdi Okeke',
        rating: 5,
        reviewText: 'The foil reflection in low light is mindblowing. Came inside a rigid protective tube. Highly recommend Abyss Atelier.',
        photos: [
          'https://images.pexels.com/photos/3964758/pexels-photo-3964758.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300'
        ],
        verifiedPurchase: true,
        date: '2026-08-28',
        sellerResponse: 'Thank you Nnamdi! More Demon Slayer foil prints dropping next month!',
        answered: true,
        reported: false
      },
      {
        id: 'REV-04',
        productId: 'PRD-LFY5',
        productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
        buyerName: 'Anonymous Collector',
        rating: 2,
        reviewText: 'Delivery was delayed by 3 days because courier had trouble finding my estate in Abuja.',
        photos: [],
        verifiedPurchase: false,
        date: '2026-08-20',
        sellerResponse: null,
        answered: false,
        reported: false
      }
    ];
  }

  function defaultQuestions() {
    return [
      {
        id: 'QST-01',
        productId: 'PRD-LFY5',
        productName: 'Monkey D. Luffy Gear 5 Masterpiece Figure',
        buyerName: 'Amina Bello',
        questionText: 'Does this come with the original Megahouse authenticity sticker and box seal?',
        answerText: 'Yes Amina! All our Megahouse figures are 100% official Japanese imports and arrive in factory-sealed boxes with official Toei golden foil holo seals.',
        answered: true,
        date: '2026-09-03'
      },
      {
        id: 'QST-02',
        productId: 'PRD-GOJO',
        productName: 'Jujutsu Kaisen Cyber-Heavyweight Hoodie',
        buyerName: 'David Kalu',
        questionText: 'Is the XXL size suitable for someone 6ft 4in? Also is the print washer safe?',
        answerText: null,
        answered: false,
        date: '2026-09-04'
      },
      {
        id: 'QST-03',
        productId: 'PRD-OPBX',
        productName: 'One Piece Wano Kuni Arc Luxury Box Set',
        buyerName: 'Tunde Adeleke',
        questionText: 'Are the manga volumes printed in English or Japanese?',
        answerText: 'English translated edition published with high quality paper and translated notes.',
        answered: true,
        date: '2026-08-29'
      }
    ];
  }

  function getStoredReviews() {
    try {
      const raw = localStorage.getItem(REVIEWS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultReviews();
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(def));
    return def;
  }

  function getStoredQuestions() {
    try {
      const raw = localStorage.getItem(QUESTIONS_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultQuestions();
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(def));
    return def;
  }

  const reviewService = {
    async getReviews(filter = 'All') {
      await new Promise(r => setTimeout(r, 40));
      let list = getStoredReviews();

      if (filter === '5 stars') list = list.filter(r => r.rating === 5);
      else if (filter === '4 stars') list = list.filter(r => r.rating === 4);
      else if (filter === '3 stars') list = list.filter(r => r.rating === 3);
      else if (filter === '2 stars') list = list.filter(r => r.rating === 2);
      else if (filter === '1 star') list = list.filter(r => r.rating === 1);
      else if (filter === 'Unanswered') list = list.filter(r => !r.answered);
      else if (filter === 'Verified purchases') list = list.filter(r => r.verifiedPurchase);
      else if (filter === 'Reviews with photos') list = list.filter(r => r.photos && r.photos.length > 0);

      return list;
    },

    async replyToReview(reviewId, replyText) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredReviews();
      const rev = list.find(r => r.id === reviewId);
      if (!rev) throw new Error('Review not found');

      rev.sellerResponse = replyText.trim();
      rev.answered = true;
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('anilyfe:reviews-updated'));
      return rev;
    },

    async reportReview(reviewId, reason = 'Inappropriate content') {
      await new Promise(r => setTimeout(r, 50));
      const list = getStoredReviews();
      const rev = list.find(r => r.id === reviewId);
      if (rev) {
        rev.reported = true;
        localStorage.setItem(REVIEWS_KEY, JSON.stringify(list));
      }
      return true;
    },

    async getQuestions(filter = 'All') {
      await new Promise(r => setTimeout(r, 40));
      let list = getStoredQuestions();

      if (filter === 'Unanswered') list = list.filter(q => !q.answered);
      else if (filter === 'Answered') list = list.filter(q => q.answered);

      return list;
    },

    async answerQuestion(questionId, answerText) {
      await new Promise(r => setTimeout(r, 60));
      const list = getStoredQuestions();
      const qst = list.find(q => q.id === questionId);
      if (!qst) throw new Error('Question not found');

      qst.answerText = answerText.trim();
      qst.answered = true;
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('anilyfe:questions-updated'));
      return qst;
    }
  };

  window.reviewService = reviewService;
})();
