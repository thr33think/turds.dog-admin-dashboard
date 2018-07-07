# Compile Angular App
FROM node:8.6 as node
ARG AUTH_TOKEN
COPY ./ /app/
WORKDIR /app
RUN npm install
RUN npm run build

# Build final image
FROM andimenge/file-server
COPY --from=node /app/dist/ /
EXPOSE 8080
ENTRYPOINT ["/file-server"]