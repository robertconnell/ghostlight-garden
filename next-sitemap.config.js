module.exports = {
  siteUrl: "https://ghostlightgarden.com",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/maintenance'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/maintenance', '/api/*']
      }
    ]
  }
};
