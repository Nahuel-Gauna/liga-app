/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! ADVERTENCIA !!
    // Esto ignora los errores de TypeScript en la construcción (build)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
