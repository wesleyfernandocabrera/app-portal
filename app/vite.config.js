import { resolve } from 'path';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    server: {
        host: 'localhost', // Garante uso de IPv4 em vez de IPv6
        port: 5173, // Define a porta do servidor de desenvolvimento
        cors: true, // Ativa suporte a CORS
    },
    resolve: {
        alias: {
            '@tailwind.config': resolve(__dirname, './tailwind.config.js'),
            '@': resolve(__dirname, 'resources'), // Ajuste do alias para apontar corretamente
        },
    },
    plugins: [
        laravel({
            input: [
                'resources/scss/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
    ],
});
