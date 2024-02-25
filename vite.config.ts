import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
export default defineConfig({
    plugins: [svgr(), react()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@app': path.resolve(__dirname, 'src/app'),
            '@shared': path.resolve(__dirname, 'src/shared'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@modules': path.resolve(__dirname, 'src/modules'),
        },
    },
});
