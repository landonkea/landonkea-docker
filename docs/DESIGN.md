# landonkea-docker — Design & Workflow

## High-Level Overview

```mermaid
graph TB
    subgraph "landonkea-docker"
        A[Root docker-compose.yaml] --> B[welcome-to-docker/]
        A --> C[multi-container-app/]
    end

    subgraph "welcome-to-docker"
        B --> D[Dockerfile]
        D --> E[Node.js Getting Started App]
    end

    subgraph "multi-container-app"
        C --> F[compose.yaml]
        F --> G[todo-app service]
        F --> H[todo-database service]
        G --> I[Dockerfile]
        I --> J[Express.js App]
        H --> K[MongoDB 6]
        J --> L[MongoDB Connection]
        L --> H
    end
```

## Container Architecture

```mermaid
graph LR
    subgraph "Your Computer"
        M[Browser :3000]
        DB[Debug :27017]
    end

    subgraph "Docker Network"
        A[todo-app :3000] --> B[todo-database :27017]
    end

    M --> A
    DB --> B

    subgraph "Volumes"
        V[(database volume)] --> B
    end
```

## Granular Workflow: Multi-Container App

```mermaid
sequenceDiagram
    participant U as User
    participant DC as Docker Compose
    participant A as todo-app
    participant D as todo-database

    U->>DC: docker compose up -d
    DC->>D: Start MongoDB container
    DC->>A: Start Express app container
    A->>D: Connect to MongoDB
    D-->>A: Connection established
    A-->>U: App running on localhost:3000
```

## Granular Workflow: Development Mode

```mermaid
flowchart TD
    A[User edits code] --> B{File changed?}
    B -->|package.json| C[Rebuild container]
    B -->|Other file| D[Sync file to container]
    C --> E[Reinstall dependencies]
    D --> F[LiveReload triggers]
    E --> F
    F --> G[Browser auto-refreshes]
```

## File Relationships

| File | Purpose | Used By |
|------|---------|---------|
| `docker-compose.yaml` (root) | Simple Nginx web server | User (learning) |
| `multi-container-app/compose.yaml` | Todo app + MongoDB | User (learning) |
| `multi-container-app/app/Dockerfile` | Build Express app | `compose.yaml` |
| `multi-container-app/app/server.js` | Express server entry | Docker |
| `multi-container-app/app/config/keys.js` | MongoDB connection config | `server.js` |
| `welcome-to-docker/Dockerfile` | Docker tutorial image | User (learning) |

## draw.io

[Open in draw.io](https://app.diagrams.net/#RContainer%20architecture%20diagram)
