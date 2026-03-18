FROM node:22-bookworm-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build && npm prune --production
ENV MCP_TRANSPORT=http
ENV MCP_PORT=3000
EXPOSE 3000
CMD ["node", "dist/index.js"]
