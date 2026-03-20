import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePayment } from '../../hooks/usePayment';
import './BookingPage.css';

// ── Icons ──────────────────────────────────────────────────────────────────
const CheckIcon    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const UserIcon     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const CalIcon      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const ShieldIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const ArrowLeft    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const MountainIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3l8 18 4-9 4 9M2 12l4-9 4 9"></path></svg>;

const STEPS = [
  { id: 1, label: 'Details'     },
  { id: 2, label: 'Payment'     },
  { id: 3, label: 'Processing'  },
  { id: 4, label: 'Confirmed'   },
];

const BANKS = [
  'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
  'Kotak Mahindra Bank', 'Punjab National Bank', 'Bank of Baroda',
];

const WALLETS = [
  { id: 'paytm',    name: 'Paytm',       color: '#00baf2' },
  { id: 'phonepe',  name: 'PhonePe',     color: '#5f259f' },
  { id: 'gpay',     name: 'Google Pay',  color: '#4285f4' },
  { id: 'amazon',   name: 'Amazon Pay',  color: '#ff9900' },
];

export default function BookingPage() {
  const location = useLocation();
  const navigate  = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    paymentState, initiateHotelPayment, initiatePackagePayment,
    confirmPayment, cancelPayment, resetPayment,
  } = usePayment();

  // Booking data passed via navigate state
  const bookingData = location.state || {};
  const {
    type = 'hotel',   // 'hotel' | 'package'
    itemId,
    itemName,
    itemImage,
    itemRating,
    itemLocation,
    price = 0,
    roomTypes = [],
    returnTo = '/',   // where to go on cancel
  } = bookingData;

  // ── Step state ────────────────────────────────────────────────────────────
  const [step, setStep] = useState(1);

  // ── Step 1: Details ───────────────────────────────────────────────────────
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0] || null);
  const [checkIn,  setCheckIn]   = useState('');
  const [checkOut, setCheckOut]  = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [guests,   setGuests]    = useState(2);
  const [children, setChildren]  = useState(0);
  const [rooms,    setRooms]     = useState(1);
  const [fullName, setFullName]  = useState(user?.fullName || '');
  const [email,    setEmail]     = useState(user?.email    || '');
  const [phone,    setPhone]     = useState(user?.phone    || '');
  const [pickup,   setPickup]    = useState('');
  const [specialReqs, setSpecialReqs] = useState('');
  const [detailErrors, setDetailErrors] = useState({});

  // ── Step 2: Payment ───────────────────────────────────────────────────────
  const [payMethod,  setPayMethod]  = useState('upi');
  const [upiId,      setUpiId]      = useState('');
  const [cardNum,    setCardNum]    = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv,    setCardCvv]    = useState('');
  const [cardName,   setCardName]   = useState('');
  const [bank,       setBank]       = useState('');
  const [wallet,     setWallet]     = useState('');
  const [payErrors,  setPayErrors]  = useState({});

  // ── Step 3: Processing state ──────────────────────────────────────────────
  const [processingMsg, setProcessingMsg] = useState('Connecting to payment gateway…');

  // ── Step 4: Confirmation data ─────────────────────────────────────────────
  const [confirmation, setConfirmation] = useState(null);

  // Prefill user data
  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Redirect if no booking data
  useEffect(() => {
    if (!itemId || !type) navigate('/', { replace: true });
  }, [itemId, type, navigate]);

  // ── Price calculations ────────────────────────────────────────────────────
  const currentPrice = selectedRoom?.price || price || 0;

  const nights = (() => {
    if (type !== 'hotel' || !checkIn || !checkOut) return 0;
    const d = new Date(checkOut) - new Date(checkIn);
    return d <= 0 ? 0 : Math.ceil(d / 86400000);
  })();

  const baseAmount = type === 'hotel'
    ? currentPrice * nights * rooms
    : currentPrice * guests + Math.round(currentPrice * 0.7) * children;

  const taxRate    = type === 'hotel' ? 0.18 : 0.05;
  const taxAmount  = Math.round(baseAmount * taxRate);
  const totalAmount = baseAmount + taxAmount;

  const fmtDate = (d) => d
    ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : '—';

  // ── Validations ───────────────────────────────────────────────────────────
  const validateDetails = () => {
    const errs = {};
    if (!fullName.trim() || fullName.trim().length < 2) errs.fullName = 'Full name required';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Valid email required';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) errs.phone = 'Valid 10-digit phone required';
    if (type === 'hotel') {
      if (!checkIn)  errs.checkIn  = 'Check-in date required';
      if (!checkOut) errs.checkOut = 'Check-out date required';
      if (checkIn && checkOut && nights === 0) errs.checkOut = 'Check-out must be after check-in';
    } else {
      if (!travelDate) errs.travelDate = 'Travel date required';
      if (type === 'package' && !pickup.trim()) errs.pickup = 'Pickup location required';
    }
    setDetailErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    if (payMethod === 'upi') {
      if (!upiId.trim()) errs.upi = 'UPI ID required';
      else if (!/^[\w.\-]+@[\w]+$/.test(upiId.trim())) errs.upi = 'Format: username@bank (e.g. name@upi)';
    }
    if (payMethod === 'card') {
      if (cardNum.replace(/\s/g, '').length < 16) errs.cardNum  = 'Enter valid 16-digit card number';
      if (!cardName.trim()) errs.cardName = 'Name on card required';
      if (!cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(cardExpiry)) errs.cardExpiry = 'Format: MM/YY';
      if (!cardCvv.trim() || cardCvv.length < 3) errs.cardCvv = '3-digit CVV required';
    }
    if (payMethod === 'netbanking' && !bank) errs.bank = 'Select a bank';
    if (payMethod === 'wallet' && !wallet) errs.wallet = 'Select a wallet';
    setPayErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Process payment ───────────────────────────────────────────────────────
  const processPayment = useCallback(async () => {
    setStep(3);
    const msgs = [
      'Connecting to payment gateway…',
      'Verifying payment details…',
      'Processing transaction…',
      'Confirming booking…',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < msgs.length) setProcessingMsg(msgs[i]);
    }, 700);

    try {
      // Build booking payload
      const contactInfo = { fullName, email, phone };
      let orderInfo;

      if (type === 'hotel') {
        orderInfo = await initiateHotelPayment({
          hotelId:      itemId,
          hotelName:    itemName,
          roomType:     selectedRoom?.type || 'Standard',
          roomPrice:    currentPrice,
          checkIn, checkOut,
          guests:       { adults: guests, children: 0 },
          rooms,
          contactInfo,
          specialRequests: specialReqs,
        });
      } else {
        orderInfo = await initiatePackagePayment({
          packageId:       itemId,
          packageTitle:    itemName,
          packagePrice:    price,
          travelDate,
          guests:          { adults: guests, children },
          pickupLocation:  pickup,
          contactInfo,
          specialRequests: specialReqs,
        });
      }

      // Simulate realistic payment delay (2-3 seconds)
      await new Promise(r => setTimeout(r, 2500));
      clearInterval(interval);

      setProcessingMsg('Payment successful! Generating confirmation…');
      await new Promise(r => setTimeout(r, 500));

      const result = await confirmPayment({
        bookingId:     orderInfo.bookingId,
        paymentMethod: payMethod,
      });

      // ✅ FIX: Fire bookingConfirmed event with full booking details
      // Account page listens to this and immediately re-fetches bookings
      window.dispatchEvent(new CustomEvent('bookingConfirmed', {
        detail: {
          bookingId:        orderInfo.bookingId,
          bookingReference: result?.bookingReference || orderInfo.bookingReference,
          amount:           result?.amount || orderInfo.amount,
          paymentMethod:    payMethod,
          type,
          itemName,
        },
      }));

      setConfirmation({
        bookingReference: result.bookingReference || orderInfo.bookingReference,
        bookingId:        orderInfo.bookingId,
        amount:           result.amount || orderInfo.amount,
        paymentMethod:    payMethod,
        itemName,
        itemImage,
        type,
        checkIn, checkOut, travelDate,
        guests, children, rooms,
        fullName, email, phone,
        selectedRoom,
        transactionId:    result.transactionId,
      });

      setStep(4);
    } catch (err) {
      clearInterval(interval);
      setPayErrors({ general: err.response?.data?.message || 'Payment failed. Please try again.' });
      setStep(2);
    }
  }, [
    type, itemId, itemName, price, currentPrice, selectedRoom,
    checkIn, checkOut, travelDate, guests, children, rooms,
    fullName, email, phone, pickup, specialReqs, payMethod,
    initiateHotelPayment, initiatePackagePayment, confirmPayment,
  ]);

  const handlePayNow = () => {
    if (!validatePayment()) return;
    processPayment();
  };

  const handleCancel = async () => {
    if (paymentState.bookingId) {
      await cancelPayment({ bookingId: paymentState.bookingId });
    }
    resetPayment();
    navigate(returnTo);
  };

  // ── Render helpers ────────────────────────────────────────────────────────
  const FieldErr = ({ msg }) => msg
    ? <span className="bp-field-err">{msg}</span>
    : null;

  const fmt = (n) => (n || 0).toLocaleString('en-IN');

  if (!itemId) return null;

  return (
    <div className="bp-root">

      {/* ── Topbar ────────────────────────────────────────────────────────── */}
      <header className="bp-topbar">
        <div className="bp-topbar-inner">
          <button className="bp-back-btn" onClick={handleCancel}>
            <ArrowLeft /> Back
          </button>
          <div className="bp-brand">
            <span className="bp-brand-icon"><MountainIcon /></span>
            <span>Shimla Travels</span>
          </div>
          <div className="bp-secure">
            <ShieldIcon /> Secure Booking
          </div>
        </div>
      </header>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      {step < 4 && (
        <div className="bp-progress">
          <div className="bp-progress-inner">
            {STEPS.slice(0, 3).map((s, i) => (
              <React.Fragment key={s.id}>
                <div className={`bp-step ${step === s.id ? 'bp-step-active' : ''} ${step > s.id ? 'bp-step-done' : ''}`}>
                  <div className="bp-step-dot">
                    {step > s.id ? <CheckIcon /> : s.id}
                  </div>
                  <span className="bp-step-label">{s.label}</span>
                </div>
                {i < 2 && <div className={`bp-step-line ${step > s.id ? 'bp-step-line-done' : ''}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="bp-body">

        {/* ── LEFT: Form area ─────────────────────────────────────────────── */}
        <div className="bp-main">

          {/* ══ STEP 1: DETAILS ══════════════════════════════════════════ */}
          {step === 1 && (
            <div className="bp-section">
              <h2 className="bp-section-title">
                <CalIcon /> {type === 'hotel' ? 'Hotel Booking Details' : 'Package Booking Details'}
              </h2>

              {/* Room selection (hotel only) */}
              {type === 'hotel' && roomTypes.length > 0 && (
                <div className="bp-field-group">
                  <label className="bp-label">Select Room Type</label>
                  <div className="bp-room-grid">
                    {roomTypes.map(r => (
                      <div
                        key={r.type}
                        className={`bp-room-card ${selectedRoom?.type === r.type ? 'bp-room-selected' : ''}`}
                        onClick={() => setSelectedRoom(r)}
                      >
                        <div className="bp-room-top">
                          <span className="bp-room-name">{r.type}</span>
                          <span className="bp-room-price">₹{fmt(r.price)}<small>/night</small></span>
                        </div>
                        {r.features?.length > 0 && (
                          <div className="bp-room-features">
                            {r.features.slice(0, 3).map(f => (
                              <span key={f} className="bp-room-feat">✓ {f}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates — hotel */}
              {type === 'hotel' && (
                <div className="bp-row-2">
                  <div className="bp-field">
                    <label className="bp-label">Check-in Date <span className="bp-req">*</span></label>
                    <input type="date" className={`bp-input ${detailErrors.checkIn ? 'bp-input-err' : ''}`}
                      value={checkIn} onChange={e => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]} />
                    <FieldErr msg={detailErrors.checkIn} />
                  </div>
                  <div className="bp-field">
                    <label className="bp-label">Check-out Date <span className="bp-req">*</span></label>
                    <input type="date" className={`bp-input ${detailErrors.checkOut ? 'bp-input-err' : ''}`}
                      value={checkOut} onChange={e => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]} />
                    <FieldErr msg={detailErrors.checkOut} />
                  </div>
                </div>
              )}

              {/* Dates — package */}
              {type === 'package' && (
                <div className="bp-field">
                  <label className="bp-label">Travel Date <span className="bp-req">*</span></label>
                  <input type="date" className={`bp-input ${detailErrors.travelDate ? 'bp-input-err' : ''}`}
                    value={travelDate} onChange={e => setTravelDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} />
                  <FieldErr msg={detailErrors.travelDate} />
                </div>
              )}

              {/* Guests */}
              <div className="bp-row-2">
                <div className="bp-field">
                  <label className="bp-label">{type === 'hotel' ? 'Guests' : 'Adults'}</label>
                  <div className="bp-counter">
                    <button type="button" className="bp-counter-btn"
                      onClick={() => setGuests(g => Math.max(1, g - 1))}>−</button>
                    <span className="bp-counter-val">{guests}</span>
                    <button type="button" className="bp-counter-btn"
                      onClick={() => setGuests(g => g + 1)}>+</button>
                  </div>
                </div>
                {type === 'hotel' && (
                  <div className="bp-field">
                    <label className="bp-label">Rooms</label>
                    <div className="bp-counter">
                      <button type="button" className="bp-counter-btn"
                        onClick={() => setRooms(r => Math.max(1, r - 1))}>−</button>
                      <span className="bp-counter-val">{rooms}</span>
                      <button type="button" className="bp-counter-btn"
                        onClick={() => setRooms(r => r + 1)}>+</button>
                    </div>
                  </div>
                )}
                {type === 'package' && (
                  <div className="bp-field">
                    <label className="bp-label">Children</label>
                    <div className="bp-counter">
                      <button type="button" className="bp-counter-btn"
                        onClick={() => setChildren(c => Math.max(0, c - 1))}>−</button>
                      <span className="bp-counter-val">{children}</span>
                      <button type="button" className="bp-counter-btn"
                        onClick={() => setChildren(c => c + 1)}>+</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pickup location (package) */}
              {type === 'package' && (
                <div className="bp-field">
                  <label className="bp-label">Pickup Location <span className="bp-req">*</span></label>
                  <input type="text" className={`bp-input ${detailErrors.pickup ? 'bp-input-err' : ''}`}
                    placeholder="e.g. Shimla Bus Stand, Railway Station"
                    value={pickup} onChange={e => setPickup(e.target.value)} />
                  <FieldErr msg={detailErrors.pickup} />
                </div>
              )}

              {/* Contact info */}
              <h3 className="bp-subsection">Contact Information</h3>
              <div className="bp-field">
                <label className="bp-label">Full Name <span className="bp-req">*</span></label>
                <input type="text" className={`bp-input ${detailErrors.fullName ? 'bp-input-err' : ''}`}
                  placeholder="Your full name" value={fullName}
                  onChange={e => setFullName(e.target.value)} />
                <FieldErr msg={detailErrors.fullName} />
              </div>
              <div className="bp-row-2">
                <div className="bp-field">
                  <label className="bp-label">Email <span className="bp-req">*</span></label>
                  <input type="email" className={`bp-input ${detailErrors.email ? 'bp-input-err' : ''}`}
                    placeholder="you@example.com" value={email}
                    onChange={e => setEmail(e.target.value)} />
                  <FieldErr msg={detailErrors.email} />
                </div>
                <div className="bp-field">
                  <label className="bp-label">Phone <span className="bp-req">*</span></label>
                  <input type="tel" className={`bp-input ${detailErrors.phone ? 'bp-input-err' : ''}`}
                    placeholder="+91 98765 43210" value={phone}
                    onChange={e => setPhone(e.target.value)} />
                  <FieldErr msg={detailErrors.phone} />
                </div>
              </div>

              <div className="bp-field">
                <label className="bp-label">Special Requests <span className="bp-opt">(optional)</span></label>
                <textarea className="bp-textarea" rows={3}
                  placeholder="Dietary needs, room preferences, accessibility requirements…"
                  value={specialReqs} onChange={e => setSpecialReqs(e.target.value)} />
              </div>

              <button className="bp-btn-primary" onClick={() => {
                if (!isAuthenticated) { navigate('/login'); return; }
                if (validateDetails()) setStep(2);
              }}>
                Continue to Payment →
              </button>
            </div>
          )}

          {/* ══ STEP 2: PAYMENT ══════════════════════════════════════════ */}
          {step === 2 && (
            <div className="bp-section">
              <h2 className="bp-section-title">Payment</h2>

              {payErrors.general && (
                <div className="bp-error-banner">⚠ {payErrors.general}</div>
              )}

              {/* Payment method tabs */}
              <div className="bp-pay-tabs">
                {[
                  { id: 'upi',        icon: '📱', label: 'UPI'         },
                  { id: 'card',       icon: '💳', label: 'Card'        },
                  { id: 'netbanking', icon: '🏦', label: 'Net Banking' },
                  { id: 'wallet',     icon: '👛', label: 'Wallet'      },
                ].map(m => (
                  <button key={m.id}
                    className={`bp-pay-tab ${payMethod === m.id ? 'bp-pay-tab-active' : ''}`}
                    onClick={() => { setPayMethod(m.id); setPayErrors({}); }}
                  >
                    <span className="bp-pay-tab-icon">{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI */}
              {payMethod === 'upi' && (
                <div className="bp-pay-form">
                  <div className="bp-pay-icon-big">📱</div>
                  <h3 className="bp-pay-method-title">Pay via UPI</h3>
                  <p className="bp-pay-hint">Enter your UPI ID to pay directly from your bank account</p>
                  <div className="bp-field">
                    <label className="bp-label">UPI ID <span className="bp-req">*</span></label>
                    <input type="text" className={`bp-input ${payErrors.upi ? 'bp-input-err' : ''}`}
                      placeholder="username@upi (e.g. name@okaxis)"
                      value={upiId} onChange={e => setUpiId(e.target.value)} />
                    <FieldErr msg={payErrors.upi} />
                  </div>
                  <div className="bp-upi-providers">
                    {['@okaxis', '@okicici', '@oksbi', '@ybl'].map(s => (
                      <span key={s} className="bp-upi-chip" onClick={() => {
                        const base = upiId.split('@')[0] || 'yourname';
                        setUpiId(base + s);
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Card */}
              {payMethod === 'card' && (
                <div className="bp-pay-form">
                  <div className="bp-pay-icon-big">💳</div>
                  <h3 className="bp-pay-method-title">Debit / Credit Card</h3>
                  <div className="bp-field">
                    <label className="bp-label">Card Number <span className="bp-req">*</span></label>
                    <input type="text" className={`bp-input bp-input-card ${payErrors.cardNum ? 'bp-input-err' : ''}`}
                      placeholder="1234 5678 9012 3456" maxLength={19}
                      value={cardNum}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                        setCardNum(v.replace(/(.{4})/g, '$1 ').trim());
                      }} />
                    <FieldErr msg={payErrors.cardNum} />
                  </div>
                  <div className="bp-field">
                    <label className="bp-label">Name on Card <span className="bp-req">*</span></label>
                    <input type="text" className={`bp-input ${payErrors.cardName ? 'bp-input-err' : ''}`}
                      placeholder="As printed on your card"
                      value={cardName} onChange={e => setCardName(e.target.value)} />
                    <FieldErr msg={payErrors.cardName} />
                  </div>
                  <div className="bp-row-2">
                    <div className="bp-field">
                      <label className="bp-label">Expiry <span className="bp-req">*</span></label>
                      <input type="text" className={`bp-input ${payErrors.cardExpiry ? 'bp-input-err' : ''}`}
                        placeholder="MM/YY" maxLength={5}
                        value={cardExpiry}
                        onChange={e => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
                          setCardExpiry(v);
                        }} />
                      <FieldErr msg={payErrors.cardExpiry} />
                    </div>
                    <div className="bp-field">
                      <label className="bp-label">CVV <span className="bp-req">*</span></label>
                      <input type="password" className={`bp-input ${payErrors.cardCvv ? 'bp-input-err' : ''}`}
                        placeholder="•••" maxLength={4}
                        value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} />
                      <FieldErr msg={payErrors.cardCvv} />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {payMethod === 'netbanking' && (
                <div className="bp-pay-form">
                  <div className="bp-pay-icon-big">🏦</div>
                  <h3 className="bp-pay-method-title">Net Banking</h3>
                  <p className="bp-pay-hint">Select your bank to proceed</p>
                  <div className="bp-bank-grid">
                    {BANKS.map(b => (
                      <div key={b}
                        className={`bp-bank-card ${bank === b ? 'bp-bank-selected' : ''}`}
                        onClick={() => setBank(b)}
                      >
                        <div className="bp-bank-icon">🏦</div>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <FieldErr msg={payErrors.bank} />
                </div>
              )}

              {/* Wallet */}
              {payMethod === 'wallet' && (
                <div className="bp-pay-form">
                  <div className="bp-pay-icon-big">👛</div>
                  <h3 className="bp-pay-method-title">Mobile Wallets</h3>
                  <div className="bp-wallet-grid">
                    {WALLETS.map(w => (
                      <div key={w.id}
                        className={`bp-wallet-card ${wallet === w.id ? 'bp-wallet-selected' : ''}`}
                        style={{ '--wallet-color': w.color }}
                        onClick={() => setWallet(w.id)}
                      >
                        <div className="bp-wallet-dot" style={{ background: w.color }} />
                        <span>{w.name}</span>
                      </div>
                    ))}
                  </div>
                  <FieldErr msg={payErrors.wallet} />
                </div>
              )}

              <div className="bp-pay-actions">
                <button className="bp-btn-secondary" onClick={() => setStep(1)}>
                  ← Back
                </button>
                <button className="bp-btn-pay" onClick={handlePayNow}>
                  🔒 Pay ₹{fmt(totalAmount)}
                </button>
              </div>

              <div className="bp-pay-trust">
                <ShieldIcon />
                <span>256-bit SSL encrypted · Demo mode — no real payment processed</span>
              </div>
            </div>
          )}

          {/* ══ STEP 3: PROCESSING ═══════════════════════════════════════ */}
          {step === 3 && (
            <div className="bp-section bp-processing">
              <div className="bp-processing-anim">
                <div className="bp-spinner-outer">
                  <div className="bp-spinner-inner" />
                </div>
                <div className="bp-processing-dots">
                  <span /><span /><span />
                </div>
              </div>
              <h2 className="bp-processing-title">Processing Payment</h2>
              <p className="bp-processing-msg">{processingMsg}</p>
              <div className="bp-processing-amount">₹{fmt(totalAmount)}</div>
              <div className="bp-processing-secure">
                <ShieldIcon /> Your payment is being processed securely
              </div>
            </div>
          )}

          {/* ══ STEP 4: CONFIRMATION ═════════════════════════════════════ */}
          {step === 4 && confirmation && (
            <div className="bp-section bp-confirmation">

              <div className="bp-confirm-hero">
                <div className="bp-confirm-check">
                  <CheckIcon />
                </div>
                <h1 className="bp-confirm-title">Booking Confirmed!</h1>
                <p className="bp-confirm-sub">
                  Your payment was successful and booking is confirmed.
                  A confirmation has been sent to <strong>{confirmation.email}</strong>
                </p>
              </div>

              <div className="bp-confirm-ref-card">
                <div className="bp-confirm-ref-label">Booking Reference</div>
                <div className="bp-confirm-ref-num">{confirmation.bookingReference}</div>
                {confirmation.transactionId && (
                  <div className="bp-confirm-txn">
                    Transaction ID: <code>{confirmation.transactionId}</code>
                  </div>
                )}
              </div>

              <div className="bp-confirm-details">
                <h3>Booking Summary</h3>
                <div className="bp-confirm-grid">
                  {[
                    [confirmation.type === 'hotel' ? '🏨 Hotel' : '📦 Package', confirmation.itemName],
                    confirmation.type === 'hotel'
                      ? ['📅 Check-in',  fmtDate(confirmation.checkIn)]
                      : ['📅 Travel Date', fmtDate(confirmation.travelDate)],
                    confirmation.type === 'hotel'
                      ? ['📅 Check-out', fmtDate(confirmation.checkOut)]
                      : ['👥 Travelers',  `${confirmation.guests} adults${confirmation.children ? `, ${confirmation.children} children` : ''}`],
                    confirmation.type === 'hotel'
                      ? ['🛏 Room',     confirmation.selectedRoom?.type || 'Standard']
                      : null,
                    ['👤 Name',        confirmation.fullName],
                    ['📧 Email',       confirmation.email],
                    ['📱 Phone',       confirmation.phone],
                    ['💳 Payment',     confirmation.paymentMethod?.toUpperCase()],
                    ['💰 Amount Paid', `₹${fmt(confirmation.amount)}`],
                    ['✅ Status',      'CONFIRMED'],
                  ].filter(Boolean).map(([label, val]) => (
                    <div key={label} className="bp-confirm-row">
                      <span className="bp-confirm-label">{label}</span>
                      <span className="bp-confirm-val">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bp-confirm-actions">
                <button className="bp-btn-primary" onClick={() => navigate('/account')}>
                  View My Bookings
                </button>
                <button className="bp-btn-secondary" onClick={() => navigate('/')}>
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Order summary (sticky) ─────────────────────────────── */}
        {step < 4 && (
          <aside className="bp-sidebar">
            <div className="bp-summary-card">
              {itemImage && (
                <img src={itemImage} alt={itemName} className="bp-summary-img"
                  onError={e => { e.target.style.display = 'none'; }} />
              )}
              <div className="bp-summary-body">
                <div className="bp-summary-type">{type === 'hotel' ? '🏨 Hotel' : '📦 Package'}</div>
                <h3 className="bp-summary-name">{itemName}</h3>
                {itemLocation && (
                  <div className="bp-summary-location">📍 {itemLocation}</div>
                )}
                {itemRating && (
                  <div className="bp-summary-rating">⭐ {itemRating}</div>
                )}

                <div className="bp-summary-divider" />

                <div className="bp-summary-rows">
                  {type === 'hotel' && selectedRoom && (
                    <div className="bp-summary-row">
                      <span>Room</span>
                      <span>{selectedRoom.type}</span>
                    </div>
                  )}
                  {type === 'hotel' && nights > 0 && (
                    <>
                      <div className="bp-summary-row">
                        <span>Check-in</span><span>{fmtDate(checkIn)}</span>
                      </div>
                      <div className="bp-summary-row">
                        <span>Check-out</span><span>{fmtDate(checkOut)}</span>
                      </div>
                      <div className="bp-summary-row">
                        <span>Nights</span><span>{nights}</span>
                      </div>
                    </>
                  )}
                  {type === 'package' && travelDate && (
                    <div className="bp-summary-row">
                      <span>Travel Date</span><span>{fmtDate(travelDate)}</span>
                    </div>
                  )}
                  <div className="bp-summary-row">
                    <span>{type === 'hotel' ? 'Guests' : 'Adults'}</span>
                    <span>{guests}</span>
                  </div>
                  {type === 'package' && children > 0 && (
                    <div className="bp-summary-row">
                      <span>Children</span><span>{children}</span>
                    </div>
                  )}
                  {type === 'hotel' && (
                    <div className="bp-summary-row">
                      <span>Rooms</span><span>{rooms}</span>
                    </div>
                  )}
                </div>

                {baseAmount > 0 && (
                  <>
                    <div className="bp-summary-divider" />
                    <div className="bp-summary-rows">
                      <div className="bp-summary-row">
                        <span>Subtotal</span>
                        <span>₹{fmt(baseAmount)}</span>
                      </div>
                      <div className="bp-summary-row bp-summary-tax">
                        <span>GST ({type === 'hotel' ? '18' : '5'}%)</span>
                        <span>₹{fmt(taxAmount)}</span>
                      </div>
                    </div>
                    <div className="bp-summary-total">
                      <span>Total</span>
                      <span>₹{fmt(totalAmount)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bp-trust-badges">
              <div className="bp-trust-item"><ShieldIcon /> Secure Payment</div>
              <div className="bp-trust-item">✓ Free Cancellation</div>
              <div className="bp-trust-item">✓ Instant Confirmation</div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
