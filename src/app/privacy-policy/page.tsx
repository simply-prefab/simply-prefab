// app/privacy-policy/page.tsx
'use client'

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
              At <strong>SimplePrefab</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              1. Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              1.1 Personal Information
            </h3>
            <p>We collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fill out consultation forms</li>
              <li>Book expert consultations</li>
              <li>Create an account</li>
              <li>Request information or quotes</li>
              <li>Subscribe to our newsletter</li>
              <li>Make payments through our platform</li>
            </ul>

            <p className="mt-4">This information may include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Location/Address</li>
              <li>Project Type and Details</li>
              <li>Payment Information (processed securely through Razorpay)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              1.2 Automatically Collected Information
            </h3>
            <p>When you visit our website, we automatically collect certain information about your device, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP Address</li>
              <li>Browser Type and Version</li>
              <li>Operating System</li>
              <li>Pages Visited and Time Spent</li>
              <li>Referring Website</li>
              <li>Cookies and Similar Technologies</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              2. How We Use Your Information
            </h2>
            
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Delivery:</strong> To provide consultation services, process bookings, and deliver prefab construction solutions</li>
              <li><strong>Communication:</strong> To send booking confirmations, appointment reminders, project updates, and respond to inquiries</li>
              <li><strong>Payment Processing:</strong> To process payments securely through Razorpay payment gateway</li>
              <li><strong>Account Management:</strong> To create and manage your account</li>
              <li><strong>Improvement:</strong> To analyze usage patterns and improve our website and services</li>
              <li><strong>Marketing:</strong> To send promotional emails and updates (with your consent)</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              3. Payment Information
            </h2>
            
            <p>All payment transactions are processed securely through <strong>Razorpay</strong>, our payment gateway partner. SimplePrefab does not store your complete credit/debit card information or CVV on our servers.</p>
            
            <div className="bg-orange-50 border-l-4 p-4 my-4" style={{ borderColor: '#FB921D' }}>
              <p className="font-semibold" style={{ color: '#C55A00' }}>Payment Security:</p>
              <p>Razorpay is PCI-DSS compliant and uses 256-bit SSL encryption to protect your payment data. Your purchase transaction data is encrypted and only used to complete your transaction. For more information, visit: <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#FB921D' }}>Razorpay Privacy Policy</a></p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              4. Information Sharing and Disclosure
            </h2>
            
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              4.1 Service Providers
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Razorpay:</strong> For payment processing</li>
              <li><strong>Email Service Providers:</strong> For sending booking confirmations and notifications</li>
              <li><strong>Cloud Hosting:</strong> Vercel, Firebase for website hosting and data storage</li>
              <li><strong>Analytics:</strong> Google Analytics for website usage analysis</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3" style={{ color: '#FB921D' }}>
              4.2 Legal Requirements
            </h3>
            <p>We may disclose your information if required by law, court order, or government authorities, or to protect our rights and prevent fraud.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              5. Data Retention
            </h2>
            
            <p>We retain your personal information for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations (minimum 5 years for financial records)</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="mt-4">After this period, we will securely delete or anonymize your data.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              6. Your Rights
            </h2>
            
            <p>Under Indian data protection laws, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
            </ul>

            <p className="mt-4">To exercise these rights, contact us at: <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a></p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              7. Cookies
            </h2>
            
            <p>We use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings. Disabling cookies may affect website functionality.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              8. Security
            </h2>
            
            <p>We implement industry-standard security measures to protect your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure cloud storage with Firebase</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
            </ul>
            
            <p className="mt-4">However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              9. Third-Party Links
            </h2>
            
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any personal information.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              10. Children's Privacy
            </h2>
            
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.</p>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              11. Changes to This Policy
            </h2>
            
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Posting the updated policy on this page</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification (for material changes)</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              12. Governing Law
            </h2>
            
            <p>This Privacy Policy is governed by the laws of India, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information Technology Act, 2000</li>
              <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
              <li>Digital Personal Data Protection Act, 2023</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4" style={{ color: '#1a1a1a' }}>
              13. Contact Us
            </h2>
            
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            
            <div className="bg-orange-50 rounded-lg p-6 mt-4" style={{ border: '1px solid #FFD0A0' }}>
              <p className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>SimplePrefab</p>
              <p style={{ color: '#666' }}>
                <strong>Email:</strong> <a href="mailto:enquiry@simplyprefab.com" className="underline" style={{ color: '#FB921D' }}>enquiry@simplyprefab.com</a><br />
                <strong>Address:</strong> 2 Kallang Avenue, #05-08, Ct Hub, Singapore, 339407
              </p>
            </div>

            <hr className="my-8" style={{ borderColor: '#FFD0A0' }} />
            
            <p className="text-sm" style={{ color: '#999' }}>
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
