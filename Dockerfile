# ---- Step 1: Build the application ----
    FROM node:18-alpine AS builder

    # Set the working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json
    COPY package.json package-lock.json ./
    
    # Install dependencies
    RUN npm install --frozen-lockfile
    
    # Copy the entire project
    COPY . .
    
    # Build the Next.js application
    RUN npm run build
    
    # ---- Step 2: Run the application ----
    FROM node:18-alpine AS runner
    
    # Set the working directory
    WORKDIR /app
    
    # Copy built application from builder stage
    COPY --from=builder /app/package.json /app/package-lock.json ./
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules ./node_modules
    
    # Set environment variables
    ENV NODE_ENV=production
    ENV PORT=3000
    
    # Expose port
    EXPOSE 3000
    
    # Start Next.js server
    CMD ["npm", "run", "start"]
    