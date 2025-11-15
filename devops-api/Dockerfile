FROM node:18-alpine
WORKDIR /app

# Copier uniquement package.json et package-lock pour profiter de la cache Docker
COPY package*.json ./

# Installer seulement les dépendances de production
RUN npm ci --only=production

# Copier le reste du code
COPY . .

EXPOSE 3000

# Démarrer l'app
CMD ["node", "index.js"]
