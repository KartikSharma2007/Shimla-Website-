import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, CreditCard, Smartphone, Building2, Wallet, Check, Loader, AlertCircle } from 'lucide-react';
import './MockPaymentModal.css';

/**
 * MockPaymentModal — rendered via React Portal at document.body level.
 * This guarantees it appears ABOVE all other modals regardless of z-index stacking contexts.
 * No real transaction — clicking "Pay Now" calls onConfirm(paymentMethod).
 */
export default function MockPaymentModal({ isOpen, onConfirm, onCancel, amount, bookingReference, isVerifying }) {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId]         = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [error, setError]          = useState('');

  if (!isOpen) return null;

  const methods = [
    { id: 'upi',        label: 'UPI',         icon: <Smartphone size={18} /> },
    { id: 'card',       label: 'Card',         icon: <CreditCard  size={18} /> },
    { id: 'netbanking', label: 'Net Banking',  icon: <Building2   size={18} /> },
    { id: 'wallet',     label: 'Wallet',       icon: <Wallet      size={18} /> },
  ];

  const handlePay = () => {
    setError('');
    if (selectedMethod === 'upi' && !upiId.trim()) {
      setError('Please enter your UPI ID'); return;
    }
    if (selectedMethod === 'card' && cardNumber.replace(/\s/g, '').length < 16) {
      setError('Please enter a valid 16-digit card number'); return;
    }
    onConfirm(selectedMethod);
  };

  const modal = (
    <div className="mpm-overlay" onClick={onCancel}>
      <div className="mpm-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="mpm-header">
          <div className="mpm-brand">
            <Shield size={18} className="mpm-brand-icon" />
            <span>Shimla Travels</span>
            <span className="mpm-secure-badge">🔒 Secure Payment</span>
          </div>
          <button className="mpm-close" onClick={onCancel} disabled={isVerifying}>
            <X size={16} />
          </button>
        </div>

        {/* Amount */}
        <div className="mpm-amount-row">
          <div>
            <div className="mpm-amount-label">Amount to Pay</div>
            {bookingReference && <div className="mpm-ref">Ref: {bookingReference}</div>}
          </div>
          <div className="mpm-amount">₹{Number(amount || 0).toLocaleString('en-IN')}</div>
        </div>

        {/* Method tabs */}
        <div className="mpm-methods">
          {methods.map(m => (
            <button
              key={m.id}
              className={`mpm-method ${selectedMethod === m.id ? 'active' : ''}`}
              onClick={() => { setSelectedMethod(m.id); setError(''); }}
              disabled={isVerifying}
            >
              {m.icon}
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Method-specific input */}
        <div className="mpm-input-area">
          {selectedMethod === 'upi' && (
            <div className="mpm-field">
              <label>UPI ID</label>
              <input type="text" placeholder="yourname@upi" value={upiId}
                onChange={e => setUpiId(e.target.value)} disabled={isVerifying} />
              <p className="mpm-hint">Enter any UPI ID (this is a demo)</p>
            </div>
          )}
          {selectedMethod === 'card' && (
            <div className="mpm-field">
              <label>Card Number</label>
              <input type="text" placeholder="4111 1111 1111 1111" maxLength={19}
                value={cardNumber}
                onChange={e => {
                  const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                  setCardNumber(v.replace(/(.{4})/g, '$1 ').trim());
                }}
                disabled={isVerifying} />
              <p className="mpm-hint">Use any 16-digit number (this is a demo)</p>
            </div>
          )}
          {selectedMethod === 'netbanking' && (
            <div className="mpm-field">
              <label>Select Bank</label>
              <select disabled={isVerifying}>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
              <p className="mpm-hint">This is a demo — no real bank login required</p>
            </div>
          )}
          {selectedMethod === 'wallet' && (
            <div className="mpm-field">
              <label>Select Wallet</label>
              <div className="mpm-wallet-options">
                {['Paytm', 'PhonePe', 'Google Pay', 'Amazon Pay'].map(w => (
                  <div key={w} className="mpm-wallet-chip">{w}</div>
                ))}
              </div>
              <p className="mpm-hint">This is a demo — click Pay Now to simulate</p>
            </div>
          )}
        </div>

        {error && (
          <div className="mpm-error"><AlertCircle size={14} /> {error}</div>
        )}

        <button className="mpm-pay-btn" onClick={handlePay} disabled={isVerifying}>
          {isVerifying
            ? <><Loader size={16} className="mpm-spin" /> Confirming…</>
            : <><Check size={16} /> Pay ₹{Number(amount || 0).toLocaleString('en-IN')}</>
          }
        </button>

        <p className="mpm-demo-notice">🧪 Demo Mode — No real payment will be charged</p>
      </div>
    </div>
  );

  // ✅ Portal: renders at document.body — completely outside all other modal trees
  return createPortal(modal, document.body);
}
