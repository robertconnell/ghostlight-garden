import Link from 'next/link';

export default function GlobalFooter() {
  return (
    <footer className="w-full py-8 px-4 text-center bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        {/* Policy Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <Link 
            href="/privacy" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link 
            href="/shipping-returns" 
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Shipping & Returns
          </Link>
        </div>
        
        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © 2025 Ghostlight Garden. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
