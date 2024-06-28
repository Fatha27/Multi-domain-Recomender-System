# Use the official Node.js image as a base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Environment variables
ENV DATABASE="mongodb+srv://admim-abrar:asdf1029@atlascluster.2pbhpec.mongodb.net/RecommenderSystems"
ENV JWT_SECRET="d3gf5erstger"
ENV CLIENT_ID="244944068996-nn5kk3keak63pfl864h0lrk325hjurjn.apps.googleusercontent.com"
ENV CLIENT_SECRET="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"
ENV API_KEY="AIzaSyAOHhSMF8U-Rdv75vd0w-dxuvkwTW7RLt0"

# Expose the port the app runs on
EXPOSE 6005

# Define the command to run the server
CMD ["node", "app.js"]
