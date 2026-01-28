import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

/**
 * OpenCode Webhook Plugin
 * Sends OpenCode events to a configured webhook endpoint.
 */
export const OpencodeWebhook = ({ client, directory, worktree }) => {
  let config = {
    enabled: true,
    timeout: 60,
  };
  let lastMtime = 0;

  const refreshConfig = async () => {
    try {
      const stats = await fs.stat(configPath);
      if (stats.mtimeMs > lastMtime) {
        const configData = await fs.readFile(configPath, "utf-8");
        config = {
          enabled: true,
          timeout: 60,
          ...JSON.parse(configData),
        };
        lastMtime = stats.mtimeMs;
      }
    } catch (err) {
      if (lastMtime !== 0) {
        // Reset if config file was deleted
        config = { enabled: true, timeout: 60 };
        lastMtime = 0;
      }
    }
  };

  const configPath = path.join(
    os.homedir(),
    ".opencode-webhook",
    "config.json",
  );

  const fire = async (event) => {
    await refreshConfig();
    if (!config.enabled || !config.webhook_url) {
      return;
    }

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), config.timeout * 1000);

    try {
      await fetch(config.webhook_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "OpenCode-Webhook-Plugin",
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          directory,
          worktree,
          event,
        }),
        signal: controller.signal,
      });
    } catch (err) {
      // Silently fail to avoid interrupting the user's workflow
      await client.app.log({
        service: "opencode-webhook",
        level: "error",
        message: `Failed to send webhook: ${err.message}`,
      });
    } finally {
      clearTimeout(id);
    }
  };

  return {
    event: ({ event }) => {
      fire(event).catch(() => {});
    },
  };
};
