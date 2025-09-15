import { Metadata } from 'next';
import BackButton from '@/components/BackButton';

export const metadata: Metadata = {
  title: 'Shipping & Returns | Ghostlight Garden',
  description:
    "Learn about Ghostlight Garden's shipping options, processing times, returns/exchanges, and sales tax information. Free shipping on orders over $75.",
  keywords:
    'shipping policy, returns policy, North Carolina sales tax, free shipping, Ghostlight Garden',
  openGraph: {
    title: 'Shipping & Returns | Ghostlight Garden',
    description:
      'Learn about our shipping policies, return procedures, and sales tax information.',
    type: 'website',
    url: 'https://ghostlightgarden.com/shipping-returns',
  },
};

export default function ShippingReturns() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6">
            <BackButton />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping &amp; Returns</h1>
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
          {/* Shipping Overview */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Processing Time</h3>
              <p className="text-blue-800">
                Orders are typically processed within 1–2 business days after payment confirmation.
                During peak periods or sales, processing may take 3–5 business days.
              </p>
            </div>

            <div className="grid tablet:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Shipping</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 5–7 business days</li>
                  <li>• $5.00 flat rate</li>
                  <li>• Free on orders over $75</li>
                  <li>• Tracking included</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Express Shipping</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 2–3 business days</li>
                  <li>• $20.00 flat rate</li>
                  <li>• Available for all orders</li>
                  <li>• Priority handling</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notes</h3>
              <ul className="text-yellow-800 space-y-1">
                <li>• Shipping times are estimates and may vary due to carrier delays.</li>
                <li>• We currently do not ship to PO Boxes.</li>
                <li>• International shipping is available to select countries.</li>
                <li>• Signature is required for orders over $200.</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Carriers</h3>
            <p className="text-gray-700 mb-4">
              We partner with USPS, UPS, and FedEx to deliver your order safely and on time. You’ll
              receive tracking information via email as soon as your order ships.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Address Accuracy &amp; Changes</h3>
            <p className="text-gray-700 mb-4">
              Please ensure your shipping address is correct at checkout. We’re able to update an
              address only before an order ships. Once a package is in transit, we can’t reroute it.
              Orders returned due to an incorrect or undeliverable address may incur reshipment fees.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Risk of Loss &amp; Delivery Issues</h3>
            <p className="text-gray-700 mb-4">
              Risk of loss passes to you when the order is transferred to the carrier. If tracking
              shows “delivered” but you didn’t receive the package (e.g., misdelivery or suspected
              theft), please check with your household, neighbors, and local carrier office. We’ll
              assist where possible, but we’re not responsible for packages after carrier delivery
              confirmation. Consider a secure delivery location for high-value orders.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">International Orders</h3>
            <p className="text-gray-700 mb-4">
              International customers are responsible for all import duties, taxes, and fees imposed
              by the destination country. These charges are not included in item or shipping prices
              and are non-refundable. Transit times may vary due to customs processing.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Sales Tax</h3>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 mb-6">
              <h4 className="text-lg font-semibold text-purple-900 mb-2">North Carolina Sales Tax</h4>
              <p className="text-purple-800 mb-3">
                As a North Carolina business (Kailey Swindal, dba Ghostlight Garden), we collect
                sales tax on orders shipped to North Carolina addresses.
              </p>
              <ul className="text-purple-800 space-y-1">
                <li>• State sales tax: 4.75%</li>
                <li>• Local taxes may apply based on destination</li>
                <li>• Tax is calculated and shown at checkout</li>
                <li>• Orders shipped outside NC may have different tax rules</li>
              </ul>
            </div>
          </section>

          {/* Returns & Exchanges */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Returns &amp; Exchanges</h2>

            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">30-Day Return Window</h3>
              <p className="text-green-800">
                If you’re not completely satisfied, you may request a return within 30 days of
                delivery for a refund or exchange, subject to the conditions below.
              </p>
            </div>

            <div className="grid tablet:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Requirements</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Item must be unused and in original condition</li>
                  <li>• Include all original packaging and inserts</li>
                  <li>• Return authorization (RMA) required</li>
                  <li>• Ship the return within 30 days of delivery</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Non-Returnable Items</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Custom, personalized, or commissioned pieces</li>
                  <li>• Limited-edition items marked final sale</li>
                  <li>• Sale or clearance items</li>
                  <li>• Digital downloads</li>
                  <li>• Items used, damaged, or altered after delivery</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Start a Return</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    1
                  </span>
                  <span>
                    Email{' '}
                    <a
                      href="mailto:info@ghostlightgarden.com"
                      className="text-purple-600 hover:text-purple-700 underline"
                    >
                      info@ghostlightgarden.com
                    </a>{' '}
                    with your order number to request a Return Merchandise Authorization (RMA).
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    2
                  </span>
                  <span>Pack the item securely using the original packaging when possible.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    3
                  </span>
                  <span>Include your RMA details inside the package.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    4
                  </span>
                  <span>Ship to the address provided with your RMA.</span>
                </li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Return Shipping Costs</h3>
            <p className="text-gray-700 mb-4">
              Return shipping is the customer’s responsibility unless the item was received damaged
              or incorrect. Original shipping charges are non-refundable unless we made an error.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refunds</h3>
            <p className="text-gray-700 mb-4">
              After your return is delivered to us, please allow 3–5 business days for inspection.
              Approved refunds are issued to the original payment method within 5–7 business days
              thereafter. Your bank or card issuer may take additional time to post the credit.
            </p>
          </section>

          {/* Exchanges */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Exchanges</h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Exchanges</h3>
              <p className="text-blue-800">
                Need a different size, format, or piece? We’re happy to help. Exchanges follow the
                same 30-day window and item condition requirements as returns.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Exchange Process</h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>• Contact us to request an exchange RMA.</li>
              <li>• Return the original item per the instructions above.</li>
              <li>• Select your replacement item.</li>
              <li>• Pay any price difference (or receive store credit if applicable).</li>
              <li>• The new item ships once the return is received and approved.</li>
            </ul>
          </section>

          {/* Damaged or Incorrect Items */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Damaged or Incorrect Items</h2>

            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Report Within 48 Hours</h3>
              <p className="text-red-800">
                If your order arrives damaged or incorrect, please contact us within 48 hours of
                delivery. We’ll arrange a replacement or refund at no additional cost to you.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Need</h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>• Photos of the item, interior packaging, and shipping box</li>
              <li>• Your order number and a brief description of the issue</li>
              <li>• Keep all packaging until your claim is resolved</li>
            </ul>
          </section>

          {/* Need Help */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Need Help?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We’re here for questions about shipping, returns, or exchanges. Contact us at{' '}
                <a
                  href="mailto:info@ghostlightgarden.com"
                  className="text-purple-600 hover:text-purple-700 underline"
                >
                  info@ghostlightgarden.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
