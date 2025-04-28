FROM node:18-alpine

WORKDIR /app

# Copiamos dependencias primero para aprovechar el cache
COPY package.json package-lock.json ./
RUN npm install

# Copiamos el resto de la app
COPY . .

# Exponemos el puerto de desarrollo de Vite
EXPOSE 5173

# Iniciar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
