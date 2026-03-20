import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './TermsPolicies.css';

const TermsPolicies = () => {
  const [activeSection, setActiveSection] = useState('terms');
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle initial hash-based scrolling when coming from another page
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="sh-terms-premium">
      {/* REMOVED: sh-navbar-spacer - no longer needed */}

      {/* Internal Header for Terms Page */}
      <header className="sh-terms-internal-header">
        <div className="sh-header-inner">
          <div className="sh-brand">Shimla Tourism</div>
          <nav className="sh-header-nav">
            <Link to="/">Home</Link>
            <Link to="/Hotel">Hotels</Link>
            <Link to="/packagess">Packages</Link>
            <Link to="/ContactUs">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="sh-premium-hero">
        <div className="sh-hero-inner">
          <span className="sh-hero-label">Legal Documentation</span>
          <h1>Terms & Policies</h1>
          <p className="sh-hero-lead">
            Transparent guidelines governing your use of Shimla Tourism services
          </p>
          <div className="sh-hero-meta">
            <span>Effective Date: February 2026</span>
            <span className="sh-meta-divider">|</span>
            <span>Version 2.1</span>
          </div>
        </div>
      </section>

      {/* Sticky Table of Contents */}
      <nav className={`sh-toc-nav ${isScrolled ? 'sh-toc-fixed' : ''}`}>
        <div className="sh-toc-inner">
          <div className="sh-toc-header">Table of Contents</div>
          <div className="sh-toc-links">
            {[
              { id: 'terms', num: 'I', label: 'Terms & Conditions' },
              { id: 'privacy', num: 'II', label: 'Privacy Policy' },
              { id: 'cancellation', num: 'III', label: 'Cancellation & Refunds' },
              { id: 'payment', num: 'IV', label: 'Payment Policy' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`sh-toc-link ${activeSection === item.id ? 'sh-toc-active' : ''}`}
              >
                <span className="sh-toc-num">{item.num}.</span>
                <span className="sh-toc-text">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Document Content */}
      <main className="sh-premium-main">
        <div className="sh-document-container">
          
          {/* Section I: Terms & Conditions */}
          <section id="terms" className="sh-document-section">
            <header className="sh-section-header">
              <div className="sh-section-marker">
                <span className="sh-marker-num">I</span>
                <div className="sh-marker-line"></div>
              </div>
              <div className="sh-section-title-block">
                <h2>Terms & Conditions</h2>
                <p className="sh-section-subtitle">General Terms of Service</p>
              </div>
            </header>

            <div className="sh-legal-content">
              <article className="sh-clause">
                <h3>A. Acceptance of Terms</h3>
                <p>
                  By accessing, browsing, or using the Shimla Tourism website, mobile applications, or any related services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms & Conditions ("Agreement"). This Agreement constitutes a binding contract between you and Shimla Tourism.
                </p>
                <p>
                  If you do not agree to all terms and conditions herein, you must immediately discontinue use of the Services. Your continued use constitutes acceptance of any modifications to this Agreement.
                </p>
              </article>

              <article className="sh-clause">
                <h3>B. Eligibility and Account Registration</h3>
                <p>
                  To use our Services, you represent and warrant that:
                </p>
                <ul className="sh-legal-list">
                  <li>You are at least eighteen (18) years of age or the age of legal majority in your jurisdiction;</li>
                  <li>You possess the legal authority to create a binding legal obligation;</li>
                  <li>All information provided during registration is accurate, current, and complete;</li>
                  <li>You will maintain and promptly update your account information to keep it accurate.</li>
                </ul>
                <p>
                  Shimla Tourism reserves the right to suspend or terminate accounts containing false, misleading, or incomplete information without prior notice.
                </p>
              </article>

              <article className="sh-clause">
                <h3>C. Booking and Reservation Terms</h3>
                <p>
                  All hotel accommodations and travel packages booked through our Services are subject to availability and confirmation by the respective service providers.
                </p>
                <div className="sh-clause-highlight-box">
                  <h4>Key Booking Conditions:</h4>
                  <ul className="sh-legal-list">
                    <li>Rates displayed are per accommodation unit, per night, unless otherwise specified;</li>
                    <li>Prices are inclusive of applicable taxes unless explicitly stated otherwise;</li>
                    <li>Standard check-in time is 12:00 PM; check-out time is 11:00 AM;</li>
                    <li>Early check-in and late check-out requests are subject to availability and may incur additional charges;</li>
                    <li>Valid government-issued photo identification is mandatory at check-in.</li>
                  </ul>
                </div>
              </article>

              <article className="sh-clause">
                <h3>D. User Conduct and Prohibited Activities</h3>
                <p>
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="sh-legal-list">
                  <li>Using the Services for fraudulent, illegal, or unauthorized purposes;</li>
                  <li>Interfering with or disrupting the integrity or performance of the platform;</li>
                  <li>Attempting to gain unauthorized access to systems or networks;</li>
                  <li>Transmitting any viruses, malware, or malicious code;</li>
                  <li>Scraping, data mining, or harvesting information without consent.</li>
                </ul>
                <p>
                  Violation of these provisions may result in immediate termination of access, legal liability, and cooperation with law enforcement authorities.
                </p>
              </article>

              <article className="sh-clause">
                <h3>E. Intellectual Property Rights</h3>
                <p>
                  All content, trademarks, service marks, trade names, logos, and intellectual property displayed on the Services are the property of Shimla Tourism or its licensors. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any materials without express written permission.
                </p>
              </article>

              <article className="sh-clause sh-clause-important">
                <h3>F. Limitation of Liability and Disclaimers</h3>
                <p>
                  <strong>Important Legal Notice:</strong> Shimla Tourism acts as an intermediary platform connecting travelers with independent third-party service providers (hotels, tour operators, transportation services). While we endeavor to ensure quality standards, we do not own, operate, or control these providers.
                </p>
                <p>
                  To the fullest extent permitted by law, Shimla Tourism shall not be liable for:
                </p>
                <ul className="sh-legal-list">
                  <li>Acts, omissions, negligence, or misconduct of third-party providers;</li>
                  <li>Personal injury, property damage, or loss occurring during travel;</li>
                  <li>Service quality issues, delays, cancellations, or overbookings;</li>
                  <li>Force majeure events including natural disasters, strikes, or government restrictions.</li>
                </ul>
                <p>
                  We strongly recommend purchasing comprehensive travel insurance to protect against unforeseen circumstances.
                </p>
              </article>

              <article className="sh-clause">
                <h3>G. Governing Law and Dispute Resolution</h3>
                <p>
                  This Agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising hereunder shall be subject to the exclusive jurisdiction of the courts in Shimla, Himachal Pradesh.
                </p>
              </article>
            </div>
          </section>

          {/* Section II: Privacy Policy */}
          <section id="privacy" className="sh-document-section">
            <header className="sh-section-header">
              <div className="sh-section-marker">
                <span className="sh-marker-num">II</span>
                <div className="sh-marker-line"></div>
              </div>
              <div className="sh-section-title-block">
                <h2>Privacy Policy</h2>
                <p className="sh-section-subtitle">Data Protection and Privacy Practices</p>
              </div>
            </header>

            <div className="sh-legal-content">
              <article className="sh-clause">
                <h3>A. Introduction and Scope</h3>
                <p>
                  Shimla Tourism is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our Services.
                </p>
                <p>
                  By using our Services, you consent to the practices described in this policy. If you disagree with any terms, please discontinue use immediately.
                </p>
              </article>

              <article className="sh-clause">
                <h3>B. Information We Collect</h3>
                <p>
                  We collect categories of information necessary to provide and improve our Services:
                </p>
                
                <div className="sh-data-category">
                  <h4>1. Personal Identification Information</h4>
                  <ul className="sh-legal-list">
                    <li>Full legal name and date of birth</li>
                    <li>Contact information (email address, phone number, residential address)</li>
                    <li>Government-issued identification details for verification</li>
                    <li>Emergency contact information</li>
                  </ul>
                </div>

                <div className="sh-data-category">
                  <h4>2. Booking and Transaction Data</h4>
                  <ul className="sh-legal-list">
                    <li>Hotel and travel package preferences</li>
                    <li>Travel dates and itinerary details</li>
                    <li>Payment method information (encrypted)</li>
                    <li>Billing address and transaction history</li>
                  </ul>
                </div>

                <div className="sh-data-category">
                  <h4>3. Technical and Usage Information</h4>
                  <ul className="sh-legal-list">
                    <li>IP address and device identifiers</li>
                    <li>Browser type and operating system</li>
                    <li>Website usage patterns and preferences</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </article>

              <article className="sh-clause">
                <h3>C. Purpose of Data Processing</h3>
                <p>
                  We process your personal data for the following lawful purposes:
                </p>
                <ul className="sh-legal-list">
                  <li><strong>Service Provision:</strong> Processing bookings, sending confirmations, managing reservations;</li>
                  <li><strong>Customer Support:</strong> Responding to inquiries, resolving disputes, providing assistance;</li>
                  <li><strong>Legal Compliance:</strong> Fulfilling regulatory obligations, preventing fraud;</li>
                  <li><strong>Service Improvement:</strong> Analyzing usage patterns, enhancing functionality;</li>
                  <li><strong>Communication:</strong> Sending service updates, promotional materials (with consent).</li>
                </ul>
              </article>

              <article className="sh-clause">
                <h3>D. Data Security Measures</h3>
                <p>
                  We implement industry-standard security protocols to protect your information:
                </p>
                <ul className="sh-legal-list">
                  <li>256-bit SSL encryption for all data transmission</li>
                  <li>PCI-DSS compliant payment processing</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Restricted access controls and authentication protocols</li>
                  <li>Secure data storage with redundant backup systems</li>
                </ul>
                <p>
                  While we employ robust security measures, no internet transmission is completely secure. Users acknowledge this inherent risk.
                </p>
              </article>

              <article className="sh-clause">
                <h3>E. Your Privacy Rights</h3>
                <p>
                  Subject to applicable law, you have the right to:
                </p>
                <ul className="sh-legal-list">
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data ("right to be forgotten")</li>
                  <li>Object to or restrict certain processing activities</li>
                  <li>Data portability (receiving data in machine-readable format)</li>
                  <li>Withdraw consent for marketing communications</li>
                </ul>
                <p>
                  To exercise these rights, please contact us through your account dashboard or via our support channels.
                </p>
              </article>

              <article className="sh-clause">
                <h3>F. Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar technologies to enhance user experience, analyze traffic, and personalize content. You may manage cookie preferences through your browser settings. Essential cookies necessary for site operation cannot be disabled.
                </p>
              </article>
            </div>
          </section>

          {/* Section III: Cancellation & Refund */}
          <section id="cancellation" className="sh-document-section">
            <header className="sh-section-header">
              <div className="sh-section-marker">
                <span className="sh-marker-num">III</span>
                <div className="sh-marker-line"></div>
              </div>
              <div className="sh-section-title-block">
                <h2>Cancellation & Refund Policy</h2>
                <p className="sh-section-subtitle">Booking Modification and Refund Terms</p>
              </div>
            </header>

            <div className="sh-legal-content">
              <article className="sh-clause sh-clause-highlight">
                <h3>A. Free Cancellation Guarantee</h3>
                <p>
                  Shimla Tourism offers flexible booking options with Free Cancellation on eligible reservations. Properties and packages marked with "Free Cancellation" may be cancelled without penalty within the specified time window displayed at booking.
                </p>
              </article>

              <article className="sh-clause">
                <h3>B. Hotel Cancellation Schedule</h3>
                <p>
                  Cancellation requests must be submitted through your account dashboard or by contacting customer support. Refund eligibility is determined by the following schedule:
                </p>
                
                <div className="sh-schedule-table">
                  <div className="sh-table-header">
                    <div className="sh-th">Cancellation Timing</div>
                    <div className="sh-th">Refund Percentage</div>
                    <div className="sh-th">Processing Fee</div>
                  </div>
                  <div className="sh-table-row">
                    <div className="sh-td" data-label="Cancellation Timing">
                      <strong>48+ hours before check-in</strong>
                      <span>Standard and non-peak bookings</span>
                    </div>
                    <div className="sh-td sh-td-positive" data-label="Refund">100%</div>
                    <div className="sh-td" data-label="Fee">None</div>
                  </div>
                  <div className="sh-table-row">
                    <div className="sh-td" data-label="Cancellation Timing">
                      <strong>24-48 hours before check-in</strong>
                      <span>Peak season may vary</span>
                    </div>
                    <div className="sh-td sh-td-partial" data-label="Refund">75%</div>
                    <div className="sh-td" data-label="Fee">₹200</div>
                  </div>
                  <div className="sh-table-row">
                    <div className="sh-td" data-label="Cancellation Timing">
                      <strong>12-24 hours before check-in</strong>
                      <span>Subject to property policy</span>
                    </div>
                    <div className="sh-td sh-td-partial" data-label="Refund">50%</div>
                    <div className="sh-td" data-label="Fee">₹200</div>
                  </div>
                  <div className="sh-table-row">
                    <div className="sh-td" data-label="Cancellation Timing">
                      <strong>Less than 12 hours before check-in</strong>
                      <span>No-show scenarios</span>
                    </div>
                    <div className="sh-td sh-td-negative" data-label="Refund">0%</div>
                    <div className="sh-td" data-label="Fee">N/A</div>
                  </div>
                </div>

                <p className="sh-schedule-note">
                  <strong>Note:</strong> Peak season (December 20 - January 05) requires 7 days notice for full refund. Non-refundable bookings are clearly marked and exempt from standard cancellation terms.
                </p>
              </article>

              <article className="sh-clause">
                <h3>C. Travel Package Cancellation</h3>
                <p>
                  For curated travel packages, the following cancellation structure applies:
                </p>
                <ul className="sh-legal-list">
                  <li><strong>15+ days before departure:</strong> Full refund less 5% administrative fee</li>
                  <li><strong>7-15 days before departure:</strong> 75% refund (vendor deposits retained)</li>
                  <li><strong>3-7 days before departure:</strong> 50% refund (significant costs committed)</li>
                  <li><strong>Less than 3 days:</strong> No refund (100% cancellation charges apply)</li>
                </ul>
              </article>

              <article className="sh-clause">
                <h3>D. Refund Processing Timeline</h3>
                <p>
                  Approved refunds are processed according to the following timeline:
                </p>
                <ul className="sh-legal-list">
                  <li><strong>Internal Processing:</strong> 5-7 business days from cancellation confirmation</li>
                  <li><strong>Credit/Debit Cards:</strong> 5-10 business days (dependent on issuing bank)</li>
                  <li><strong>UPI Transfers:</strong> 24-48 hours to source account</li>
                  <li><strong>Digital Wallets:</strong> 24-48 hours to wallet balance</li>
                  <li><strong>Net Banking:</strong> 3-5 business days to account</li>
                </ul>
                <p>
                  Refunds are issued to the original payment method used for booking. Processing times may vary during high-volume periods.
                </p>
              </article>

              <article className="sh-clause">
                <h3>E. Force Majeure and Exceptional Circumstances</h3>
                <p>
                  In cases of force majeure events—including natural disasters (landslides, earthquakes, severe weather), government-imposed travel restrictions, strikes, or pandemic-related prohibitions—we offer:
                </p>
                <ul className="sh-legal-list">
                  <li>Full refund or free rescheduling options</li>
                  <li>Minimal processing fees (₹500 for packages, ₹200 for hotels)</li>
                  <li>Travel credit valid for 12 months from issue date</li>
                </ul>
                <p>
                  Documentation may be required to verify force majeure eligibility.
                </p>
              </article>
            </div>
          </section>

          {/* Section IV: Payment Policy */}
          <section id="payment" className="sh-document-section">
            <header className="sh-section-header">
              <div className="sh-section-marker">
                <span className="sh-marker-num">IV</span>
                <div className="sh-marker-line"></div>
              </div>
              <div className="sh-section-title-block">
                <h2>Payment Policy</h2>
                <p className="sh-section-subtitle">Payment Terms and Security</p>
              </div>
            </header>

            <div className="sh-legal-content">
              <article className="sh-clause">
                <h3>A. Accepted Payment Instruments</h3>
                <p>
                  Shimla Tourism accepts the following payment methods for bookings:
                </p>
                <div className="sh-payment-grid">
                  <div className="sh-payment-card">
                    <h4>Card Payments</h4>
                    <p>Visa, MasterCard, American Express, RuPay, Diners Club</p>
                  </div>
                  <div className="sh-payment-card">
                    <h4>Unified Payments Interface</h4>
                    <p>Google Pay, PhonePe, Paytm, BHIM, Amazon Pay</p>
                  </div>
                  <div className="sh-payment-card">
                    <h4>Net Banking</h4>
                    <p>50+ major Indian banks, NEFT/RTGS for corporate bookings</p>
                  </div>
                  <div className="sh-payment-card">
                    <h4>Digital Wallets</h4>
                    <p>MobiKwik, Freecharge, JioMoney, Airtel Money</p>
                  </div>
                </div>
              </article>

              <article className="sh-clause">
                <h3>B. Payment Structure Options</h3>
                <p>
                  We offer flexible payment structures to accommodate your preferences:
                </p>
                
                <div className="sh-payment-option">
                  <h4>1. Pay at Hotel</h4>
                  <p>
                    Reserve your accommodation with a nominal advance (₹1-500) and settle the balance directly at the property during check-in. This option provides maximum flexibility but does not guarantee the lowest rate.
                  </p>
                </div>

                <div className="sh-payment-option sh-payment-recommended">
                  <span className="sh-recommended-badge">Recommended</span>
                  <h4>2. Prepaid</h4>
                  <p>
                    Complete full payment at time of booking to secure guaranteed lowest rates and confirmed reservations. Recommended during peak travel seasons and for high-demand properties.
                  </p>
                </div>

                <div className="sh-payment-option">
                  <h4>3. Part Payment</h4>
                  <p>
                    Pay 25% advance to hold your reservation, with remaining balance due 48 hours before check-in. Ideal for advance planners seeking rate security with partial deferment.
                  </p>
                </div>
              </article>

              <article className="sh-clause">
                <h3>C. Pricing Transparency</h3>
                <p>
                  All prices displayed on our platform are:
                </p>
                <ul className="sh-legal-list">
                  <li>Denominated in Indian Rupees (INR)</li>
                  <li>Inclusive of Goods and Services Tax (GST) at 18%</li>
                  <li>Subject to applicable resort fees, tourism taxes, and local levies as disclosed</li>
                  <li>Free from hidden charges or convenience fees</li>
                </ul>
                <p>
                  Currency conversion charges (2-3%) may apply for international card transactions.
                </p>
              </article>

              <article className="sh-clause sh-clause-security">
                <h3>D. Payment Security</h3>
                <p>
                  We maintain the highest standards of payment security:
                </p>
                <ul className="sh-legal-list">
                  <li>256-bit SSL encryption for all transactions</li>
                  <li>PCI-DSS Level 1 compliant payment processing</li>
                  <li>3D Secure authentication for card transactions</li>
                  <li>Tokenization technology—complete card numbers are never stored on our servers</li>
                  <li>Real-time fraud monitoring and detection systems</li>
                </ul>
              </article>

              <article className="sh-clause">
                <h3>E. Failed Transactions and Disputes</h3>
                <p>
                  In the event of a failed transaction where funds are debited but booking confirmation is not received:
                </p>
                <ul className="sh-legal-list">
                  <li>Do not attempt multiple transactions</li>
                  <li>Contact customer support immediately with transaction reference</li>
                  <li>Automatic reversal is initiated within 24 hours for duplicate charges</li>
                  <li>Resolution is guaranteed within 48 business hours</li>
                </ul>
                <p>
                  For billing disputes, please contact us within 7 days of transaction date for prompt resolution.
                </p>
              </article>

              <article className="sh-clause">
                <h3>F. Financing Options</h3>
                <p>
                  For eligible bookings exceeding ₹3,000, we offer:
                </p>
                <ul className="sh-legal-list">
                  <li><strong>Credit Card EMI:</strong> 3, 6, 9, or 12 month tenures</li>
                  <li><strong>Zero-Cost EMI:</strong> Available through partner bank offers (HDFC, ICICI, SBI, Axis)</li>
                  <li><strong>Pay Later:</strong> Book now, pay within 14 days via Simpl, LazyPay (subject to eligibility)</li>
                </ul>
              </article>
            </div>
          </section>

          {/* Document Footer */}
          <footer className="sh-document-footer">
            <div className="sh-footer-seal">
              <div className="sh-seal-icon">✓</div>
              <div className="sh-seal-text">
                <span>Document Certified</span>
                <span>Last Reviewed: February 2026</span>
              </div>
            </div>
            <p className="sh-footer-note">
              These terms and policies are subject to periodic updates. Users are encouraged to review this document regularly. 
              For questions or clarifications, please contact our Legal Compliance team.
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default TermsPolicies;