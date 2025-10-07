# Use the official Node.js 18 Apline image.
FROM node:18-alpine

# Create a new working directory and copy the project dependency specifications.
WORKDIR /app
COPY package.json .

# Install dependencies and copy application code into the working directory.
RUN npm install
RUN npm i -g serve
COPY . .

EXPOSE 5173

RUN npm run build
CMD ["serve", "-s", "dist", "-l", "5173"]