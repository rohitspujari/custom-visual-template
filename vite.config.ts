import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy'; // Im
import externalGlobals from 'rollup-plugin-external-globals';

export default defineConfig(({ mode }) => ({
  define:
    mode === 'production'
      ? { 'process.env.NODE_ENV': JSON.stringify('production') }
      : {},

  plugins: [
    react(),
    copy({
      targets: [
        { src: 'src/components/manifest.json', dest: 'dist' }, // Copy manifest.json to dist folder
      ],
      hook: 'writeBundle', // Hook to run the copy action after the bundle is written
    }),
    externalGlobals({
      react: 'React',
      'react-dom': 'ReactDOM',
    }),
  ],
  build: {
    cssCodeSplit: false, // Inline CSS into the JavaScript bundle
    lib: {
      entry: './src/components/index.ts', // Your entry point exporting all components
      name: 'MyCustomComponents',
      fileName: () => `index.js`,
      formats: ['es'], // Use ES modules for dynamic imports
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named', // Use named exports for easier access
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
}));
