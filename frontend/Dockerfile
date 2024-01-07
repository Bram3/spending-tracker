FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY "package.json" "pnpm-lock.yaml" ./

RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm run build

EXPOSE 4173

CMD [ "pnpm", "preview" ]