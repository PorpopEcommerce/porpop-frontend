import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        floating: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(-20px)', opacity: '0.8' },
        },
        pulseScale: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        swinging: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-15deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        zoomFade: {
          '0%': { transform: 'scale(1.2)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        spinInOut: {
          '0%': { transform: 'rotate(-360deg)', opacity: '0' },
          '50%': { transform: 'rotate(0deg)', opacity: '1' },
          '100%': { transform: 'rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        floating: 'floating 2s ease-in-out infinite',
        pulseScale: 'pulseScale 1.5s ease-in-out infinite',
        swinging: 'swinging 2s ease-in-out infinite',
        zoomFade: 'zoomFade 1.5s ease-in-out',
        spinInOut: 'spinInOut 2s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
