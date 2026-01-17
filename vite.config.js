import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
    base: '/',
    plugins: [
        VitePWA({
            injectRegister: 'auto',
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true
            },
            includeAssets: ['favicon.svg'],
            manifest: {
                name: '网络工具箱',
                short_name: "webtool",
                theme_color: "#667eea",
                scope: "https",
                start_url: "./",
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