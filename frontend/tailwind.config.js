/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        // Same type system as hi.tours
        display: ['"Bricolage Grotesque"', 'Inter', 'sans-serif'],
        title: ['"Instrument Sans"', 'Inter', 'sans-serif'],
        sans: ['Inter', '"Instrument Sans"', 'Arial', 'sans-serif']
      },
      boxShadow: {
        // shared card shadows (same values as --hi-shadow / --hi-shadow-hover in index.css)
        'hi-card': '0 1px 2px rgba(0, 33, 49, 0.04), 0 12px 32px rgba(0, 33, 49, 0.07)',
        'hi-card-hover': '0 2px 4px rgba(0, 33, 49, 0.05), 0 18px 44px rgba(0, 33, 49, 0.12)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        // Palette shared with hi.tours
        hi: {
          surface: '#FBF9F1', // page background
          cream: '#F6F4EB',
          sand: '#F0EEE6',
          apricot: '#FBEADB',
          peach: '#FADDD1',
          ink: '#002131', // the single text colour
          navy: '#174358',
          'navy-2': '#113141',
          sky: '#1F5673',
          line: '#D6DCE0',
          mist: '#C4CBD0',
          orange: '#FB7F26',
          'orange-deep': '#E75E26'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
