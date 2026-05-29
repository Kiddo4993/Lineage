/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'streak-flame': 'streakFlame 1.2s ease-in-out infinite',
        'xp-pop': 'xpPop 0.6s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 hsl(145 65% 42% / 0.4), 0 6px 0 0 hsl(145 65% 32%)' },
          '50%': { boxShadow: '0 0 0 12px hsl(145 65% 42% / 0), 0 6px 0 0 hsl(145 65% 32%)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.7)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
        streakFlame: {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)' },
          '50%': { transform: 'scale(1.1) rotate(2deg)' },
        },
        xpPop: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '60%': { transform: 'translateY(-40px) scale(1.2)', opacity: '1' },
          '100%': { transform: 'translateY(-70px) scale(0.9)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'node-green': '0 6px 0 0 hsl(145 65% 32%)',
        'node-blue': '0 6px 0 0 hsl(210 80% 42%)',
        'node-purple': '0 6px 0 0 hsl(270 60% 45%)',
        'node-orange': '0 6px 0 0 hsl(32 95% 45%)',
        'node-gold': '0 6px 0 0 hsl(45 100% 40%)',
        'node-locked': '0 6px 0 0 hsl(210 15% 65%)',
        'card-soft': '0 2px 16px 0 hsl(210 20% 85% / 0.6)',
      },
    },
  },
  plugins: [],
}
