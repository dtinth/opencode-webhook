# OpenCode Webhook Plugin

A lightweight, asynchronous webhook plugin for OpenCode that sends all OpenCode events to a configured webhook endpoint. This plugin is written in plain JavaScript with no dependencies.

## Setting up

**Install the plugin:**

Add `opencode-webhook` to your `opencode.json` configuration file:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["opencode-webhook"]
}
```

**Configure the plugin** at `~/.opencode-webhook/config.json`:

```sh
mkdir -p ~/.opencode-webhook
echo '{
  "webhook_url": "https://your-webhook-endpoint.com/events",
  "enabled": true,
  "timeout": 60
}' > ~/.opencode-webhook/config.json
```

### Configuration Options

- `webhook_url` (required): The endpoint to send webhook events to.
- `enabled` (optional): Set to `false` to disable webhook sending (default: `true`).
- `timeout` (optional): Timeout for fetch requests in seconds (default: `60`).

## How it works

The plugin hooks into the `event` system of OpenCode. Whenever an event occurs, it sends a `POST` request to your configured `webhook_url` with the following JSON body:

```json
{
  "timestamp": "2026-01-28T12:00:00.000Z",
  "event": {
    "type": "session.idle",
    ...
  }
}
```

## Security

This plugin uses native `fetch` and built-in Node.js/Bun modules. It does not have any external dependencies, making it easy to audit.
