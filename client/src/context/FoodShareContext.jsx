import React, { createContext, useContext, useState, useEffect } from 'react';

const FoodShareContext = createContext();

// All pre-seeded demo data strictly set to Jaipur, Rajasthan
const MOCK_DONATIONS = [
  {
    id: 'don-1',
    restaurantId: 'rest-1',
    restaurantName: 'The Rajputana Royal Hotel',
    restaurantPhone: '+91 98290 12345',
    foodTitle: '50 Fresh Veg Thali Meals (Packed)',
    category: 'Cooked Meals',
    foodType: 'Veg',
    quantityKg: 25,
    servings: 50,
    bestBefore: 'Tonight, 11:30 PM',
    pickupAddress: 'Ahinsa Circle, C-Scheme, Jaipur, Rajasthan 302001',
    notes: 'Extra catering food from evening wedding banquet. Hygienically packed in silver foil containers.',
    status: 'Available',
    claimedByNgoId: null,
    claimedByNgoName: null,
    expectedPickupTime: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'don-2',
    restaurantId: 'rest-2',
    restaurantName: 'Jaipur Sweets & Bakery',
    restaurantPhone: '+91 98291 98765',
    foodTitle: '30 Artisan Whole Wheat Breads & Snacks',
    category: 'Bakery',
    foodType: 'Veg',
    quantityKg: 12,
    servings: 35,
    bestBefore: 'Tomorrow Morning, 10:00 AM',
    pickupAddress: 'Johari Bazaar, Near Hawa Mahal, Jaipur, Rajasthan 302003',
    notes: 'Day-end surplus freshly baked bread loaves and multigrain buns in sealed bags.',
    status: 'Available',
    claimedByNgoId: null,
    claimedByNgoName: null,
    expectedPickupTime: null,
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'don-3',
    restaurantId: 'rest-1',
    restaurantName: 'The Rajputana Royal Hotel',
    restaurantPhone: '+91 98290 12345',
    foodTitle: '15 kg Fresh Fruit & Salad Trays',
    category: 'Fresh Produce',
    foodType: 'Veg',
    quantityKg: 15,
    servings: 30,
    bestBefore: 'Today, 9:00 PM',
    pickupAddress: 'Ahinsa Circle, C-Scheme, Jaipur, Rajasthan 302001',
    notes: 'Freshly cut papayas, apples, and garden salads.',
    status: 'Claimed',
    claimedByNgoId: 'ngo-1',
    claimedByNgoName: 'Jaipur Food Relief Trust',
    expectedPickupTime: 'Within 45 minutes',
    createdAt: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'don-4',
    restaurantId: 'rest-3',
    restaurantName: 'Saffron Curry House',
    restaurantPhone: '+91 98292 44332',
    foodTitle: '40 Servings Dal Baati Churma & Rice',
    category: 'Cooked Meals',
    foodType: 'Veg',
    quantityKg: 20,
    servings: 40,
    bestBefore: 'Completed Pickup',
    pickupAddress: 'MI Road, Opposite Raj Mandir Cinema, Jaipur 302001',
    notes: 'Hot dal and rice in thermal containers.',
    status: 'Picked Up',
    claimedByNgoId: 'ngo-2',
    claimedByNgoName: 'Seva Annapurna Foundation Jaipur',
    expectedPickupTime: 'Completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const MOCK_NGOS = [
  {
    id: 'ngo-1',
    name: 'Jaipur Food Relief Trust',
    email: 'contact@jaipurfoodrelief.org',
    phone: '+91 94140 11223',
    regNumber: 'NGO-RAJ-2022-8901',
    address: '12 Hope Enclave, Malviya Nagar, Jaipur, Rajasthan',
    targetCommunity: 'Slum Children & Night Shelters',
    verificationStatus: 'Verified',
    rejectionReason: null,
    submittedDocuments: [
      { name: '80G_Tax_Exemption_Certificate.pdf', size: '1.2 MB', date: '2026-01-10' },
      { name: 'Jaipur_Govt_NGO_Registration.pdf', size: '2.4 MB', date: '2026-01-10' }
    ]
  },
  {
    id: 'ngo-2',
    name: 'Seva Annapurna Foundation Jaipur',
    email: 'info@sevaannapurna.org',
    phone: '+91 94141 55667',
    regNumber: 'NGO-JPR-2023-4512',
    address: '77 Shelter Care, Vaishali Nagar, Jaipur',
    targetCommunity: 'Elderly Orphanages & Day Laborers',
    verificationStatus: 'Verified',
    rejectionReason: null,
    submittedDocuments: [
      { name: 'Trust_Deed_Registration.pdf', size: '1.8 MB', date: '2026-02-15' },
      { name: 'Jaipur_FSSAI_NGO_License.pdf', size: '920 KB', date: '2026-02-15' }
    ]
  },
  {
    id: 'ngo-3',
    name: 'Pink City Care Sangh',
    email: 'pinkcitycare@jaipur.org',
    phone: '+91 94142 99887',
    regNumber: 'NGO-JPR-2024-9912',
    address: '34 Community Hall, Raja Park, Jaipur',
    targetCommunity: 'Migrant Workers',
    verificationStatus: 'Pending',
    rejectionReason: null,
    submittedDocuments: [
      { name: 'Society_Registration_Doc.pdf', size: '3.1 MB', date: '2026-07-27' },
      { name: 'PAN_Card_Ngo.pdf', size: '540 KB', date: '2026-07-27' }
    ]
  }
];

export const FoodShareProvider = ({ children }) => {
  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('foodshare_donations_jaipur');
    return saved ? JSON.parse(saved) : MOCK_DONATIONS;
  });

  const [ngos, setNgos] = useState(() => {
    const saved = localStorage.getItem('foodshare_ngos_jaipur');
    return saved ? JSON.parse(saved) : MOCK_NGOS;
  });

  // Current User - Starts in Guest (Logged Out) mode
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('foodshare_current_user');
    return savedUser ? JSON.parse(savedUser) : { id: null, name: 'Guest Visitor', role: 'guest' };
  });

  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authTargetRole, setAuthTargetRole] = useState('restaurant'); // 'restaurant' | 'ngo' | 'admin'

  useEffect(() => {
    localStorage.setItem('foodshare_donations_jaipur', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('foodshare_ngos_jaipur', JSON.stringify(ngos));
  }, [ngos]);

  useEffect(() => {
    localStorage.setItem('foodshare_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Login handler
  const loginUser = (email, password, roleType) => {
    let userObj = {
      id: `usr-${Date.now()}`,
      name: roleType === 'restaurant' ? 'The Rajputana Royal Hotel' :
            roleType === 'ngo' ? 'Jaipur Food Relief Trust' : 'Jaipur Admin Officer',
      role: roleType,
      email: email || 'user@jaipurfoodshare.org',
      phone: '+91 98290 12345',
      address: roleType === 'restaurant' ? 'Ahinsa Circle, C-Scheme, Jaipur' : 'Malviya Nagar, Jaipur',
      verificationStatus: 'Verified'
    };

    if (roleType === 'ngo') {
      const matchNgo = ngos.find(n => n.email.toLowerCase() === email.toLowerCase()) || ngos[0];
      userObj = { ...userObj, id: matchNgo.id, name: matchNgo.name, verificationStatus: matchNgo.verificationStatus, regNumber: matchNgo.regNumber };
    }

    setCurrentUser(userObj);
    setAuthModalOpen(false);
  };

  // Logout handler
  const logoutUser = () => {
    setCurrentUser({ id: null, name: 'Guest Visitor', role: 'guest' });
  };

  // Open Auth modal for specific role
  const openAuthForRole = (roleType, mode = 'login') => {
    setAuthTargetRole(roleType);
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Add new Food Donation
  const addDonation = (newDonationData) => {
    const newEntry = {
      id: `don-${Date.now()}`,
      restaurantId: currentUser.id || 'rest-1',
      restaurantName: currentUser.name || 'Jaipur Restaurant',
      restaurantPhone: currentUser.phone || '+91 98290 00000',
      foodTitle: newDonationData.foodTitle,
      category: newDonationData.category || 'Cooked Meals',
      foodType: newDonationData.foodType || 'Veg',
      quantityKg: Number(newDonationData.quantityKg) || 10,
      servings: Number(newDonationData.servings) || 20,
      bestBefore: newDonationData.bestBefore || 'Within 4 Hours',
      pickupAddress: newDonationData.pickupAddress || 'C-Scheme, Jaipur',
      notes: newDonationData.notes || '',
      status: 'Available',
      claimedByNgoId: null,
      claimedByNgoName: null,
      expectedPickupTime: null,
      createdAt: new Date().toISOString()
    };
    setDonations(prev => [newEntry, ...prev]);
  };

  // Claim Food Donation
  const claimDonation = (donationId, pickupEta) => {
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        return {
          ...item,
          status: 'Claimed',
          claimedByNgoId: currentUser.id || 'ngo-1',
          claimedByNgoName: currentUser.name || 'Jaipur Food Relief Trust',
          expectedPickupTime: pickupEta || 'Within 1 Hour'
        };
      }
      return item;
    }));
  };

  // Mark Picked Up
  const markAsPickedUp = (donationId) => {
    setDonations(prev => prev.map(item => {
      if (item.id === donationId) {
        return { ...item, status: 'Picked Up' };
      }
      return item;
    }));
  };

  // Admin approves NGO
  const approveNgo = (ngoId) => {
    setNgos(prev => prev.map(ngo => {
      if (ngo.id === ngoId) {
        return { ...ngo, verificationStatus: 'Verified', rejectionReason: null };
      }
      return ngo;
    }));
  };

  // Admin rejects NGO
  const rejectNgo = (ngoId, reason) => {
    setNgos(prev => prev.map(ngo => {
      if (ngo.id === ngoId) {
        return { ...ngo, verificationStatus: 'Rejected', rejectionReason: reason || 'Document verification failed.' };
      }
      return ngo;
    }));
  };

  // NGO re-submits docs
  const submitNgoDocs = (ngoId, newDocFiles) => {
    setNgos(prev => prev.map(ngo => {
      if (ngo.id === ngoId || currentUser.id === ngo.id) {
        const updatedDocs = [
          ...(ngo.submittedDocuments || []),
          ...newDocFiles.map(file => ({
            name: file.name,
            size: `${(file.size / 1024).toFixed(0)} KB`,
            date: new Date().toISOString().split('T')[0]
          }))
        ];
        return { ...ngo, verificationStatus: 'Pending', rejectionReason: null, submittedDocuments: updatedDocs };
      }
      return ngo;
    }));
  };

  // Register user
  const registerUser = (formData) => {
    if (formData.role === 'ngo') {
      const newNgo = {
        id: `ngo-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        regNumber: formData.regNumber || 'NGO-JPR-2026',
        address: formData.address || 'Jaipur, Rajasthan',
        targetCommunity: formData.targetCommunity || 'Needy Families in Jaipur',
        verificationStatus: 'Pending',
        rejectionReason: null,
        submittedDocuments: formData.docName ? [
          { name: formData.docName, size: '1.5 MB', date: new Date().toISOString().split('T')[0] }
        ] : []
      };
      setNgos(prev => [newNgo, ...prev]);
      setCurrentUser({
        id: newNgo.id,
        name: newNgo.name,
        role: 'ngo',
        email: newNgo.email,
        phone: newNgo.phone,
        regNumber: newNgo.regNumber,
        address: newNgo.address,
        verificationStatus: 'Pending'
      });
    } else if (formData.role === 'restaurant') {
      setCurrentUser({
        id: `rest-${Date.now()}`,
        name: formData.name,
        role: 'restaurant',
        email: formData.email,
        phone: formData.phone,
        license: formData.license || 'FSSAI-JPR-100200',
        address: formData.address || 'C-Scheme, Jaipur',
        verificationStatus: 'Verified'
      });
    } else {
      setCurrentUser({
        id: `user-${Date.now()}`,
        name: formData.name,
        role: formData.role || 'admin',
        email: formData.email
      });
    }
    setAuthModalOpen(false);
  };

  // Analytics calculator
  const analytics = {
    totalFoodRescuedKg: donations.reduce((acc, curr) => acc + (curr.status !== 'Available' ? curr.quantityKg : curr.quantityKg * 0.5), 180),
    totalMealsServed: donations.reduce((acc, curr) => acc + (curr.servings || curr.quantityKg * 2), 420),
    totalCo2OffsetKg: Math.round(donations.reduce((acc, curr) => acc + (curr.quantityKg * 2.5), 450)),
    activeDonationsCount: donations.filter(d => d.status === 'Available').length,
    claimedDonationsCount: donations.filter(d => d.status === 'Claimed').length,
    completedDonationsCount: donations.filter(d => d.status === 'Picked Up').length,
    verifiedNgoCount: ngos.filter(n => n.verificationStatus === 'Verified').length,
    pendingNgoCount: ngos.filter(n => n.verificationStatus === 'Pending').length,
  };

  return (
    <FoodShareContext.Provider value={{
      donations,
      ngos,
      currentUser,
      loginUser,
      logoutUser,
      openAuthForRole,
      addDonation,
      claimDonation,
      markAsPickedUp,
      approveNgo,
      rejectNgo,
      submitNgoDocs,
      registerUser,
      analytics,
      authModalOpen,
      setAuthModalOpen,
      authMode,
      setAuthMode,
      authTargetRole,
      setAuthTargetRole
    }}>
      {children}
    </FoodShareContext.Provider>
  );
};

export const useFoodShare = () => useContext(FoodShareContext);
