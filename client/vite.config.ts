import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Plugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImportHAndlerPlugin()],
  build: {
    outDir: 'dist/client',
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` }
      } else {
        return { relative: true }
      }
    },
  },
})

function dynamicImportHAndlerPlugin(): Plugin | false {
  return {
    name: 'my-plugin',
    renderDynamicImport() {
      return {
        left: 'import(window.__dynamicImportHandler(',
        right: '))',
      }
    },
  }
}
