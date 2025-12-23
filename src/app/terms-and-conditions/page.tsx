// app/terms-and-conditions/page.tsx
'use client'

import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
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
              Terms & Conditions
            </h1>
            <p className="text-sm" style={{ color: '#666' }}>
              <strong>Effective Date:</strong> December 20, 2025<br />
              <strong>Last Updated:</strong> December 20, 2025
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
              Welcome to <strong>SimplePrefab</strong>. By accessing our website and using our services, you agree to be bound by these Terms & Conditions. Please read them carefully before proceeding.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              1. Acceptance of Terms
            </h2>

            <p>By accessing or using SimplePrefab's website (simplyprefab.com) and services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please discontinue use immediately.</p>

            {/* NEW SECTION: Paid Consultancy Terms */}
            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              2. Paid Consultancy Services – Terms & Conditions
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.1 Consultancy Fees & Adjustments
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Expert consultation is charged at ₹6000 per session (60 minutes)</li>
              <li>Consultancy fees are <strong>non-refundable</strong> once the session is completed</li>
              <li>If the client proceeds with SimplyPrefab execution, the consultancy fee <strong>may be adjusted</strong> against the final project cost (as per ongoing offers or management approval)</li>
              <li>Fees cover time, expertise, and technical guidance, not guaranteed project outcomes</li>
              <li>Payment must be completed before the scheduled appointment</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.2 Accuracy & Limitations
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All recommendations are based on <strong>information shared by the client</strong></li>
              <li>Cost ranges and timelines are <strong>indicative</strong>, not final quotations</li>
              <li>Final pricing and scope may change after site visit, soil condition review, design finalization, and material selection</li>
              <li>SimplePrefab is not liable for decisions taken solely based on preliminary consultancy inputs</li>
            </ul>

            <div className="bg-orange-50 border-l-4 p-4 my-4" style={{ borderColor: '#FB921D' }}>
              <p className="font-semibold" style={{ color: '#C55A00' }}>Important Notice:</p>
              <p>Consultations are advisory in nature. All recommendations are based on the information you provide. Actual construction outcomes may vary based on site conditions, local regulations, and material availability.</p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.3 Client Responsibilities
            </h3>
            <p>The client must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Share accurate site details, location, and intended usage</li>
              <li>Clearly communicate budget expectations and constraints</li>
              <li>Understand prefab construction limitations and advantages</li>
              <li>Obtain required permissions from local authorities (with guidance if requested)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.4 Intellectual Property & Usage
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All ideas, explanations, and suggestions shared during consultancy remain the <strong>intellectual property of SimplyPrefab</strong></li>
              <li>Reproduction or execution of consultancy content with third-party contractors is discouraged without proper technical validation</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.5 No Execution Commitment
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Paid consultancy <strong>does not bind</strong> SimplyPrefab or the client to proceed with construction</li>
              <li>Execution timelines and availability are subject to internal scheduling and project confirmation</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.6 Communication Mode
            </h3>
            <p>Consultancy is delivered via:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Phone / Video call / Online meeting</li>
              <li>Duration and depth depend on the selected consultancy plan</li>
              <li>Follow-up clarifications may be limited unless otherwise agreed</li>
              <li>Consultations are available Monday to Friday, 9:00 AM - 6:00 PM IST</li>
              <li>You must book at least 24 hours in advance</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              2.7 Conduct During Consultation
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be punctual - consultations start at the scheduled time</li>
              <li>Maintain professional and respectful communication</li>
              <li>Recording of sessions is prohibited without prior written consent</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              3. Payment Terms
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              3.1 Accepted Payment Methods
            </h3>
            <p>We accept the following payment methods through Razorpay:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Credit/Debit Cards (Visa, Mastercard, RuPay)</li>
              <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
              <li>Net Banking</li>
              <li>Digital Wallets</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              3.2 Pricing
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are displayed in Indian Rupees (INR)</li>
              <li>Prices include applicable GST unless stated otherwise</li>
              <li>We reserve the right to modify pricing with 7 days' notice</li>
              <li>Promotional pricing is valid only during the specified period</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              3.3 Payment Security
            </h3>
            <p>Your payment information is processed through Razorpay's secure PCI-DSS compliant platform. SimplePrefab does not store your card details. For payment security details, refer to <a href="https://razorpay.com/terms/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#FB921D' }}>Razorpay's Terms</a>.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              4. User Obligations
            </h2>

            <p>You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, complete, and current information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not interfere with or disrupt our website or servers</li>
              <li>Not use automated systems (bots, scrapers) without permission</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              5. Intellectual Property
            </h2>

            <p>All content on SimplePrefab's website, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Text, graphics, logos, images, and videos</li>
              <li>3D models and architectural designs</li>
              <li>Software code and functionality</li>
              <li>Trademarks and brand names</li>
            </ul>
            <p className="mt-4">...are the exclusive property of SimplePrefab and protected by Indian and international copyright laws. Unauthorized use is prohibited.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              5.1 Limited License
            </h3>
            <p>We grant you a non-exclusive, non-transferable license to access and use our services for personal, non-commercial purposes only.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              6. Limitation of Liability
            </h2>

            <p>To the maximum extent permitted by Indian law:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SimplePrefab is not liable for any indirect, incidental, special, or consequential damages</li>
              <li>Our total liability for any claim shall not exceed the amount you paid for the specific service</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>Consultations are advisory in nature; implementation is at your own risk</li>
            </ul>

            <div className="bg-orange-50 border-l-4 p-4 my-4" style={{ borderColor: '#FB921D' }}>
              <p className="font-semibold" style={{ color: '#C55A00' }}>Important:</p>
              <p>SimplePrefab provides consultation and construction services based on industry best practices. However, actual construction outcomes may vary based on site conditions, local regulations, and third-party contractors.</p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              7. Disclaimer of Warranties
            </h2>

            <p>Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Warranties of merchantability or fitness for a particular purpose</li>
              <li>Accuracy or completeness of content</li>
              <li>Specific results or outcomes from consultations</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              8. Indemnification
            </h2>

            <p>You agree to indemnify and hold harmless SimplePrefab, its officers, employees, and partners from any claims, damages, or expenses arising from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your violation of these Terms & Conditions</li>
              <li>Your violation of any third-party rights</li>
              <li>Your use or misuse of our services</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              9. Third-Party Services
            </h2>

            <p>Our website may contain links to third-party websites or services (e.g., Razorpay, Google Maps). We are not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The content or practices of third-party websites</li>
              <li>Third-party service availability or performance</li>
              <li>Disputes between you and third-party service providers</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              10. Termination
            </h2>

            <p>We reserve the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suspend or terminate your access immediately for violations of these terms</li>
              <li>Refuse service to anyone at any time</li>
              <li>Remove or modify content at our discretion</li>
            </ul>
            <p className="mt-4">Upon termination, your right to use our services will cease immediately.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              11. Force Majeure
            </h2>

            <p>SimplePrefab shall not be liable for any delay or failure to perform due to circumstances beyond our reasonable control, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Natural disasters, pandemics, or acts of God</li>
              <li>Government actions or regulations</li>
              <li>Internet service disruptions</li>
              <li>Labor strikes or disputes</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              12. Governing Law and Jurisdiction
            </h2>

            <p>These Terms & Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              13. Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              13.1 Informal Resolution
            </h3>
            <p>Before filing a legal claim, you agree to first contact us at <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a> to attempt to resolve the dispute informally.</p>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              13.2 Arbitration
            </h3>
            <p>If informal resolution fails, disputes shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996, in Hyderabad, India.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              14. Changes to Terms
            </h2>

            <p>We reserve the right to modify these Terms & Conditions at any time. Changes will be effective upon posting to this page. Your continued use of our services after changes constitutes acceptance of the modified terms.</p>

            <p className="mt-4">We will notify users of material changes via:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email notification</li>
              <li>Prominent notice on our website</li>
              <li>Updated "Last Updated" date</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              15. Severability
            </h2>

            <p>If any provision of these Terms & Conditions is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              16. Entire Agreement
            </h2>

            <p>These Terms & Conditions, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and SimplePrefab regarding your use of our services.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              17. Contact Information
            </h2>

            <p>For questions about these Terms & Conditions, please contact us:</p>

            <div className="bg-orange-50 rounded-lg p-6 mt-4" style={{ border: '1px solid #FFD0A0' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>SimplePrefab</p>
              <p style={{ color: '#666' }}>
                <strong>Email:</strong> <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a><br />
                <strong>Phone:</strong> <a href="tel:+919000888844" className="underline" style={{ color: '#FB921D' }}>+91 90008 88844</a><br />
                <strong>Address:</strong> 2 Kallang Avenue, #05-08, Ct Hub, Singapore, 339407
              </p>
            </div>

            <hr className="my-8" style={{ borderColor: '#FFD0A0' }} />

            <p className="text-sm" style={{ color: '#999' }}>
              By using SimplePrefab's services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
