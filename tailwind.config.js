/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Fraunces', 'Georgia', 'serif'],
        editorial: ['Fraunces', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        scrapbook: {
          cream: '#FAF7F2',
          paper: '#FDFBF7',
          card: '#FFFFFF',
          ruled: '#E4DFD7',
          grid: '#D1D5DB',
          ink: '#1E1E24',
          muted: '#64748B',
          pink: '#FBCFE8',
          rose: '#FDA4AF',
          coral: '#FDBA74',
          yellow: '#FEF08A',
          butter: '#FEF9C3',
          sage: '#BBF7D0',
          mint: '#A7F3D0',
          sky: '#BAE6FD',
          lavender: '#DDD6FE',
          washi: 'rgba(253, 224, 71, 0.45)',
          washipink: 'rgba(244, 114, 182, 0.35)',
          washiblue: 'rgba(96, 165, 250, 0.35)',
        }
      },
      boxShadow: {
        'scrapbook': '3px 4px 0px 0px #1E1E24',
        'scrapbook-lg': '5px 7px 0px 0px #1E1E24',
        'scrapbook-xl': '8px 10px 0px 0px #1E1E24',
        'scrapbook-soft': '0 8px 30px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08), 2px 3px 0px rgba(0,0,0,0.06)',
        'sticker': '0 2px 4px rgba(0,0,0,0.08), inset 0 -1px 2px rgba(0,0,0,0.1)',
        'pressed': 'inset 2px 2px 4px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        'scallop': '20px',
        'organic': '255px 15px 225px 15px/15px 225px 15px 255px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1.5deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(6px) rotate(-1.5deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        marquee: 'marquee 22s linear infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
