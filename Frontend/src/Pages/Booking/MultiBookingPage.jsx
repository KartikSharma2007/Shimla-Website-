import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { bookingAPI, paymentAPI } from '../../services/api';
import './MultiBookingPage.css';

/* Icons */
const CheckIcon   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowLeft   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;
const ShieldIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const UserIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const MailIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.18 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const CalIcon     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const MapPinIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const UsersIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const HotelIcon   = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const PkgIcon     = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const UPIIcon     = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18"/></svg>;
const CardIcon    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const BankIcon    = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
const WalletIcon  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M22 12a2 2 0 0 0-2-2h-4a2 2 0 0 0 0 4h4a2 2 0 0 0 2-2z"/></svg>;
const NoteIcon    = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const StarIcon    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

const STEPS  = [
  { id: 1, label: "Trip Details" },
  { id: 2, label: "Payment"      },
  { id: 3, label: "Processing"   },
  { id: 4, label: "Confirmed"    },
];
const BANKS  = ["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra Bank","Punjab National Bank","Bank of Baroda"];
const WALLETS= [
  { id:"paytm",   name:"Paytm",      color:"#00baf2" },
  { id:"phonepe", name:"PhonePe",    color:"#5f259f" },
  { id:"gpay",    name:"Google Pay", color:"#4285f4" },
  { id:"amazon",  name:"Amazon Pay", color:"#ff9900" },
];

export default function MultiBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items=[], hotels=[], packages=[], returnTo="/favorites" } = location.state || {};

  const [step,            setStep]            = useState(1);
  const [isCreating,      setIsCreating]      = useState(false);
  const [detailErrs,      setDetailErrs]      = useState({});
  const [payErrs,         setPayErrs]         = useState({});
  const [genError,        setGenError]        = useState("");
  const [procMsg,         setProcMsg]         = useState("Connecting to payment gateway…");
  const [confirmation,    setConfirmation]    = useState(null);
  const [createdIds,      setCreatedIds]      = useState([]);
  const [primaryId,       setPrimaryId]       = useState(null);

  // Step 1 state
  const [fullName,    setFullName]    = useState(user?.fullName || "");
  const [email,       setEmail]       = useState(user?.email    || "");
  const [phone,       setPhone]       = useState(user?.phone    || "");
  const [checkIn,     setCheckIn]     = useState("");
  const [checkOut,    setCheckOut]    = useState("");
  const [travelDate,  setTravelDate]  = useState("");
  const [adults,      setAdults]      = useState(2);
  const [children,    setChildren]    = useState(0);
  const [pickup,      setPickup]      = useState("");
  const [specialReqs, setSpecialReqs] = useState("");

  // Step 2 state
  const [payMethod,   setPayMethod]   = useState("upi");
  const [upiId,       setUpiId]       = useState("");
  const [cardNum,     setCardNum]     = useState("");
  const [cardName,    setCardName]    = useState("");
  const [cardExpiry,  setCardExpiry]  = useState("");
  const [cardCvv,     setCardCvv]     = useState("");
  const [bank,        setBank]        = useState("");
  const [wallet,      setWallet]      = useState("");

  useEffect(() => {
    if (user) { setFullName(user.fullName||""); setEmail(user.email||""); setPhone(user.phone||""); }
  }, [user]);
  useEffect(() => { if (!items.length) navigate(returnTo, { replace: true }); }, []); // eslint-disable-line

  const hasHotels   = hotels.length > 0;
  const hasPackages = packages.length > 0;

  const nights = (() => {
    if (!checkIn || !checkOut) return 0;
    const d = new Date(checkOut) - new Date(checkIn);
    return d <= 0 ? 0 : Math.ceil(d / 86400000);
  })();

  const hotelTotal   = hotels.reduce((s,h)  => s + (h.price||0), 0) * Math.max(nights,1);
  const packageTotal = packages.reduce((s,p) => s + (p.price||p.costPerPerson||0), 0) * adults;
  const subtotal     = hotelTotal + packageTotal;
  const tax          = Math.round(subtotal * 0.12);
  const total        = subtotal + tax;
  const fmt          = n => (n||0).toLocaleString("en-IN");
  const fmtD         = d => d ? new Date(d).toLocaleDateString("en-IN", {day:"numeric",month:"short",year:"numeric"}) : "—";

  const validateDetails = () => {
    const e = {};
    if (!fullName.trim() || fullName.trim().length < 2)            e.fullName   = "Full name required";
    if (!email.trim()    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (!phone.trim()    || phone.replace(/\D/g,"").length < 10)   e.phone      = "Valid 10-digit phone required";
    if (hasHotels) {
      if (!checkIn)  e.checkIn  = "Check-in date required";
      if (!checkOut) e.checkOut = "Check-out date required";
      if (checkIn && checkOut && nights === 0) e.checkOut = "Check-out must be after check-in";
    }
    if (hasPackages && !travelDate) e.travelDate = "Travel date required";
    setDetailErrs(e);
    return !Object.keys(e).length;
  };

  const validatePayment = () => {
    const e = {};
    if (payMethod === "upi") {
      if (!upiId.trim())                                   e.upi      = "UPI ID required";
      else if (!/^[\w.\-]+@[\w]+$/.test(upiId.trim())) e.upi      = "Format: name@bank";
    }
    if (payMethod === "card") {
      if (cardNum.replace(/\s/g,"").length < 16) e.cardNum    = "Enter valid 16-digit number";
      if (!cardName.trim())                       e.cardName   = "Name on card required";
      if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) e.cardExpiry = "Format: MM/YY";
      if (cardCvv.length < 3)                    e.cardCvv    = "3-digit CVV required";
    }
    if (payMethod === "netbanking" && !bank)  e.bank   = "Select a bank";
    if (payMethod === "wallet"     && !wallet) e.wallet = "Select a wallet";
    setPayErrs(e);
    return !Object.keys(e).length;
  };

  const handleContinueToPayment = useCallback(async () => {
    if (!isAuthenticated) { navigate("/login"); return; }
    if (!validateDetails()) return;
    setIsCreating(true);
    setGenError("");
    const ci = { fullName, email, phone };
    const promises = [];
    for (const h of hotels) {
      promises.push(bookingAPI.createHotel({
        hotelId: h.id, hotelName: h.name,
        roomType: h.roomType||"Standard", roomPrice: h.price||0,
        checkIn, checkOut, guests: {adults,children}, rooms: 1,
        contactInfo: ci, specialRequests: specialReqs,
      }));
    }
    for (const p of packages) {
      promises.push(bookingAPI.createPackage({
        packageId: p.id, packageTitle: p.title||p.name,
        packagePrice: p.price||p.costPerPerson||0, packageDuration: p.duration||"",
        travelDate, guests: {adults,children}, pickupLocation: pickup||"",
        contactInfo: ci, specialRequests: specialReqs,
      }));
    }
    try {
      const results = await Promise.all(promises);
      const bookings = results.map(r => r.data?.data?.booking).filter(Boolean);
      const ids = bookings.map(b => b._id||b.id).filter(Boolean);
      if (!ids.length) throw new Error("No bookings created");
      setCreatedIds(ids);
      const orderRes = await paymentAPI.createOrder(ids[0]);
      const { orderId } = orderRes.data.data;
      setPrimaryId(ids[0]);
      setStep(2);
    } catch (err) {
      setGenError(err.response?.data?.message || err.message || "Failed to create bookings. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }, [isAuthenticated, fullName, email, phone, checkIn, checkOut, travelDate, adults, children, pickup, specialReqs, hotels, packages, navigate]); // eslint-disable-line

  const processPayment = useCallback(async () => {
    setStep(3);
    const msgs = ["Connecting to payment gateway…","Verifying payment details…","Processing transaction…","Confirming bookings…"];
    let i = 0;
    const iv = setInterval(() => { i++; if (i < msgs.length) setProcMsg(msgs[i]); }, 700);
    try {
      await new Promise(r => setTimeout(r, 2600));
      clearInterval(iv);
      setProcMsg("Payment successful! Generating confirmations…");
      await new Promise(r => setTimeout(r, 400));
      const res = await paymentAPI.confirmPayment({ bookingId: primaryId, paymentMethod: payMethod });
      const otherIds = createdIds.filter(id => id !== primaryId);
      await Promise.all(otherIds.map(id =>
        paymentAPI.confirmPayment({ bookingId: id, paymentMethod: payMethod }).catch(() => {})
      ));
      window.dispatchEvent(new CustomEvent("bookingConfirmed", {
        detail: { count: createdIds.length, bookingIds: createdIds, paymentMethod: payMethod, totalAmount: total },
      }));
      setConfirmation({
        bookingIds: createdIds, transactionId: res.data?.data?.transactionId,
        paymentMethod: payMethod, amount: total,
        fullName, email, phone, checkIn, checkOut, travelDate, adults, children,
        hotels, packages,
      });
      setStep(4);
    } catch (err) {
      clearInterval(iv);
      setPayErrs({ general: err.response?.data?.message || "Payment failed. Please try again." });
      setStep(2);
    }
  }, [primaryId, createdIds, payMethod, total, fullName, email, phone, checkIn, checkOut, travelDate, adults, children, hotels, packages]); // eslint-disable-line

  const handlePayNow = () => { if (validatePayment()) processPayment(); };

  const handleBack = async () => {
    if (createdIds.length > 0 && step === 2) {
      await Promise.all(createdIds.map(id => paymentAPI.failed({ bookingId: id, reason: "Cancelled" }).catch(() => {})));
    }
    navigate(returnTo);
  };

  const FieldErr = ({ msg }) => msg ? <span className="mbp-field-err">{msg}</span> : null;
  if (!items.length) return null;

  return (
    <div className="mbp-root">
      {/* Topbar */}
      <header className="mbp-topbar">
        <div className="mbp-topbar-inner">
          <button className="mbp-back-btn" onClick={handleBack}><ArrowLeft /> Back</button>
          <div className="mbp-brand"><span>🏔️</span><span>Shimla Travels</span></div>
          <div className="mbp-secure"><ShieldIcon /> Secure Booking</div>
        </div>
      </header>

      {/* Progress */}
      {step < 4 && (
        <div className="mbp-progress">
          <div className="mbp-progress-inner">
            {STEPS.slice(0,3).map((s,i) => (
              <React.Fragment key={s.id}>
                <div className={`mbp-step-item ${step===s.id?"active":""} ${step>s.id?"done":""}`}>
                  <div className="mbp-step-dot">{step > s.id ? <CheckIcon /> : s.id}</div>
                  <span className="mbp-step-label">{s.label}</span>
                </div>
                {i < 2 && <div className={`mbp-step-line ${step>s.id?"done":""}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="mbp-body">
        <div className="mbp-main">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="mbp-card">
              <div className="mbp-card-hd">
                <h2 className="mbp-card-title"><UsersIcon /> Trip Details</h2>
                <span className="mbp-cart-badge">
                  {hasHotels && `${hotels.length} hotel${hotels.length>1?"s":""}`}
                  {hasHotels && hasPackages && " + "}
                  {hasPackages && `${packages.length} package${packages.length>1?"s":""}`}
                </span>
              </div>

              {/* Items */}
              <div className="mbp-items-grid">
                {hotels.map((h,i) => (
                  <div key={i} className="mbp-item-card">
                    <img src={h.image||h.images?.[0]} alt={h.name} className="mbp-item-img"
                      onError={e=>{e.target.style.display="none"}} />
                    <div className="mbp-item-body">
                      <span className="mbp-item-badge hotel"><HotelIcon /> Hotel</span>
                      <div className="mbp-item-name">{h.name}</div>
                      {h.rating && <div className="mbp-item-rating"><StarIcon /> {h.rating}</div>}
                      <div className="mbp-item-price">₹{fmt(h.price)}<span>/night</span></div>
                    </div>
                  </div>
                ))}
                {packages.map((p,i) => (
                  <div key={i} className="mbp-item-card">
                    <img src={p.image||p.coverImage} alt={p.title||p.name} className="mbp-item-img"
                      onError={e=>{e.target.style.display="none"}} />
                    <div className="mbp-item-body">
                      <span className="mbp-item-badge pkg"><PkgIcon /> Package</span>
                      <div className="mbp-item-name">{p.title||p.name}</div>
                      {p.duration && <div className="mbp-item-dur">{p.duration}</div>}
                      <div className="mbp-item-price">₹{fmt(p.price||p.costPerPerson)}<span>/person</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hotel dates */}
              {hasHotels && (
                <div className="mbp-fsec">
                  <h3 className="mbp-fsec-title"><CalIcon /> Hotel Dates</h3>
                  <div className="mbp-row-2">
                    <div className="mbp-field">
                      <label className="mbp-label">Check-in <span className="mbp-req">*</span></label>
                      <div className="mbp-iw"><CalIcon />
                        <input type="date" className={`mbp-input ${detailErrs.checkIn?"err":""}`}
                          value={checkIn} onChange={e=>setCheckIn(e.target.value)}
                          min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <FieldErr msg={detailErrs.checkIn} />
                    </div>
                    <div className="mbp-field">
                      <label className="mbp-label">Check-out <span className="mbp-req">*</span></label>
                      <div className="mbp-iw"><CalIcon />
                        <input type="date" className={`mbp-input ${detailErrs.checkOut?"err":""}`}
                          value={checkOut} onChange={e=>setCheckOut(e.target.value)}
                          min={checkIn||new Date().toISOString().split("T")[0]} />
                      </div>
                      <FieldErr msg={detailErrs.checkOut} />
                      {nights > 0 && <span className="mbp-nights">{nights} night{nights>1?"s":""}</span>}
                    </div>
                  </div>
                </div>
              )}

              {/* Package dates */}
              {hasPackages && (
                <div className="mbp-fsec">
                  <h3 className="mbp-fsec-title"><CalIcon /> Package Travel Date</h3>
                  <div className="mbp-row-2">
                    <div className="mbp-field">
                      <label className="mbp-label">Travel Date <span className="mbp-req">*</span></label>
                      <div className="mbp-iw"><CalIcon />
                        <input type="date" className={`mbp-input ${detailErrs.travelDate?"err":""}`}
                          value={travelDate} onChange={e=>setTravelDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]} />
                      </div>
                      <FieldErr msg={detailErrs.travelDate} />
                    </div>
                    <div className="mbp-field">
                      <label className="mbp-label">Pickup Location <span className="mbp-opt">(optional)</span></label>
                      <div className="mbp-iw"><MapPinIcon />
                        <input type="text" className="mbp-input" placeholder="e.g. Shimla Railway Station"
                          value={pickup} onChange={e=>setPickup(e.target.value)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Travelers */}
              <div className="mbp-fsec">
                <h3 className="mbp-fsec-title"><UsersIcon /> Travelers</h3>
                <div className="mbp-row-2">
                  <div className="mbp-field">
                    <label className="mbp-label">Adults</label>
                    <div className="mbp-ctr">
                      <button type="button" onClick={()=>setAdults(a=>Math.max(1,a-1))}>−</button>
                      <span>{adults}</span>
                      <button type="button" onClick={()=>setAdults(a=>a+1)}>+</button>
                    </div>
                  </div>
                  <div className="mbp-field">
                    <label className="mbp-label">Children</label>
                    <div className="mbp-ctr">
                      <button type="button" onClick={()=>setChildren(c=>Math.max(0,c-1))}>−</button>
                      <span>{children}</span>
                      <button type="button" onClick={()=>setChildren(c=>c+1)}>+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mbp-fsec">
                <h3 className="mbp-fsec-title"><UserIcon /> Contact Information</h3>
                <div className="mbp-field">
                  <label className="mbp-label">Full Name <span className="mbp-req">*</span></label>
                  <div className="mbp-iw"><UserIcon />
                    <input type="text" className={`mbp-input ${detailErrs.fullName?"err":""}`}
                      placeholder="Your full name" value={fullName} onChange={e=>setFullName(e.target.value)} />
                  </div>
                  <FieldErr msg={detailErrs.fullName} />
                </div>
                <div className="mbp-row-2">
                  <div className="mbp-field">
                    <label className="mbp-label">Email <span className="mbp-req">*</span></label>
                    <div className="mbp-iw"><MailIcon />
                      <input type="email" className={`mbp-input ${detailErrs.email?"err":""}`}
                        placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
                    </div>
                    <FieldErr msg={detailErrs.email} />
                  </div>
                  <div className="mbp-field">
                    <label className="mbp-label">Phone <span className="mbp-req">*</span></label>
                    <div className="mbp-iw"><PhoneIcon />
                      <input type="tel" className={`mbp-input ${detailErrs.phone?"err":""}`}
                        placeholder="+91 98765 43210" value={phone} onChange={e=>setPhone(e.target.value)} />
                    </div>
                    <FieldErr msg={detailErrs.phone} />
                  </div>
                </div>
                <div className="mbp-field">
                  <label className="mbp-label">Special Requests <span className="mbp-opt">(optional)</span></label>
                  <div className="mbp-iw mbp-iw-ta"><NoteIcon />
                    <textarea className="mbp-textarea" rows={3}
                      placeholder="Dietary needs, accessibility, preferences…"
                      value={specialReqs} onChange={e=>setSpecialReqs(e.target.value)} />
                  </div>
                </div>
              </div>

              {genError && <div className="mbp-err-banner">⚠ {genError}</div>}

              <button className="mbp-btn-primary" onClick={handleContinueToPayment} disabled={isCreating}>
                {isCreating ? <><span className="mbp-spin-sm"/> Creating bookings…</> : "Continue to Payment →"}
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="mbp-card">
              <div className="mbp-card-hd">
                <h2 className="mbp-card-title"><CardIcon /> Payment</h2>
              </div>
              {payErrs.general && <div className="mbp-err-banner">⚠ {payErrs.general}</div>}

              <div className="mbp-pay-tabs">
                {[{id:"upi",Icon:UPIIcon,label:"UPI"},{id:"card",Icon:CardIcon,label:"Card"},{id:"netbanking",Icon:BankIcon,label:"Net Banking"},{id:"wallet",Icon:WalletIcon,label:"Wallet"}].map(({id,Icon,label})=>(
                  <button key={id} className={`mbp-pay-tab ${payMethod===id?"active":""}`}
                    onClick={()=>{setPayMethod(id);setPayErrs({})}}>
                    <Icon /><span>{label}</span>
                  </button>
                ))}
              </div>

              {payMethod==="upi" && (
                <div className="mbp-pay-form">
                  <div className="mbp-pay-ico"><UPIIcon /></div>
                  <h3 className="mbp-pay-title">Pay via UPI</h3>
                  <p className="mbp-pay-hint">Enter your UPI ID to pay directly from your bank</p>
                  <div className="mbp-field">
                    <label className="mbp-label">UPI ID <span className="mbp-req">*</span></label>
                    <div className="mbp-iw"><UPIIcon />
                      <input type="text" className={`mbp-input ${payErrs.upi?"err":""}`}
                        placeholder="username@upi  (e.g. name@okaxis)"
                        value={upiId} onChange={e=>setUpiId(e.target.value)} />
                    </div>
                    <FieldErr msg={payErrs.upi} />
                  </div>
                  <div className="mbp-upi-chips">
                    {["@okaxis","@okicici","@oksbi","@ybl"].map(s=>(
                      <span key={s} className="mbp-upi-chip"
                        onClick={()=>setUpiId((upiId.split("@")[0]||"yourname")+s)}>{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {payMethod==="card" && (
                <div className="mbp-pay-form">
                  <div className="mbp-pay-ico"><CardIcon /></div>
                  <h3 className="mbp-pay-title">Debit / Credit Card</h3>
                  <div className="mbp-field">
                    <label className="mbp-label">Card Number <span className="mbp-req">*</span></label>
                    <div className="mbp-iw"><CardIcon />
                      <input type="text" className={`mbp-input mbp-mono ${payErrs.cardNum?"err":""}`}
                        placeholder="1234 5678 9012 3456" maxLength={19} value={cardNum}
                        onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,16);setCardNum(v.replace(/(.{4})/g,"$1 ").trim())}} />
                    </div>
                    <FieldErr msg={payErrs.cardNum} />
                  </div>
                  <div className="mbp-field">
                    <label className="mbp-label">Name on Card <span className="mbp-req">*</span></label>
                    <div className="mbp-iw"><UserIcon />
                      <input type="text" className={`mbp-input ${payErrs.cardName?"err":""}`}
                        placeholder="As printed on your card" value={cardName} onChange={e=>setCardName(e.target.value)} />
                    </div>
                    <FieldErr msg={payErrs.cardName} />
                  </div>
                  <div className="mbp-row-2">
                    <div className="mbp-field">
                      <label className="mbp-label">Expiry <span className="mbp-req">*</span></label>
                      <input type="text" className={`mbp-input ${payErrs.cardExpiry?"err":""}`}
                        placeholder="MM/YY" maxLength={5} value={cardExpiry}
                        onChange={e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>2)v=v.slice(0,2)+"/"+v.slice(2);setCardExpiry(v)}} />
                      <FieldErr msg={payErrs.cardExpiry} />
                    </div>
                    <div className="mbp-field">
                      <label className="mbp-label">CVV <span className="mbp-req">*</span></label>
                      <input type="password" className={`mbp-input ${payErrs.cardCvv?"err":""}`}
                        placeholder="•••" maxLength={4} value={cardCvv}
                        onChange={e=>setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))} />
                      <FieldErr msg={payErrs.cardCvv} />
                    </div>
                  </div>
                </div>
              )}

              {payMethod==="netbanking" && (
                <div className="mbp-pay-form">
                  <div className="mbp-pay-ico"><BankIcon /></div>
                  <h3 className="mbp-pay-title">Net Banking</h3>
                  <p className="mbp-pay-hint">Select your bank to proceed</p>
                  <div className="mbp-bank-grid">
                    {BANKS.map(b=>(
                      <div key={b} className={`mbp-bank-card ${bank===b?"selected":""}`} onClick={()=>setBank(b)}>
                        <BankIcon /><span>{b}</span>
                      </div>
                    ))}
                  </div>
                  <FieldErr msg={payErrs.bank} />
                </div>
              )}

              {payMethod==="wallet" && (
                <div className="mbp-pay-form">
                  <div className="mbp-pay-ico"><WalletIcon /></div>
                  <h3 className="mbp-pay-title">Mobile Wallets</h3>
                  <div className="mbp-wallet-grid">
                    {WALLETS.map(w=>(
                      <div key={w.id} className={`mbp-wallet-card ${wallet===w.id?"selected":""}`}
                        style={{"--wc":w.color}} onClick={()=>setWallet(w.id)}>
                        <div className="mbp-wallet-dot" style={{background:w.color}} />
                        <span>{w.name}</span>
                      </div>
                    ))}
                  </div>
                  <FieldErr msg={payErrs.wallet} />
                </div>
              )}

              <div className="mbp-pay-actions">
                <button className="mbp-btn-sec" onClick={()=>setStep(1)}>← Back</button>
                <button className="mbp-btn-pay" onClick={handlePayNow}>
                  <ShieldIcon /> Pay ₹{fmt(total)}
                </button>
              </div>
              <div className="mbp-pay-trust"><ShieldIcon /><span>256-bit SSL encrypted · Demo mode — no real payment</span></div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="mbp-card mbp-proc-card">
              <div className="mbp-ring-wrap">
                <div className="mbp-ring-outer"><div className="mbp-ring-inner"/></div>
                <div className="mbp-dots"><span/><span/><span/></div>
              </div>
              <h2 className="mbp-proc-title">Processing Payment</h2>
              <p className="mbp-proc-msg">{procMsg}</p>
              <div className="mbp-proc-amt">₹{fmt(total)}</div>
              <div className="mbp-proc-note"><ShieldIcon/> Processing {items.length} booking{items.length>1?"s":""} securely</div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && confirmation && (
            <div className="mbp-card mbp-confirm-card">
              <div className="mbp-confirm-hero">
                <div className="mbp-confirm-ring"><CheckIcon /></div>
                <h1 className="mbp-confirm-h1">All Bookings Confirmed!</h1>
                <p className="mbp-confirm-sub">Payment successful. Confirmation sent to <strong>{confirmation.email}</strong></p>
              </div>

              <div className="mbp-refs">
                <h3 className="mbp-refs-title"><ShieldIcon /> Booking References</h3>
                {confirmation.hotels.map((h,i)=>(
                  <div key={i} className="mbp-ref-row">
                    <div className="mbp-ref-label"><HotelIcon /><span>{h.name}</span></div>
                    <span className="mbp-ref-code">
                      {confirmation.bookingIds[i] ? "BK-"+confirmation.bookingIds[i].slice(-8).toUpperCase() : "—"}
                    </span>
                  </div>
                ))}
                {confirmation.packages.map((p,i)=>(
                  <div key={i} className="mbp-ref-row">
                    <div className="mbp-ref-label"><PkgIcon /><span>{p.title||p.name}</span></div>
                    <span className="mbp-ref-code">
                      {confirmation.bookingIds[confirmation.hotels.length+i] ? "BK-"+confirmation.bookingIds[confirmation.hotels.length+i].slice(-8).toUpperCase() : "—"}
                    </span>
                  </div>
                ))}
                {confirmation.transactionId && (
                  <div className="mbp-ref-txn">Transaction ID: <code>{confirmation.transactionId}</code></div>
                )}
              </div>

              <div className="mbp-confirm-sum">
                <h3>Booking Summary</h3>
                {[
                  confirmation.checkIn    && ["📅 Check-in",    fmtD(confirmation.checkIn)],
                  confirmation.checkOut   && ["📅 Check-out",   fmtD(confirmation.checkOut)],
                  confirmation.travelDate && ["📅 Travel Date", fmtD(confirmation.travelDate)],
                  ["👥 Travelers",  `${confirmation.adults} adult${confirmation.adults>1?"s":""}${confirmation.children>0?`, ${confirmation.children} children`:""}`],
                  ["💳 Payment",    confirmation.paymentMethod?.toUpperCase()],
                  ["💰 Total Paid", `₹${fmt(confirmation.amount)}`],
                  ["✅ Status",     "CONFIRMED"],
                ].filter(Boolean).map(([k,v])=>(
                  <div key={k} className="mbp-confirm-row"><span>{k}</span><span>{v}</span></div>
                ))}
              </div>

              <div className="mbp-confirm-actions">
                <button className="mbp-btn-primary" onClick={()=>navigate("/account")}>View My Bookings</button>
                <button className="mbp-btn-sec"     onClick={()=>navigate("/")}>Back to Home</button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        {step <= 2 && (
          <aside className="mbp-sidebar">
            <div className="mbp-sum-card">
              <div className="mbp-sum-head">🛒 Order Summary</div>
              <div className="mbp-sum-body">
                {hotels.map((h,i)=>(
                  <div key={i} className="mbp-sum-item">
                    <span>🏨</span>
                    <div className="mbp-sum-info">
                      <div className="mbp-sum-name">{h.name}</div>
                      <div className="mbp-sum-sub">{nights>0?`₹${fmt(h.price)} × ${nights} night${nights>1?"s":""}`:(`₹${fmt(h.price)}/night`)}</div>
                    </div>
                    <span className="mbp-sum-price">₹{fmt((h.price||0)*Math.max(nights,1))}</span>
                  </div>
                ))}
                {packages.map((p,i)=>(
                  <div key={i} className="mbp-sum-item">
                    <span>📦</span>
                    <div className="mbp-sum-info">
                      <div className="mbp-sum-name">{p.title||p.name}</div>
                      <div className="mbp-sum-sub">₹{fmt(p.price||p.costPerPerson)} × {adults} adult{adults>1?"s":""}</div>
                    </div>
                    <span className="mbp-sum-price">₹{fmt((p.price||p.costPerPerson||0)*adults)}</span>
                  </div>
                ))}
                <div className="mbp-sum-div"/>
                <div className="mbp-sum-row"><span>Subtotal</span><span>₹{fmt(subtotal)}</span></div>
                <div className="mbp-sum-row mbp-sum-tax"><span>GST (12%)</span><span>₹{fmt(tax)}</span></div>
                <div className="mbp-sum-total"><span>Total</span><span>₹{fmt(total)}</span></div>
                <div className="mbp-trust">
                  <div><ShieldIcon/> Secure Payment</div>
                  <div>✓ Instant Confirmation</div>
                  <div>✓ Free Cancellation</div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
