// 🎛️ GLOBAL CONFIGURATION - Image protection controlled via .env
// Use NEXT_PUBLIC_ prefix for client-side access
export const IMAGE_PROTECTION_ENABLED = process.env.NEXT_PUBLIC_IMAGE_PROTECTION_ENABLED === 'true';



// You can also add other global configuration flags here
export const SITE_CONFIG = {
  imageProtection: IMAGE_PROTECTION_ENABLED,
  // Add other config options here as needed
  // example: enableAnalytics: false,
  // example: maintenanceMode: false,
};
