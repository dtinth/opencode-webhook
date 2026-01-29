# OpenCode Webhook Plugin

A lightweight, asynchronous webhook plugin for OpenCode that sends all OpenCode events to a configured webhook endpoint. This plugin is written in plain JavaScript with no dependencies, so you can easily

## Setting up

**Install the plugin:** You can install the plugin from npm or install from source.

- Using npm: Add `opencode-webhook` to your `opencode.json` configuration file:

  ```json
  {
    "$schema": "https://opencode.ai/config.json",
    "plugin": ["opencode-webhook"]
  }
  ```

- From source: Just symlink `index.js` into your OpenCode plugins directory:

  ```sh
  ln -s $PWD/index.js ~/.config/opencode/plugins/webhook.js
  ```

**Configure the plugin** at `~/.opencode-webhook/config.json`:

```sh
mkdir -p ~/.opencode-webhook
cp config.example.json ~/.opencode-webhook/config.json
```

### Configuration Options

- `webhook_url` (required): The endpoint to send webhook events to.
- `enabled` (optional): Set to `false` to disable webhook sending (default: `true`).
- `timeout` (optional): Timeout for fetch requests in seconds (default: `60`).

## Example Request Body

```json
{
  "timestamp": "2026-01-28T06:37:56.405Z",
  "directory": "/config/scribeditor",
  "worktree": "/config/scribeditor",
  "event": {
    "type": "message.updated",
    "properties": {
      "info": {
        "id": "msg_c0352a08c001aJRZpIAkSFTWEg",
        "sessionID": "ses_3fcad5f2dffeVNtndVUM3U0N9O",
        "role": "user",
        "time": {
          "created": 1769582272863
        },
        "summary": {
          "title": "Autoscroll while video plays implementation",
          "diffs": []
        },
        "agent": "build",
        "model": {
          "providerID": "opencode",
          "modelID": "big-pickle"
        }
      }
    }
  }
}
```
