# syntax=docker/dockerfile:1
# This tells Docker which version of the Dockerfile syntax to use — version 1 is the latest stable version

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

# "ARG NODE_VERSION=19.5.0" creates a build argument — a variable we can use later in the file
ARG NODE_VERSION=19.5.0

# "FROM node:${NODE_VERSION}-alpine" starts our image from the official Node.js image
# "alpine" means it's based on Alpine Linux — a very tiny Linux distribution that keeps the image small
FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
# "ENV NODE_ENV production" sets an environment variable inside the container
# This tells Node.js to run in production mode (more optimized, less debugging output)
ENV NODE_ENV production


# "WORKDIR /usr/src/app" sets the working directory — all future commands run from this folder inside the container
# If the folder doesn't exist, Docker creates it automatically
WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# "RUN --mount=type=bind" reads package.json and package-lock.json from your computer without copying them into the image
# "--mount=type=cache,target=/root/.npm" caches npm downloads so reinstalling is faster
# "npm ci --include=dev" installs all dependencies from package-lock.json (dev dependencies too for live reload)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

# install nodemon for hot-reloading
# ".npmrc" is a config file that may have npm settings needed for the install to work
COPY .npmrc .
# "npm install -g nodemon" installs nodemon globally inside the container
# Nodemon watches your code files and automatically restarts the server when you save changes
RUN npm install -g nodemon

# Copy the rest of the source files into the image.
# "COPY . ." copies everything from the current directory (./app) into the container's working directory
COPY . .


# Run the application as a non-root user.
# "chown -R node /usr/src/app" changes ownership of all files to the "node" user (a built-in non-root user)
# Running as a non-root user is a security best practice — if someone hacks the app, they can't do as much damage
RUN  chown -R node /usr/src/app
# "USER node" switches to the "node" user so the app runs with limited permissions
USER node

# Expose the port that the application listens on.
# "EXPOSE 3000" documents that the app uses port 3000 — it doesn't actually publish the port, that's done in compose.yaml
EXPOSE 3000

# Run the application in dev mode to use with Compose watch feature
# "CMD npm run dev" is the command that runs when the container starts
# "npm run dev" starts nodemon which watches for file changes and auto-restarts the server
CMD npm run dev
