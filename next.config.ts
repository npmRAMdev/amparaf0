import type { NextConfig } from "next"

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL_SETTINGS2?.replace(/^https?:\/\//, '') ?? ''
const imageKitHost = 'ik.imagekit.io'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
 {
        protocol: 'https',
        hostname: 'ixfvkkvdkpxytocewtgy.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qnfgobxsxtfliqkevtqk.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: imageKitHost,
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'neliosoftware.com',
        pathname: '/**',
      },
    ],

  },
}

export default nextConfig
