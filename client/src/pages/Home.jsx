import React, { useState } from 'react';
import { useFoodShare } from '../context/FoodShareContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { donations, analytics, currentUser, openAuthForRole, claimDonation } = useFoodShare();
  const navigate = useNavigate();

  const [selectedDonationForClaim, setSelectedDonationForClaim] = useState(null);
  const [pickupEta, setPickupEta] = useState('Within 45 mins');

  const filteredDonations = donations;

  const handleDonateClick = () => {
    if (currentUser.role === 'restaurant') {
      navigate('/restaurant-dashboard');
    } else {
      openAuthForRole('restaurant', 'login');
    }
  };

  const handleClaimClick = () => {
    if (currentUser.role === 'ngo') {
      navigate('/ngo-dashboard');
    } else {
      openAuthForRole('ngo', 'login');
    }
  };

  const handleConfirmClaim = (donationId) => {
    claimDonation(donationId, pickupEta);
    setSelectedDonationForClaim(null);
  };

  return (
    <div>
      <section style={{ padding: '3rem 0 2rem', background: '#f8faf8' }}>
        <div className="container" style={{ maxWidth: '760px', textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '0.75rem', color: '#0f172a' }}>Share food quickly and simply.</h1>
          <p style={{ color: '#475569', fontSize: '1rem', marginBottom: '1.5rem' }}>Restaurants post extra food. NGOs claim it. The process stays simple and direct.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleDonateClick} className="btn-primary">Post Food</button>
            <button onClick={handleClaimClick} className="btn-amber">Claim Food</button>
          </div>
        </div>
      </section>

      <section style={{ padding: '1.5rem 0' }}>
        <div className="container">
          <div className="grid-cols-3">
            <div className="glass-card" style={{ padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#059669' }}>{analytics.totalFoodRescuedKg.toLocaleString()} kg</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Food shared</div>
            </div>
            <div className="glass-card" style={{ padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#d97706' }}>{analytics.totalMealsServed.toLocaleString()}+</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Meals served</div>
            </div>
            <div className="glass-card" style={{ padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 800, color: '#2563eb' }}>{analytics.verifiedNgoCount}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Verified NGOs</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '2rem 0 3rem' }}>
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.2rem', color: '#0f172a' }}>Current Food Listings</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Simple lookup for available donations in Jaipur.</p>
          </div>

          <div className="grid-cols-3">
            {filteredDonations.map(donation => (
              <div key={donation.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex-between" style={{ marginBottom: '0.6rem' }}>
                    <span className={`badge badge-${donation.status.toLowerCase().replace(' ', '')}`}>{donation.status}</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{donation.category}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: '#0f172a' }}>{donation.foodTitle}</h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.6rem' }}>{donation.restaurantName}</p>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{donation.quantityKg} kg • {donation.servings} servings</p>
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{donation.pickupAddress}</p>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  {donation.status === 'Available' ? (
                    <button onClick={() => { if (currentUser.role === 'ngo') { setSelectedDonationForClaim(donation); } else { openAuthForRole('ngo', 'login'); } }} className="btn-amber btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      Claim
                    </button>
                  ) : (
                    <div style={{ textAlign: 'center', fontSize: '0.8rem', color: donation.status === 'Claimed' ? '#b45309' : '#1d4ed8', background: '#f1f5f9', padding: '0.4rem', borderRadius: '6px', fontWeight: 600 }}>
                      {donation.status === 'Claimed' ? `Claimed by ${donation.claimedByNgoName}` : 'Pickup Completed'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedDonationForClaim && (
        <div className="modal-overlay" onClick={() => setSelectedDonationForClaim(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>Confirm Claim</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Reserving: <strong style={{ color: '#0f172a' }}>{selectedDonationForClaim.foodTitle}</strong> ({selectedDonationForClaim.quantityKg} kg)</p>
            <div className="form-group">
              <label className="form-label">Pickup Address</label>
              <div style={{ padding: '0.7rem 0.9rem', background: '#e6f4ea', borderRadius: '8px', color: '#047857', fontSize: '0.875rem', fontWeight: 600 }}>{selectedDonationForClaim.pickupAddress}</div>
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Arrival Time *</label>
              <select className="form-select" value={pickupEta} onChange={e => setPickupEta(e.target.value)}>
                <option value="Within 30 mins">Within 30 mins</option>
                <option value="Within 45 mins">Within 45 mins</option>
                <option value="Within 1 Hour">Within 1 Hour</option>
                <option value="Within 2 Hours">Within 2 Hours</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button onClick={() => setSelectedDonationForClaim(null)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
              <button onClick={() => handleConfirmClaim(selectedDonationForClaim.id)} className="btn-amber" style={{ flex: 1, justifyContent: 'center' }}>Confirm Claim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
