# Use the official Node.js 18 Apline image.
FROM node:18-alpine

# Create a new working directory and copy the project dependency specifications.
WORKDIR /app
COPY package.json .

# Install dependencies and copy application code into the working directory.
RUN npm install
COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]