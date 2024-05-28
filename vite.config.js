import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // http://localhost:5173/api/movieOnInfoList -> https://m.maoyan.com/ajax/movieOnInfoList
        proxy: {
            '^/api': {
                target: 'https://m.maoyan.com/ajax', // 目标源，目标服务器，真实请求地址
                changeOrigin: true, //支持跨域
                rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写，把'/api'替换为''
            },
        },
    },
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src',
                import.meta.url))
        }
    }
})