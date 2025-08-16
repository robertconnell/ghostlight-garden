import Link from 'next/link';
import GlobalFooter from '@/components/GlobalFooter';

export default function ShippingReturns() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Returns</h1>
          <p className="text-lg text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Shipping Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Processing Time</h3>
              <p className="text-blue-800">
                Orders are typically processed within 1-2 business days after payment confirmation. 
                During peak seasons or sales, processing may take 3-5 business days.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Standard Shipping</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 5-7 business days</li>
                  <li>• $8.99 flat rate</li>
                  <li>• Free on orders over $75</li>
                  <li>• Tracking included</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Express Shipping</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• 2-3 business days</li>
                  <li>• $15.99 flat rate</li>
                  <li>• Available for all orders</li>
                  <li>• Priority handling</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notes</h3>
              <ul className="text-yellow-800 space-y-1">
                <li>• Shipping times are estimates and may vary due to carrier delays</li>
                <li>• We do not ship to PO Boxes</li>
                <li>• International shipping available to select countries</li>
                <li>• Signature required for orders over $200</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Shipping Carriers</h3>
            <p className="text-gray-700 mb-4">
              We partner with reliable shipping carriers including USPS, UPS, and FedEx to ensure 
              your artwork arrives safely and on time. Tracking information will be sent to your 
              email once your order ships.
            </p>
          </section>

          {/* Returns Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Returns & Exchanges</h2>
            
            <div className="bg-green-50 border-l-4 border-green-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">30-Day Return Policy</h3>
              <p className="text-green-800">
                We want you to love your artwork! If you're not completely satisfied, you may return 
                your purchase within 30 days of delivery for a full refund or exchange.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Return Requirements</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Item must be in original condition</li>
                  <li>• Original packaging included</li>
                  <li>• Return authorization required</li>
                  <li>• Return within 30 days</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Non-Returnable Items</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Custom or personalized orders</li>
                  <li>• Sale or clearance items</li>
                  <li>• Damaged or altered items</li>
                  <li>• Digital downloads</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Return</h3>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <ol className="text-gray-700 space-y-3">
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                  <span>Contact our customer service team to request a return authorization</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                  <span>Package your item securely in the original packaging</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                  <span>Include the return authorization form with your package</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</span>
                  <span>Ship to the address provided in your return authorization</span>
                </li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Refund Process</h3>
            <p className="text-gray-700 mb-4">
              Once we receive your return, we'll inspect the item and process your refund within 5-7 business days. 
              Refunds will be issued to the original payment method. Return shipping costs are the responsibility 
              of the customer unless the item was received damaged or incorrect.
            </p>
          </section>

          {/* Exchanges Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Exchanges</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Exchange Policy</h3>
              <p className="text-blue-800">
                Need a different size, color, or style? We're happy to help you find the perfect piece! 
                Exchanges are subject to the same 30-day policy and return requirements.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Exchange Process</h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>• Contact customer service to request an exchange</li>
              <li>• Return the original item following return procedures</li>
              <li>• Choose your replacement item</li>
              <li>• Pay any price difference (or receive credit if applicable)</li>
              <li>• New item ships once return is received and processed</li>
            </ul>
          </section>

          {/* Damaged Items Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Damaged or Incorrect Items</h2>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Immediate Action Required</h3>
              <p className="text-red-800">
                If you receive a damaged or incorrect item, please contact us within 48 hours of delivery. 
                We'll arrange for a replacement or refund at no additional cost to you.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">What to Do</h3>
            <ul className="text-gray-700 space-y-2 mb-4">
              <li>• Take photos of the damage or incorrect item</li>
              <li>• Contact customer service immediately</li>
              <li>• Do not attempt to repair or use damaged items</li>
              <li>• Keep all packaging and documentation</li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Need Help?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our customer service team is here to help with any questions about shipping, returns, 
                or exchanges. Contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> support@ghostlightgarden.com
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Phone:</strong> [Your Business Phone]
                  </p>
                </div>
                <div>
                  <p className="text-gray-700 mb-2">
                    <strong>Hours:</strong> Monday-Friday, 9AM-5PM EST
                  </p>
                  <p className="text-gray-700">
                    <strong>Response Time:</strong> Within 24 hours
                  </p>
                </div>
              </div>
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
