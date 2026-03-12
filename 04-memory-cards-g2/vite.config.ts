import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import prettyCssModules from 'vite-plugin-pretty-css-modules';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), prettyCssModules(), tailwindcss()]
});
