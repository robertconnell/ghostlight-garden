import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Ghostlight Garden's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on Ghostlight Garden's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Product Information and Pricing</h2>
            <p className="text-gray-700 mb-4">
              We strive to display accurate product information, including descriptions, images, and pricing. However, we do not warrant that product descriptions, colors, information, or other content available on the site are accurate, complete, reliable, current, or error-free.
            </p>
            <p className="text-gray-700 mb-4">
              All prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Orders and Payment</h2>
            <p className="text-gray-700 mb-4">
              By placing an order, you offer to purchase the product at the price listed. We reserve the right to accept or decline your order for any reason, including but not limited to product availability, errors in pricing or product information, or issues with your account.
            </p>
            <p className="text-gray-700 mb-4">
              Payment is processed securely through Shopify's payment gateway. All transactions are encrypted and secure.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Sales Tax:</strong> All applicable state and local sales taxes will be added to your order total. As we are located in North Carolina, orders shipped to North Carolina addresses will include the applicable state sales tax rate of 4.75% plus any applicable local taxes. Orders shipped to other states may be subject to different tax rates based on local regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-700 mb-4">
              Shipping times are estimates only. We are not responsible for delays beyond our control, including but not limited to weather, natural disasters, or carrier delays. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-700 mb-4">
              Please refer to our Shipping & Returns policy for detailed information about returns, exchanges, and refunds. All returns must comply with our return policy to be eligible for refund or exchange.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Ghostlight Garden or its content suppliers and is protected by copyright laws. Unauthorized use of any content may violate copyright, trademark, and other applicable laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. User Conduct</h2>
            <p className="text-gray-700 mb-4">
              You agree not to use the website to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit harmful, offensive, or inappropriate content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              In no event shall Ghostlight Garden, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to defend, indemnify, and hold harmless Ghostlight Garden and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the website or violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms shall be governed by and construed in accordance with the laws of the State of North Carolina, United States, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of our services will be subject to the exclusive jurisdiction of the courts of North Carolina.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after changes are posted constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. North Carolina Legal Compliance</h2>
            <p className="text-gray-700 mb-4">
              As a business operating in North Carolina, we comply with all applicable state and local laws, including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>North Carolina Consumer Protection Act</li>
              <li>North Carolina Sales and Use Tax laws</li>
              <li>North Carolina Business Corporation Act</li>
              <li>All applicable local business licensing requirements</li>
            </ul>
            <p className="text-gray-700 mb-4">
              For questions about our compliance with North Carolina laws, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> info@ghostlightgarden.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> [Your Business Address]
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> [Your Business Phone]
              </p>
            </div>
          </section>

          <div className="border-t border-gray-200 pt-8 mt-12">
            <Link 
              href="/shop" 
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Shop
            </Link>
          </div>
        </div>
      </div>

      <GlobalFooter />
    </div>
  );
}
