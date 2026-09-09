import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Cho phép host từ bên ngoài (tương đương --host 0.0.0.0)
    port: 5173, // Cổng chạy React
    proxy: {
      // Tự động chuyển hướng các request bắt đầu bằng /api sang Backend ở cổng 5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
