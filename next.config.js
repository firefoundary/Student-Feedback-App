/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/SearchStudent",
          permanent: false,
        },
      ];
    },
  };
  
  export default nextConfig;
  