FROM node:16-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app
COPY package.json .

# copy all env files, but don't fail if they don't exist
COPY .env* ./

COPY /src/ ./src/

COPY docker/docker-healthcheck.mjs /app/docker/docker-healthcheck.mjs
RUN chmod +x /app/docker/docker-healthcheck.mjs

HEALTHCHECK --interval=10s --timeout=3s --retries=3 CMD ["/app/docker/docker-healthcheck.mjs"]

COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
# Start shell to allow shell access if necessary
CMD [ "sh" ]
