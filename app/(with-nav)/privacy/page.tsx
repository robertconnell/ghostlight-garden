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
            <p className="text-lg text-gray-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Section 1 */}
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

          {/* Section 2 */}
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

          {/* Section 3 */}
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

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Section 5 */}
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

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Additional Rights for California and International Customers</h2>
            <p className="text-gray-700 mb-4">
              If you are a resident of California, the European Economic Area (EEA), or other regions with privacy laws, you may have additional rights regarding your personal information. These may include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>The right to request access to or a copy of your personal data</li>
              <li>The right to request corrections or deletion of your personal data</li>
              <li>The right to request that we limit processing of your personal data</li>
              <li>The right to opt out of certain data sharing practices (such as the sale of personal data)</li>
              <li>The right to data portability</li>
            </ul>
            <p className="text-gray-700">
              To exercise these rights, please contact us at <strong>info@ghostlightgarden.com</strong>. We will respond to your request within the timeframes required by applicable law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information only for as long as necessary to provide our services, fulfill orders, comply with legal obligations, resolve disputes, and enforce agreements. Once your data is no longer needed for these purposes, we will securely delete or anonymize it.
            </p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Email Marketing and Communications</h2>
            <p className="text-gray-700 mb-4">
              If you sign up for our newsletter or agree to receive marketing emails, we may send you updates about new products, promotions, and other news. You can opt out of these communications at any time by clicking the "unsubscribe" link in any email or contacting us at <strong>info@ghostlightgarden.com</strong>. 
            </p>
            <p className="text-gray-700">
              Transactional emails related to your orders, account, or support inquiries are considered essential communications and cannot be opted out of.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services and Processors</h2>
            <p className="text-gray-700 mb-4">
              We share your personal information with trusted third-party service providers who help us operate our store, process payments, fulfill orders, and deliver a smooth customer experience. These partners are only given the information necessary to perform their services and are required to protect your information in accordance with applicable laws.
            </p>
            <p className="text-gray-700 mb-4">
              Examples of third parties we use include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Shopify</strong> – e-commerce platform hosting and order management</li>
              <li><strong>Payment processors</strong> (e.g., Stripe, PayPal, Shopify Payments) – secure payment transactions</li>
              <li><strong>Shipping carriers</strong> – delivery of your orders</li>
              <li><strong>Analytics tools</strong> (e.g., Google Analytics) – understanding website traffic and improving services</li>
              <li><strong>Email providers</strong> – order confirmations, newsletters, and customer communication</li>
            </ul>
            <p className="text-gray-700">
              We do not sell your personal information to any third parties.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your shopping experience, remember your preferences, keep your cart active, and analyze how visitors use our site. Cookies also help us understand traffic patterns so we can improve our products and services.
            </p>
            <p className="text-gray-700 mb-4">
              Examples of cookies we use include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li><strong>Essential cookies</strong> – required for site functionality, such as shopping cart and checkout</li>
              <li><strong>Analytics cookies</strong> – used by tools like Google Analytics to measure and improve performance</li>
              <li><strong>Marketing cookies</strong> – may be used to deliver relevant ads if we run marketing campaigns</li>
            </ul>
            <p className="text-gray-700">
              You can disable cookies in your browser settings, but some features of our site may not function properly if you do so.
            </p>
          </section>

          {/* Section 11 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Data Breach Notification</h2>
            <p className="text-gray-700 mb-4">
              In the event of a data breach that affects your personal information, we will take immediate steps to investigate and contain the issue. If required by law, we will notify all affected customers by email or other appropriate means within the timeframes mandated by applicable regulations, including North Carolina’s data breach notification requirements.
            </p>
            <p className="text-gray-700">
              We also commit to working with regulatory authorities and implementing additional safeguards to prevent future incidents.
            </p>
          </section>

          {/* Section 12 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our site may contain links to third-party websites or services. We are not 
              responsible for the privacy practices of these external sites. We encourage 
              you to review their privacy policies.
            </p>
          </section>

          {/* Section 13 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Children’s Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not directed to or intended for children under the age of 18. We do not knowingly collect or store personal information from children under 18. If we become aware that we have collected personal data from a child, we will take immediate steps to delete it. 
            </p>
            <p className="text-gray-700">
              If you believe we have collected information from a child under 18, please contact us at <a 
                href="mailto:info@ghostlightgarden.com" 
                className="text-purple-600 hover:text-purple-700 underline"
              >
                info@ghostlightgarden.com
              </a>, and we will address the issue promptly.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. We will notify you of 
              any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          {/* Section 15 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. North Carolina–Specific Information</h2>
            <p className="text-gray-700 mb-4">
              Ghostlight Garden operates in North Carolina. Where North Carolina law applies, we comply with state privacy and consumer protection requirements, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>
                <strong>Identity Theft Protection Act (N.C.G.S. § 75-61 et seq.)</strong> — safeguards for personal information and restrictions on Social Security numbers.
              </li>
              <li>
                <strong>Data Breach Notification (N.C.G.S. § 75-65)</strong> — timely notice to affected North Carolina residents and, when required, to the North Carolina Attorney General.
              </li>
              <li>
                <strong>Unfair and Deceptive Trade Practices Act (N.C.G.S. § 75-1.1)</strong> — truthful, fair, and transparent handling of consumer data.
              </li>
            </ul>
            <p className="text-gray-700">
              If a security incident involves North Carolina residents, we will provide the notices required by North Carolina law and any other applicable laws. For questions about your rights under North Carolina law, contact us at <strong>info@ghostlightgarden.com</strong>.
            </p>
          </section>


          {/* Section 16 */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Us</h2>
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
