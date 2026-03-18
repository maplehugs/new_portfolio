import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',  // Esto es CRÍTICO para GitHub Pages
  images: {
    unoptimized: true, // GitHub Pages no soporta optimización de imágenes
  },
  // NO basePath ni assetPrefix cuando usas custom domain
};

export default nextConfig;