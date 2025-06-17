/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
      './src/app/**/*.{ts,tsx}',
      './src/components/**/*.{ts,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          muted: 'hsl(var(--muted))',
          'muted-foreground': 'hsl(var(--muted-foreground))',
          card: 'hsl(var(--card))',
          'card-foreground': 'hsl(var(--card-foreground))',
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
        },
      },
    },
    plugins: [],
  }