import { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ghostlight Garden',
  description: 'Learn about how Ghostlight Garden collects, uses, and protects your personal information. Our privacy policy ensures transparency and compliance with North Carolina privacy laws.',
  keywords: 'privacy policy, data protection, North Carolina privacy laws, Ghostlight Garden, personal information',
  openGraph: {
    title: 'Privacy Policy | Ghostlight Garden',
    description: 'Learn about how Ghostlight Garden collects, uses, and protects your personal information.',
    type: 'website',
    url: 'https://ghostlightgarden.com/privacy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back Button */}
          <div className="mb-6">
            <BackButton />
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us for support. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Name, email address, and shipping address</li>
              <li>Payment information (processed securely through Shopify)</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our services and develop new features</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except as described in this policy:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Service providers who assist in our operations (e.g., Shopify, shipping partners)</li>
              <li>Legal requirements or to protect our rights and safety</li>
              <li>Business transfers (in the event of a merger or acquisition)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request information about how your data is used</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your browsing experience, 
              analyze site traffic, and understand where our visitors come from. You can 
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our site may contain links to third-party websites or services. We are not 
              responsible for the privacy practices of these external sites. We encourage 
              you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for children under 13. We do not knowingly 
              collect personal information from children under 13. If you believe we have 
              collected such information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. North Carolina Privacy Compliance</h2>
            <p className="text-gray-700 mb-4">
              As a sole proprietorship operating in North Carolina under the name Kailey Swindal (dba Ghostlight Garden), we comply with all applicable state privacy laws and regulations, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>North Carolina Identity Theft Protection Act</li>
              <li>North Carolina Consumer Protection Act</li>
              <li>Federal privacy laws including COPPA and CAN-SPAM</li>
              <li>All applicable data breach notification requirements</li>
            </ul>
            <p className="text-gray-700 mb-4">
              In the event of a data breach affecting North Carolina residents, we will comply with all notification requirements under North Carolina law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us at{' '}
                <a 
                  href="mailto:info@ghostlightgarden.com" 
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  info@ghostlightgarden.com
                </a>.
              </p>
          </section>

          
        </div>
      </div>
    </div>
  );
}
