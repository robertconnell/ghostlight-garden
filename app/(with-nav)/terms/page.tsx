import { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Terms of Service | Ghostlight Garden',
  description:
    "Read Ghostlight Garden's Terms of Service. Learn about ordering, shipping, returns, user conduct, IP, and dispute resolution for our North Carolina–based shop.",
  keywords:
    'terms of service, user agreement, Ghostlight Garden, ordering, shipping, returns, intellectual property, North Carolina',
  openGraph: {
    title: 'Terms of Service | Ghostlight Garden',
    description:
      "Read Ghostlight Garden's terms for ordering, shipping, returns, and more.",
    type: 'website',
    url: 'https://ghostlightgarden.com/terms',
  },
};

export default function TermsOfService() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-gray-600">
              Last updated:{' '}
              {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* 1. Acceptance */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              These Terms of Service ("Terms") govern your access to and use of the website, products, and services offered by
              Ghostlight Garden ("Ghostlight Garden," "we," "us," or "our"). By using our site or placing an order, you agree to these Terms. If you do not agree, do not use
              the site.
            </p>
          </section>

          {/* 2. Eligibility & Accounts */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility and Accounts</h2>
            <p className="text-gray-700 mb-4">
              You must be at least 18 years old (or the age of majority in your jurisdiction) to use our services. If you create
              an account, you agree to provide accurate information and to keep your credentials confidential. You are responsible
              for all activity under your account and must notify us promptly of any unauthorized use.
            </p>
          </section>

          {/* 3. Store Content & IP */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              All content on the site—including artwork, designs, product photos, text, logos, and software—is owned by
              Ghostlight Garden or our licensors and protected by intellectual property laws. You may not copy, modify, distribute,
              display, sell, or create derivative works from our content without our prior written permission.
            </p>
          </section>

          {/* 4. Product Info, Availability & Pricing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Product Information, Availability, and Pricing</h2>
            <p className="text-gray-700 mb-4">
              We strive for accuracy, but errors (including in descriptions, pricing, availability, and images) may occur.
              Colors and finishes can vary due to device displays and the handmade nature of certain items. We reserve the right
              to correct any errors, change information, or update product details at any time without prior notice.
            </p>
            <p className="text-gray-700">
              We may limit quantities, discontinue products, or refuse/cancel orders (e.g., suspected fraud or mispricing). If we
              modify or cancel an order, we will attempt to contact you using the email and/or billing address provided at the
              time the order was made.
            </p>
          </section>

          {/* 5. Orders, Payment, Taxes & Fraud Checks */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Orders, Payment, and Taxes</h2>
            <p className="text-gray-700 mb-4">
              By placing an order, you authorize us (via our payment processor) to charge your selected payment method for the
              total amount (including applicable taxes, shipping, and fees). Payments are processed securely through Shopify
              and/or its integrated payment providers.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Sales Tax:</strong> We collect applicable sales/use taxes where required by law based on your shipping
              destination and our tax nexus. The final tax amount will be shown at checkout.
            </p>
            <p className="text-gray-700">
              We use routine fraud screening. We may decline or cancel orders that fail verification or appear suspicious. Any
              chargeback or payment dispute you initiate must be made in good faith; you agree to first contact us to attempt to
              resolve the issue.
            </p>
          </section>

          {/* 6. Shipping, Delivery, Risk of Loss & International Duties */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Shipping, Delivery, and Risk of Loss</h2>
            <p className="text-gray-700 mb-4">
              Shipping dates are estimates and not guarantees. Once an order is handed to the carrier, risk of loss passes to you.
              Delays caused by carriers, weather, customs, or events beyond our control do not constitute breach.
            </p>
            <p className="text-gray-700">
              International customers are responsible for all import duties, taxes, and fees imposed by destination countries.
            </p>
          </section>

          {/* 7. Returns, Exchanges & Cancellations */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Returns, Exchanges, and Cancellations</h2>
            <p className="text-gray-700 mb-4">
              Please review our <a href="/shipping-returns" className="text-purple-600 hover:text-purple-700 underline">Shipping &amp; Returns</a> policy for eligibility, timelines, and instructions. Any
              approved refunds will be issued to the original payment method (less shipping and applicable fees, unless otherwise
              stated). Items must be returned in original condition and packaging unless otherwise specified.
            </p>
            <p className="text-gray-700">
              Custom, commissioned, or made-to-order items may be final sale unless our policy states otherwise.
            </p>
          </section>

          {/* 8. Promotions, Gift Cards, Store Credit */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Promotions, Gift Cards, and Store Credit</h2>
            <p className="text-gray-700 mb-4">
              Promotions are subject to terms stated at the time of offer and cannot be applied retroactively or combined unless
              expressly permitted. Gift cards and store credits (where offered) are not reloadable, non-refundable, not redeemable
              for cash (except as required by law), and may be subject to balance and expiration rules per applicable law.
            </p>
          </section>

          {/* 9. User Content (Reviews) */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. User Content and Reviews</h2>
            <p className="text-gray-700 mb-4">
              If you post reviews, photos, comments, or other content (“User Content”), you grant Ghostlight Garden a worldwide,
              royalty-free, non-exclusive license to use, reproduce, publish, and display such content in connection with our store
              and marketing, in any media now known or developed later. You represent that you own or control all rights in your
              User Content and that it does not infringe the rights of any third party or violate any law.
            </p>
            <p className="text-gray-700">
              We may monitor, edit, or remove User Content at our discretion, including for abuse, spam, obscenity, infringement,
              or violations of these Terms.
            </p>
          </section>

          {/* 10. Prohibited Activities */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Prohibited Activities</h2>
            <p className="text-gray-700 mb-4">
              You agree not to: (a) violate laws or third-party rights; (b) upload malicious code; (c) interfere with or disrupt
              the site; (d) bypass security or access non-public areas; (e) scrape or harvest data without permission; (f) misrepresent
              your identity; or (g) use the site for unauthorized commercial purposes, including reselling without our consent.
            </p>
          </section>

          {/* 11. Third-Party Services & Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Services and Links</h2>
            <p className="text-gray-700 mb-4">
              We use third-party providers (e.g., Shopify, payment processors, carriers). Your use of those services may be subject
              to their terms and privacy policies. Links to external sites are provided for convenience; we are not responsible for
              their content or practices.
            </p>
          </section>

          {/* 12. Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Disclaimers</h2>
            <p className="text-gray-700">
              EXCEPT AS EXPRESSLY PROVIDED OTHERWISE, THE SITE, CONTENT, AND PRODUCTS ARE PROVIDED “AS IS” AND “AS AVAILABLE”
              WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS ON IMPLIED
              WARRANTIES, SO THESE LIMITATIONS MAY NOT APPLY TO YOU.
            </p>
          </section>

          {/* 13. Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Limitation of Liability</h2>
            <p className="text-gray-700">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, GHOSTLIGHT GARDEN AND ITS OWNERS, EMPLOYEES, AGENTS, AND SUPPLIERS SHALL NOT
              BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS,
              REVENUE, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SITE OR PRODUCTS, EVEN IF ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE PRODUCT(S)
              GIVING RISE TO THE CLAIM.
            </p>
          </section>

          {/* 14. Indemnification */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Indemnification</h2>
            <p className="text-gray-700">
              You agree to defend, indemnify, and hold harmless Ghostlight Garden and our owners, employees, and agents from and
              against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of
              or in any way connected with your breach of these Terms or your misuse of the site or products.
            </p>
          </section>

          {/* 15. Governing Law & Venue (NC) */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Governing Law and Venue</h2>
            <p className="text-gray-700">
              These Terms and any disputes arising out of or relating to them are governed by the laws of the State of North
              Carolina, without regard to conflict-of-law principles. You consent to the exclusive jurisdiction and venue of the
              state and federal courts located in North Carolina for the resolution of any action or proceeding arising out of or
              related to these Terms or your use of the site or products.
            </p>
          </section>

          {/* 16. Changes to Terms & Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Changes to Terms and Services</h2>
            <p className="text-gray-700">
              We may update these Terms or modify/ discontinue parts of the services at any time. Changes take effect upon posting
              on this page unless a later date is specified. Your continued use after changes become effective constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          {/* 17. Force Majeure */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Force Majeure</h2>
            <p className="text-gray-700">
              We will not be liable for any delay or failure to perform due to events beyond our reasonable control, including
              acts of God, natural disasters, labor disputes, supply shortages, war, terrorism, civil disturbances, carrier or
              utility failures, or government actions.
            </p>
          </section>

          {/* 18. Severability; No Waiver; Assignment */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Severability, No Waiver, and Assignment</h2>
            <p className="text-gray-700 mb-4">
              If any provision of these Terms is found unenforceable, the remaining provisions will remain in full force and
              effect. Our failure to enforce any right or provision is not a waiver. You may not assign your rights or obligations
              under these Terms without our prior written consent; we may assign these Terms in connection with a merger, sale, or
              other business transfer.
            </p>
          </section>

          {/* 19. Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">19. Contact</h2>
            <p className="text-gray-700">
              For questions about these Terms, contact us at{' '}
              <a href="mailto:info@ghostlightgarden.com" className="text-purple-600 hover:text-purple-700 underline">
                info@ghostlightgarden.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
