import { withNx } from '@nx/next/plugins/with-nx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  nx: {
    svgr: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // other Next.js config options can go here
};

export default withNx(nextConfig);
