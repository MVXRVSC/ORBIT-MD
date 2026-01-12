FROM node:20-bookworm-slim

# ================= DEPENDENCIAS DEL SISTEMA =================
RUN apt-get update && apt-get install -y \
  git \
  ffmpeg \
  imagemagick \
  libwebp-dev \
  ca-certificates \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# ================= DIRECTORIO DE TRABAJO =================
WORKDIR /app

# ================= CLONAR BOT =================
RUN git clone https://github.com/GataNina-Li/YartexBot-MD .

# ================= DEPENDENCIAS NODE =================
RUN corepack enable && yarn install --production

# ================= VARIABLES DE ENTORNO =================
ENV NODE_ENV=production
ENV TZ=America/Havana

# ================= PUERTO (KOYEB) =================
EXPOSE 3000

# ================= START =================
CMD ["node", "index.js"]

