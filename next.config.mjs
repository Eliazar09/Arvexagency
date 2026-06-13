/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Impede clickjacking (site embutido em iframe malicioso)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Impede MIME sniffing (browser interpretar arquivo diferente do tipo declarado)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Controla informações enviadas no header Referer
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Bloqueia acesso desnecessário a câmera, microfone e geolocalização
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
