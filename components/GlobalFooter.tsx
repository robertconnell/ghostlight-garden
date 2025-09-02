import Link from 'next/link';

export default function GlobalFooter() {
  return (
    <footer className="w-full py-8 px-4 bg-gray-50 border-t border-gray-200 sticky-footer relative z-30">
      <div className="w-full">
        {/* Mobile Layout - Stacked Vertically */}
        <div className="md:hidden text-center space-y-4">
          {/* Social Media Icons */}
          <div className="flex justify-center">
            <a 
              href="https://tiktok.com/@ghostlight.garden.xo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="Follow us on TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.83-.31-4.08-1.03-2.26-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-6">
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

        {/* Desktop Layout - Three-Column with Left/Center/Right Alignment */}
        <div className="hidden md:flex relative items-center">
          {/* Left: Social Media Icons */}
          <div className="flex">
            <a 
              href="https://tiktok.com/@ghostlight.garden.xo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="Follow us on TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.05-2.83-.31-4.08-1.03-2.26-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>

          {/* Center: Policy Links - Absolutely positioned for true centering */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
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

          {/* Right: Copyright */}
          <div className="ml-auto">
            <p className="text-sm text-gray-600">
              © 2025 Ghostlight Garden. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
