import { useState, useCallback } from 'react';
import { bookingAPI, paymentAPI } from '../services/api';

/**
 * usePayment — Mock payment flow hook.
 *
 * Flow:
 *  1. createHotel / createPackage booking  → status: creating_booking
 *  2. POST /payments/create-order          → status: creating_order
 *  3. Show mock payment UI (caller handles UI) → status: awaiting_payment
 *  4. POST /payments/confirm               → status: verifying → success
 *  OR POST /payments/failed               → status: failed
 */

export const usePayment = () => {
  const [paymentState, setPaymentState] = useState({
    status: 'idle',   // idle | creating_booking | creating_order | awaiting_payment | verifying | success | failed
    bookingId: null,
    bookingReference: null,
    orderId: null,
    amount: null,
    errorMessage: null,
  });

  const resetPayment = useCallback(() => {
    setPaymentState({
      status: 'idle', bookingId: null, bookingReference: null,
      orderId: null, amount: null, errorMessage: null,
    });
  }, []);

  // Shared inner logic used by both hotel and package
  const _runPaymentFlow = useCallback(async (createFn, bookingData) => {
    // Step 1: Create booking
    setPaymentState(s => ({ ...s, status: 'creating_booking', errorMessage: null }));
    const bookingRes = await createFn(bookingData);
    const booking    = bookingRes.data.data.booking;
    const bookingId  = booking._id || booking.id;

    // Step 2: Create order
    setPaymentState(s => ({
      ...s,
      status: 'creating_order',
      bookingId,
      bookingReference: booking.bookingReference,
    }));
    const orderRes = await paymentAPI.createOrder(bookingId);
    const { orderId, amount } = orderRes.data.data;

    // Step 3: Ready for UI to show mock payment modal
    setPaymentState(s => ({
      ...s,
      status: 'awaiting_payment',
      orderId,
      amount,
    }));

    return { bookingId, bookingReference: booking.bookingReference, orderId, amount };
  }, []);

  /**
   * initiateHotelPayment — step 1-3 for hotel.
   * Returns order info; caller must show MockPaymentModal and call confirmPayment / cancelPayment.
   */
  const initiateHotelPayment = useCallback(async (bookingData) => {
    try {
      return await _runPaymentFlow(bookingAPI.createHotel, bookingData);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Could not initiate payment.';
      setPaymentState(s => ({ ...s, status: 'failed', errorMessage: msg }));
      throw err;
    }
  }, [_runPaymentFlow]);

  /**
   * initiatePackagePayment — step 1-3 for package.
   */
  const initiatePackagePayment = useCallback(async (bookingData) => {
    try {
      return await _runPaymentFlow(bookingAPI.createPackage, bookingData);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Could not initiate payment.';
      setPaymentState(s => ({ ...s, status: 'failed', errorMessage: msg }));
      throw err;
    }
  }, [_runPaymentFlow]);

  /**
   * confirmPayment — call after user "pays" in MockPaymentModal.
   */
  const confirmPayment = useCallback(async ({ bookingId, paymentMethod = 'upi' }) => {
    try {
      setPaymentState(s => ({ ...s, status: 'verifying' }));
      const res = await paymentAPI.confirmPayment({ bookingId, paymentMethod });
      setPaymentState(s => ({ ...s, status: 'success' }));
      // Notify Account dashboard
      window.dispatchEvent(new CustomEvent('bookingConfirmed', { detail: res.data.data }));
      return res.data.data;
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Payment confirmation failed.';
      setPaymentState(s => ({ ...s, status: 'failed', errorMessage: msg }));
      throw err;
    }
  }, []);

  /**
   * cancelPayment — call when user closes the MockPaymentModal without paying.
   */
  const cancelPayment = useCallback(async ({ bookingId }) => {
    try {
      await paymentAPI.failed({ bookingId, reason: 'Cancelled by user' });
    } catch (_) { /* best effort */ }
    setPaymentState(s => ({ ...s, status: 'idle' }));
  }, []);

  const isProcessing      = ['creating_booking', 'creating_order', 'verifying'].includes(paymentState.status);
  const isAwaitingPayment = paymentState.status === 'awaiting_payment';
  const isSuccess         = paymentState.status === 'success';
  const isFailed          = paymentState.status === 'failed';

  return {
    paymentState,
    isProcessing,
    isAwaitingPayment,
    isSuccess,
    isFailed,
    initiateHotelPayment,
    initiatePackagePayment,
    confirmPayment,
    cancelPayment,
    resetPayment,
  };
};

export default usePayment;
