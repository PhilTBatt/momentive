import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Momentive',
    short_name: 'Momentive',
    description: 'A community-driven events platform where staff can share events for members of the community to ding up to.',
    start_url: '/',
    display: 'standalone',
    background_color: 'orange',
    theme_color: 'orange',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png","sizes":"512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}