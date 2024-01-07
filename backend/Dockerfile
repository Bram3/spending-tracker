FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY [ "package.json", "pnpm-lock.yaml", "./" ]

FROM base AS dev
ENV NODE_ENV=dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
CMD [ "pnpm", "start:dev" ]



FROM base AS prod
RUN pnpm install --frozen-lockfile
COPY . . 
RUN pnpm add -g @nestjs/cli
RUN pnpm run build
CMD [ "pnpm", "start:prod" ]