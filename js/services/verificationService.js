/**
 * ANILyfe Verification Service
 * Handles KYC onboarding, business document verification, status lifecycle,
 * and rejection correction flows for the Verified Seller program.
 */
(function() {
  const STORAGE_KEY = 'anilyfe_seller_verification';

  function defaultVerification() {
    return {
      status: 'Verified', // Not Started | Information Required | Under Review | Verified | Rejected | Suspended
      tier: 'Tier 1 Verified Merchant',
      badgeActive: true,
      legalBusinessName: 'Abyss Atelier Concept Ltd',
      registrationType: 'CAC Registered Company (RC-1849201)',
      taxIdentificationNumber: 'TIN-9921448-001',
      directorName: 'Kenji Takahashi',
      nationalIdType: 'National Identity Card (NIN)',
      nationalIdNumber: 'NIN-••••••••821',
      registeredAddress: 'Suite 4B, Cyber Plaza, Admiralty Way, Lekki Phase 1, Lagos State',
      submittedDocuments: [
        { name: 'CAC_Certificate_Incorporation.pdf', size: '2.4 MB', uploadedAt: '2026-08-20', status: 'Approved' },
        { name: 'Government_NIN_Slip.pdf', size: '1.1 MB', uploadedAt: '2026-08-20', status: 'Approved' },
        { name: 'Proof_Of_Address_Utility_Bill.pdf', size: '3.2 MB', uploadedAt: '2026-08-20', status: 'Approved' }
      ],
      rejectionReason: null,
      reviewedByAdminAt: '2026-08-22T11:30:00Z',
      submissionHistory: [
        { status: 'Under Review', timestamp: '2026-08-20T10:00:00Z', note: 'Initial KYC submission' },
        { status: 'Verified', timestamp: '2026-08-22T11:30:00Z', note: 'CAC & NIN identity successfully verified by compliance team.' }
      ]
    };
  }

  function getStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const def = defaultVerification();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(def));
    return def;
  }

  const verificationService = {
    async getStatus() {
      await new Promise(r => setTimeout(r, 40));
      return getStored();
    },

    async submitVerification(formData) {
      await new Promise(r => setTimeout(r, 80));
      const current = getStored();

      const updated = {
        ...current,
        ...formData,
        status: 'Under Review',
        rejectionReason: null,
        submissionHistory: [
          ...current.submissionHistory,
          {
            status: 'Under Review',
            timestamp: new Date().toISOString(),
            note: 'Verification submission received for administrative compliance review.'
          }
        ]
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('anilyfe:verification-updated', { detail: updated }));
      return updated;
    },

    async resubmit(formData) {
      return this.submitVerification(formData);
    }
  };

  window.verificationService = verificationService;
})();
