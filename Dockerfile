# Portfolio site (Astro). Three targets:
#   dev   - Astro dev server with live reload (used by docker compose)
#   build - produces the static site in /app/dist
#   site  - serves the built site with nginx, the same files GitHub Pages serves

FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS dev
COPY . .
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "4321", "--ignore-lock"]

FROM deps AS build
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS site
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
