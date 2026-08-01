import { defineConfig } from "vitest/config";

/** Firestore rules tests only (emulator required). See npm run test:rules. */
export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.{test,spec}.{js,jsx}"],
    fileParallelism: false,
  },
});
