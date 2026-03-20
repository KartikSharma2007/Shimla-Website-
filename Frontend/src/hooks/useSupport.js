import { useState, useCallback, useRef } from 'react';
import { supportAPI } from '../services/api';

/**
 * useSupport Hook
 * Manages support chat and contact operations
 */

export const useSupport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [quickReplies, setQuickReplies] = useState([]);
  const sessionRef = useRef(null);

  // Initialize chat session
  const initChat = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await supportAPI.initChat();
      const { sessionId: newSessionId, message, quickReplies: replies } = response.data.data;
      
      setSessionId(newSessionId);
      sessionRef.current = newSessionId;
      
      // Add welcome message
      setMessages([{
        id: Date.now(),
        type: 'bot',
        content: message,
        timestamp: new Date(),
      }]);
      
      setQuickReplies(replies || []);
      
      return { success: true, sessionId: newSessionId };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to start chat';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send message to chat
  const sendMessage = useCallback(async (message, quickReplyId = null) => {
    if (!sessionRef.current) {
      return { success: false, error: 'Chat session not initialized' };
    }

    setIsLoading(true);
    setError(null);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await supportAPI.sendMessage({
        sessionId: sessionRef.current,
        message,
        quickReplyId,
      });

      const { 
        message: botMessage, 
        details, 
        options, 
        quickReplies: replies,
        action 
      } = response.data.data;

      // Add bot response
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: botMessage,
        details,
        options,
        action,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      if (replies) {
        setQuickReplies(replies);
      }

      return { success: true, response: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send message';
      setError(message);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        type: 'error',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      }]);
      
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Send quick reply
  const sendQuickReply = useCallback(async (replyId, replyLabel) => {
    return sendMessage(replyLabel, replyId);
  }, [sendMessage]);

  // Get contact info
  const getContactInfo = useCallback(async () => {
    try {
      const response = await supportAPI.getContactInfo();
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to get contact info';
      return { success: false, error: message };
    }
  }, []);

  // Submit support ticket
  const submitTicket = useCallback(async (ticketData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await supportAPI.submitTicket(ticketData);
      return { success: true, data: response.data.data };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to submit ticket';
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    sessionRef.current = null;
    setQuickReplies([]);
  }, []);

  // Make phone call
  const makePhoneCall = useCallback((phoneNumber) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  }, []);

  // Send email
  const sendEmail = useCallback((email, subject = 'Support Request - Shimla Travels') => {
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
  }, []);

  return {
    isLoading,
    error,
    messages,
    sessionId,
    quickReplies,
    initChat,
    sendMessage,
    sendQuickReply,
    getContactInfo,
    submitTicket,
    clearChat,
    makePhoneCall,
    sendEmail,
  };
};

export default useSupport;
