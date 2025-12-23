// app/refund-policy/page.tsx
'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function RefundPolicyPage() {
  return (
    <div className="pt-16 min-h-screen" style={{ backgroundColor: '#FFE0C0' }}>
      {/* Orange Gradient Bar */}
      <div
        className="w-full h-2"
        style={{
          background: 'linear-gradient(to right, #FB921D, #C55A00)'
        }}
      />

      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: 'white',
          borderColor: '#FFD0A0'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center mb-6 transition-all duration-300"
            style={{ color: '#FB921D' }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = '#E67E0F';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = '#FB921D';
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: '#1a1a1a' }}
            >
              Cancellation & Refund Policy
            </h1>
            <p className="text-sm" style={{ color: '#666' }}>
              <strong>Effective Date:</strong> December 17, 2025<br />
              <strong>Last Updated:</strong> December 17, 2025
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          style={{ border: '1px solid #FFD0A0' }}
        >
          <div className="prose prose-lg max-w-none" style={{ color: '#333' }}>
            
            <p className="text-lg mb-6" style={{ color: '#666' }}>
              At <strong>SimplePrefab</strong>, we strive to provide excellent service. This Cancellation & Refund Policy outlines the terms and conditions for cancellations and refunds of our expert consultation services.
            </p>

            <div className="bg-orange-50 border-l-4 p-4 my-6" style={{ borderColor: '#FB921D' }}>
              <p className="font-semibold" style={{ color: '#C55A00' }}>Important:</p>
              <p>All refunds are processed through Razorpay payment gateway to your original payment method. Refund timelines depend on your bank/payment provider.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              1. Expert Consultation Services
            </h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              1.1 Cancellation Policy
            </h3>
            
            <div className="bg-white border rounded-lg p-6 my-4" style={{ borderColor: '#FFD0A0' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '2px solid #FFD0A0' }}>
                    <th className="text-left py-3 px-2" style={{ color: '#1a1a1a' }}>Cancellation Time</th>
                    <th className="text-left py-3 px-2" style={{ color: '#1a1a1a' }}>Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #FFD0A0' }}>
                    <td className="py-3 px-2">More than 24 hours before appointment</td>
                    <td className="py-3 px-2 font-semibold" style={{ color: '#FB921D' }}>100% Full Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #FFD0A0' }}>
                    <td className="py-3 px-2">12-24 hours before appointment</td>
                    <td className="py-3 px-2 font-semibold" style={{ color: '#FB921D' }}>50% Refund</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #FFD0A0' }}>
                    <td className="py-3 px-2">Less than 12 hours before appointment</td>
                    <td className="py-3 px-2 font-semibold" style={{ color: '#C55A00' }}>No Refund</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">No-show (missed appointment)</td>
                    <td className="py-3 px-2 font-semibold" style={{ color: '#C55A00' }}>No Refund</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              1.2 Rescheduling Policy
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Rescheduling:</strong> Available if requested more than 24 hours before the scheduled appointment</li>
              <li><strong>One-Time Only:</strong> Each booking can be rescheduled once at no charge</li>
              <li><strong>Subject to Availability:</strong> Rescheduling depends on expert availability</li>
              <li><strong>No Rescheduling:</strong> If requested less than 12 hours before appointment</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              2. How to Cancel or Reschedule
            </h2>
            
            <p>To cancel or reschedule your appointment, please:</p>
            
            <div className="bg-orange-50 rounded-lg p-6 my-4" style={{ border: '1px solid #FFD0A0' }}>
              <h4 className="font-semibold mb-3" style={{ color: '#1a1a1a' }}>Contact us via:</h4>
              <ul className="space-y-2">
                <li><strong>Email:</strong> <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a></li>
              </ul>
              <p className="mt-4 text-sm" style={{ color: '#666' }}>
                <strong>Include in your request:</strong><br />
                • Booking ID (from confirmation email)<br />
                • Name and email used during booking<br />
                • Preferred new date/time (for rescheduling)
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              3. Refund Processing Timeline
            </h2>
            
            <p>Once your cancellation is approved, refunds will be processed according to the following timelines:</p>
            
            <div className="bg-white border rounded-lg p-6 my-4" style={{ borderColor: '#FFD0A0' }}>
              <h4 className="font-semibold mb-3" style={{ color: '#1a1a1a' }}>Refund Timelines by Payment Method:</h4>
              <ul className="space-y-3">
                <li className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid #FFD0A0' }}>
                  <span><strong>Credit/Debit Cards:</strong></span>
                  <span className="font-semibold" style={{ color: '#FB921D' }}>5-10 business days</span>
                </li>
                <li className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid #FFD0A0' }}>
                  <span><strong>UPI (PhonePe, Google Pay, etc.):</strong></span>
                  <span className="font-semibold" style={{ color: '#FB921D' }}>2-3 business days</span>
                </li>
                <li className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid #FFD0A0' }}>
                  <span><strong>Net Banking:</strong></span>
                  <span className="font-semibold" style={{ color: '#FB921D' }}>5-7 business days</span>
                </li>
                <li className="flex justify-between items-center">
                  <span><strong>Digital Wallets:</strong></span>
                  <span className="font-semibold" style={{ color: '#FB921D' }}>2-4 business days</span>
                </li>
              </ul>
            </div>

            <p className="text-sm mt-4" style={{ color: '#666' }}>
              <strong>Note:</strong> Refund processing time starts from the date of approval. Actual credit to your account depends on your bank/payment provider's processing time.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              4. Cancellation by SimplePrefab
            </h2>
            
            <p>In rare cases, SimplePrefab may need to cancel or reschedule your appointment due to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Expert unavailability (illness, emergency)</li>
              <li>Technical issues or system failures</li>
              <li>Force majeure events (natural disasters, pandemics, etc.)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              4.1 Our Commitment
            </h3>
            <p>If SimplePrefab cancels your appointment, you will receive:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>100% Full Refund</strong> processed within 2-3 business days, OR</li>
              <li><strong>Free Rescheduling</strong> to a mutually convenient time, OR</li>
              <li><strong>Credit for Future Services</strong> worth 120% of the consultation fee</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              5. Non-Refundable Scenarios
            </h2>
            
            <p>Refunds will <strong>NOT</strong> be issued in the following cases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>No-show (you did not attend the scheduled consultation)</li>
              <li>Late arrival (more than 15 minutes late)</li>
              <li>Cancellation less than 12 hours before appointment</li>
              <li>Consultation already completed</li>
              <li>Violation of our Terms & Conditions</li>
              <li>Abusive or inappropriate behavior during consultation</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              6. Partial Refunds
            </h2>
            
            <p>Partial refunds (50%) may be issued in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellation made 12-24 hours before scheduled appointment</li>
              <li>Technical issues on your end preventing full participation (assessed case-by-case)</li>
              <li>Consultation interrupted and could not be completed (assessed case-by-case)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              7. Refund Confirmation
            </h2>
            
            <p>Once your refund is processed, you will receive:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Email Confirmation:</strong> Refund approval and processing details</li>
              <li><strong>Razorpay Receipt:</strong> Transaction ID and refund amount</li>
              <li><strong>SMS Notification:</strong> Refund credit to your bank account (from your bank)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              8. Refund Method
            </h2>
            
            <p>All refunds are processed to your <strong>original payment method</strong>:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If you paid by credit card, refund will be credited to the same card</li>
              <li>If you paid by UPI, refund will be sent to the same UPI ID</li>
              <li>If you paid by net banking, refund will be credited to the source bank account</li>
            </ul>

            <div className="bg-orange-50 border-l-4 p-4 my-4" style={{ borderColor: '#FB921D' }}>
              <p className="font-semibold" style={{ color: '#C55A00' }}>Important:</p>
              <p>We cannot process refunds to a different account or payment method due to security and compliance reasons.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              9. Refund Disputes
            </h2>
            
            <p>If you have not received your refund within the specified timeline:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Check with your bank/payment provider for processing delays</li>
              <li>Verify the refund transaction ID in your confirmation email</li>
              <li>Contact us at <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a> with:
                <ul className="list-disc pl-6 mt-2">
                  <li>Booking ID</li>
                  <li>Payment transaction ID</li>
                  <li>Refund confirmation email</li>
                </ul>
              </li>
              <li>We will investigate and respond within 2 business days</li>
            </ol>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              10. Project-Based Services
            </h2>
            
            <p>For larger projects (prefab home construction, design services), specific cancellation and refund terms will be outlined in your project contract. These may differ from consultation service policies.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              10.1 General Guidelines for Projects
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Advance payments are non-refundable once work has commenced</li>
              <li>Cancellation before project start may incur 10-20% administrative fees</li>
              <li>Material orders placed are non-refundable</li>
              <li>Custom designs and 3D models are non-refundable once delivered</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              11. Chargeback Policy
            </h2>
            
            <p>If you initiate a chargeback or dispute a charge with your bank/credit card company:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Please contact us first to resolve the issue</li>
              <li>Unjustified chargebacks may result in service suspension</li>
              <li>We reserve the right to dispute invalid chargebacks</li>
              <li>Legal action may be taken for fraudulent chargebacks</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              12. Changes to This Policy
            </h2>
            
            <p>SimplePrefab reserves the right to modify this Cancellation & Refund Policy at any time. Changes will be effective upon posting to this page. Bookings made before policy changes will be governed by the policy in effect at the time of booking.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              13. Governing Law
            </h2>
            
            <p>This Cancellation & Refund Policy is governed by the Consumer Protection Act, 2019, and other applicable Indian laws. Disputes shall be subject to the jurisdiction of courts in Hyderabad, Telangana.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              14. Contact Us
            </h2>
            
            <p>For cancellations, refunds, or questions about this policy, please contact us:</p>
            
            <div className="bg-orange-50 rounded-lg p-6 mt-4" style={{ border: '1px solid #FFD0A0' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>SimplePrefab Customer Support</p>
              <p style={{ color: '#666' }}>
                <strong>Email:</strong> <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a><br />
                <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST<br />
                <strong>Address:</strong> 2 Kallang Avenue, #05-08, Ct Hub, Singapore, 339407
              </p>
            </div>

            <hr className="my-8" style={{ borderColor: '#FFD0A0' }} />
            
            <p className="text-sm" style={{ color: '#999' }}>
              By booking our services, you acknowledge that you have read, understood, and agree to this Cancellation & Refund Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
