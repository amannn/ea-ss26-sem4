import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import prettyCssModules from 'vite-plugin-pretty-css-modules';

export default defineConfig({
  plugins: [react(), prettyCssModules(), tailwindcss()]
});
