export default function sitemap(){
  const base = 'https://dlquick.co.uk';
  return [
    { url: base + '/', lastModified: new Date() },
    { url: base + '/services', lastModified: new Date() },
    { url: base + '/track', lastModified: new Date() },
    { url: base + '/partners', lastModified: new Date() },
    { url: base + '/legal/terms', lastModified: new Date() },
    { url: base + '/legal/privacy', lastModified: new Date() },
    { url: base + '/legal/cookies', lastModified: new Date() },
  ];
}
