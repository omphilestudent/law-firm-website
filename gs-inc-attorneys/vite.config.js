import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const appRoot = path.resolve(__dirname)
const sharedDir = path.resolve(appRoot, '../shared')

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [react()],
    server: {
        port: 5173,
        fs: {
            allow: [appRoot, sharedDir]
        },
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
            }
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@shared': sharedDir
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        // Remove the problematic rollupOptions or fix it:
        rollupOptions: {
            output: {
                // Correct manualChunks as a function
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react';
                        }
                        return 'vendor';
                    }
                }
            }
        }
    }
})