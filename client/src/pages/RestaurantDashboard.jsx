import React, { useState } from 'react';
import { useFoodShare } from '../context/FoodShareContext';

const RestaurantDashboard = () => {
  const { donations, addDonation, markAsPickedUp, currentUser, openAuthForRole } = useFoodShare();

  const [modalOpen, setModalOpen] = useState(false);
  const [foodTitle, setFoodTitle] = useState('');
  const [category, setCategory] = useState('Cooked Meals');
  const [foodType, setFoodType] = useState('Veg');
  const [quantityKg, setQuantityKg] = useState('');
  const [servings, setServings] = useState('');
  const [bestBefore, setBestBefore] = useState('Tonight, 11:30 PM');
  const [pickupAddress, setPickupAddress] = useState('Ahinsa Circle, C-Scheme, Jaipur, Rajasthan');
  const [notes, setNotes] = useState('');

  if (currentUser.role !== 'restaurant') {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '540px' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: '#0f172a' }}>Restaurant Portal</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Sign in to post surplus food and keep pickup updates simple.</p>
            <button onClick={() => openAuthForRole('restaurant', 'login')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In / Register Restaurant
            </button>
          </div>
        </div>
      </div>
    );
  }

  const myDonations = donations.filter(d => d.restaurantId === currentUser.id || currentUser.role === 'restaurant');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation({
      foodTitle,
      category,
      foodType,
      quantityKg,
      servings,
      bestBefore,
      pickupAddress: pickupAddress || currentUser.address || 'C-Scheme, Jaipur',
      notes
    });
    setModalOpen(false);
    setFoodTitle('');
    setQuantityKg('');
    setServings('');
    setNotes('');
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
          <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', marginBottom: '0.25rem', color: '#0f172a' }}>{currentUser.name || 'Restaurant Dashboard'}</h1>
              <p style={{ color: '#475569', fontSize: '0.95rem' }}>Post extra food and keep pickup updates simple.</p>
            </div>
            <button onClick={() => setModalOpen(true)} className="btn-primary" style={{ padding: '0.7rem 1.2rem' }}>
              Post Food
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0f172a' }}>Your Food Listings</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#64748b' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Food Item</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Details</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Pickup</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {myDonations.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No listings yet. Add your first food donation.</td>
                  </tr>
                ) : (
                  myDonations.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: '#0f172a', display: 'block' }}>{item.foodTitle}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>{item.foodType} • {item.category}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <strong style={{ color: '#059669' }}>{item.quantityKg} kg</strong>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#d97706' }}>{item.servings} Servings</span>
                      </td>
                      <td style={{ padding: '1rem', color: '#475569', fontSize: '0.85rem' }}>{item.pickupAddress}</td>
                      <td style={{ padding: '1rem' }}><span className={`badge badge-${item.status.toLowerCase().replace(' ', '')}`}>{item.status}</span></td>
                      <td style={{ padding: '1rem' }}>
                        {item.status === 'Claimed' && <button onClick={() => markAsPickedUp(item.id)} className="btn-primary btn-sm">Mark Picked Up</button>}
                        {item.status === 'Picked Up' && <span style={{ color: '#2563eb', fontWeight: 600, fontSize: '0.8rem' }}>Completed</span>}
                        {item.status === 'Available' && <span style={{ color: '#059669', fontWeight: 600, fontSize: '0.8rem' }}>Live</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {modalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#0f172a' }}>Post Food</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.25rem' }}>Add the extra food that can be shared.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Food Listing Title *</label>
                  <input type="text" className="form-input" placeholder="e.g. 40 Veg Thali Meals" value={foodTitle} onChange={e => setFoodTitle(e.target.value)} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                      <option value="Cooked Meals">Cooked Meals</option>
                      <option value="Bakery">Bakery & Breads</option>
                      <option value="Fresh Produce">Fresh Produce</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Diet Type *</label>
                    <select className="form-select" value={foodType} onChange={e => setFoodType(e.target.value)}>
                      <option value="Veg">Vegetarian</option>
                      <option value="Non-Veg">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Quantity in Weight (kg) *</label>
                    <input type="number" className="form-input" placeholder="e.g. 15" value={quantityKg} onChange={e => setQuantityKg(e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Servings/Meals *</label>
                    <input type="number" className="form-input" placeholder="e.g. 35" value={servings} onChange={e => setServings(e.target.value)} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Pickup Address in Jaipur *</label>
                  <input type="text" className="form-input" placeholder="e.g. Ahinsa Circle, C-Scheme, Jaipur" value={pickupAddress} onChange={e => setPickupAddress(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Best Before Time Deadline *</label>
                  <input type="text" className="form-input" placeholder="e.g. Tonight before 11:30 PM" value={bestBefore} onChange={e => setBestBefore(e.target.value)} required />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
                  <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Post Listing</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;
