import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Sem isso, todo componente estilizado aparece como "styled.div"
          // genérico no React DevTools. Com isso, aparece "Header__Nav-sc-xxx",
          // o que ajuda muito a debugar em dev.
          ['babel-plugin-styled-components', { displayName: true, fileName: false }],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
