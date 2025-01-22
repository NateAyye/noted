import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Noted | Note Taking App',
    short_name: 'Noted',
    description:
      'Noted is a note taking app that allows you to take notes and organize them in a clean and simple way.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [],
  };
}
