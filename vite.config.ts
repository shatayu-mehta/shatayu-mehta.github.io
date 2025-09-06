import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for large third-party libraries
          vendor: ['react', 'react-dom'],
          // Split Three.js into smaller chunks
          'three-core': ['three'],
          'three-fiber': ['@react-three/fiber'],
          'three-helpers': ['@react-three/drei'],
          // UI components chunk
          ui: [
            './src/components/UI/LoadingScreen.tsx',
            './src/components/UI/ScrollProgress.tsx'
          ],
          // 3D components chunk
          threeComponents: [
            './src/components/3D/Background3D.tsx',
            './src/components/MovingShips.tsx'
          ],
          // Sections chunk
          sections: [
            './src/components/sections/About/About.tsx',
            './src/components/sections/Experience/Experience.tsx',
            './src/components/sections/Skills/Skills.tsx',
            './src/components/sections/Projects/Projects.tsx',
            './src/components/sections/Education/Education.tsx',
            './src/components/sections/Contact/Contact.tsx'
          ]
        }
      }
    },
    // Set chunk size warning limit to 2MB to accommodate Three.js
    chunkSizeWarningLimit: 2000,
    // Enable source maps for better debugging
    sourcemap: true
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@react-three/fiber']
  }
})
