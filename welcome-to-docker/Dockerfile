# Start your image with a node base image
# "FROM node:22-alpine" uses the official Node.js version 22 on Alpine Linux (tiny, fast to download)
FROM node:22-alpine

# The /app directory should act as the main application directory
# "WORKDIR /app" sets the working directory — all commands run from inside /app
# If /app doesn't exist, Docker creates it automatically
WORKDIR /app

# Copy the app package and package-lock.json file
# "COPY package*.json ./" copies package.json and package-lock.json into the container
# The "*" is a wildcard — it matches both files at once
# We copy these first so Docker can cache the dependency install step (speeds up rebuilds)
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
# "COPY ./src ./src" copies the React source code folder into the container
COPY ./src ./src
# "COPY ./public ./public" copies the public assets folder (index.html, favicon, etc.) into the container
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
# ".npmrc" may contain npm configuration needed for the install to work properly
COPY .npmrc .
# "npm ci" installs dependencies from package-lock.json (clean install — fast and reliable)
# "&&" chains commands — each only runs if the previous one succeeded
# "npm install -g serve" installs the "serve" package globally — it's a simple static file server
# "npm run build" builds the React app into optimized static files in a "build" folder
# "rm -fr node_modules" deletes the node_modules folder after building — we don't need it anymore since serve is global
# This keeps the final image small (no unnecessary files)
RUN npm ci \
    && npm install -g serve@latest \
    && npm run build \
    && rm -fr node_modules

# "EXPOSE 3000" documents that the app runs on port 3000 — actual port mapping happens in docker-compose.yaml
EXPOSE 3000

# Start the app using serve command
# "CMD" defines the default command to run when the container starts
# "serve -s build" serves the static files in the "build" folder as a single-page app (-s flag)
CMD [ "serve", "-s", "build" ]
