import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is statically generated (no ISR / revalidate), so no incremental cache store is needed.
export default defineCloudflareConfig();
