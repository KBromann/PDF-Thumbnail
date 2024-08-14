import dynamicImportVars from '';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dynamicImportVars({
      // options
    }),
    react(),
  ],
});
