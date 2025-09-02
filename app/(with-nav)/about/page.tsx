

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Ghostlight Garden',
  description: 'Discover the story behind Ghostlight Garden. Learn about our mission, values, and commitment to creating beautiful digital experiences.',
  keywords: 'about us, Ghostlight Garden, digital experiences, creativity, mission, values',
  openGraph: {
    title: 'About Us | Ghostlight Garden',
    description: 'Discover the story behind Ghostlight Garden and our mission.',
    type: 'website',
    url: 'https://ghostlightgarden.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-full">
      {/* Background component to ensure consistency */}
      <div className="hidden md:block fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/pc_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="PC background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0 bg-gray-50">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/img/mobile_home_background.png)',
            willChange: 'transform',
            transform: 'translateZ(0)'
          }}
          role="img"
          aria-label="Mobile background: Artistic garden scene with soft shadows and blooming flowers"
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 py-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg embossed-text ghostlight-font mb-6">A peek inside the Garden</h1>
          <div className="w-72 h-1 bg-gradient-to-r from-[#FFF9F566] to-[#9A77CC] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 mb-16 mt-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Artist Profile Picture */}
          <div className="flex justify-center items-center order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-xl">
                <img
                  src="/img/artist_pofile_picture.jpg"
                  alt="Kailey - Artist behind Ghostlight Garden"
                  className="w-full max-w-sm rounded-xl shadow-lg object-cover aspect-square"
                />
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-white/80 rounded-2xl p-6 order-1 md:order-2">
            <h2 className="text-5xl font-alex-brush text-gray-900 mb-6">from my heart to yours</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I’m the artist and heart behind Ghostlight Garden. 
              </p>
              <p>
                I’ve always been enchanted by the space between soft and spooky, where pastel magic meets haunted whimsy. 
              </p>
              <p>
                Ghostlight Garden grew out of my love for creating little worlds filled with eerie sweetness — glowing spirits, gloomy fae, skeletal unicorns, and creatures stitched from both shadow and starlight.
              </p>
              <p>
                Every piece I make is like planting a seed in the Garden. Sometimes playful and cute, sometimes haunting and strange, always touched with a bit of glow. I work in mixed media, layering dreamy pastels with haunting textures to bring each Gloomie and ghostly scene to life.
              </p>
              <p>
                Each little Gloomie I create deserves so much love. I pour my heart into every piece — from the tiniest glowing detail to the softest shadow — so it feels like it has its own soul. Everything in the Garden is made with care, stitched together with a little bit of eerie sweetness and a lot of heart, just for you. 
              </p>
              <p>
                Ghostlight Garden is more than art to me. This is my cozy corner of spooky-dreamy magic, and I’m so happy you found your way here. Grab a lantern and wander with me — the Garden is always glowing. 
              </p>
              <p className="text-3xl text-right font-alex-brush">
                xo, Kailey 🩷
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
