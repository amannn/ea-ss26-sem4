import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{hostname: 'i.pravatar.cc'}, {hostname: 'c.pxhere.com'}]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
};

export default nextConfig;
