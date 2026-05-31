import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
    base: '/',
    plugins: [
        VitePWA({
            // 预缓存所有构建产物（HTML、CSS、JS、图片等）
            // globPatterns 会在 build 时自动把匹配的文件加入 precache 列表
            // 这样离线时即使没有网络也能直接从缓存读取这些核心资源
            // 这里使用通配符匹配常见的静态资源类型
            workbox: {
                // 预缓存所有构建产物（HTML、JS、CSS、图片等）
                globPatterns: ['**/*.{html,js,css,svg,png,ico,webp}'],
                // 配置路由策略，避免将HTML文件重定向到index.html
                navigateFallback: null, // 不使用fallback，保持原始路由
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        // 对于HTML文件，使用 NetworkFirst 策略而不是 NetworkOnly
                        urlPattern: /\.(html|htm)$/,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'html-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                            },
                        },
                    },
                    {
                        // 对于静态资源使用 CacheFirst 策略
                        urlPattern: /\.(css|js|svg|png|jpg|jpeg|gif|ico|webp)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'static-assets-cache',
                            expiration: {
                                maxEntries: 100,
                                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
            includeAssets: ['favicon.svg'],
            manifest: {
                name: '网络工具箱',
                short_name: "webtool",
                theme_color: "#667eea",
                scope: "/",
                start_url: "/",
                display: "standalone",
                background_color: "#667eea",
                icons: [
                    {
                        src: "favicon.svg",
                        sizes: "16x16 32x32 48x48 64x64 128x128 256x256 512x512",
                        type: "image/svg+xml",
                        purpose: "any",
                    },
                ],
            },
        }),
        Sitemap({
            hostname: 'https://webtool-7s6.pages.dev/', // 替换为您的站点 URL
        }),
    ],
});