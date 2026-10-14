---
title: "Ports: HTTP 200 doesn't mean it's your service answering"
description: "A skill for starting and restarting local services when other projects are running on the machine and ports are taken."
topic: "dev"
tags: ["debugging", "automation"]
models: []
lang: "en"
translated_from: "ru"
machine_translation: true
---

# Ports: HTTP 200 doesn't mean it's your service answering

> Machine translation from Russian. [Original](/skills/port-management)

**Purpose:** When several projects run on one machine, Claude keeps falling into three traps: the port is taken, the old version is still running after a restart, `curl localhost:8000` returns 200 — but it's someone else's service. The skill makes Claude check who is actually listening on the port.

**How to use:** Create .claude/skills/port-management/SKILL.md in your project, or in ~/.claude/skills/ for all projects. Claude will turn the skill on when it starts a dev server, a backend or docker compose.

```text
---
name: port-management
description: "Rules for starting local services. Use on any start or restart of a frontend, backend, dev server or docker compose: check whether the port is free, kill the old process on restart, make sure it is your service that responds."
---

# Ports

1. Before starting, check the port:
   ss -tlnp | grep ":PORT " || lsof -iTCP:PORT -sTCP:LISTEN -P -n
   - taken by someone else's process → take the next free one and say so;
   - taken by an old process of this project → step 2.

2. Restart = kill + check + start. Running npm run dev again does NOT kill the old process.
   PID=$(lsof -tiTCP:PORT -sTCP:LISTEN); [ -n "$PID" ] && kill $PID && sleep 1
   If it's still alive — kill -9. Make sure the port is free, and only then start.
   After three failed attempts — stop and tell the user.

3. HTTP 200 ≠ your service. After starting:
   - lsof / ps: the process PID and working directory match the project;
   - backend: /health returns the service name and version;
   - frontend: <title> or <meta name="app-id"> match.

4. Port changed → update .env and the proxy so the frontend talks to the right backend, and tell the user: "backend on :8003 (8000–8002 are taken)". Don't hardcode ports in the code.

5. Keep PORTS.md in the root: service → main port → fallback ports.

6. docker compose: ports via ${HOST_PORT:-8000}:8000; run down before up. down doesn't touch other processes on the same ports — check those with step 1.
```

**Why it works:** The "tested the old build" mistake is the most expensive one: every check passes, but the wrong code is being checked. Matching the PID and working directory, plus a marker in /health, tells your process apart from someone else's, and the explicit "kill and check" closes the trap of rerunning npm run dev.

**When it doesn't work:** If the service runs inside a container, lsof on the host shows docker-proxy, not your app. In that case check with docker ps and /health.
