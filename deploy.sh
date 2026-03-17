#!/bin/bash

# ── Colors for output ────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Deploying HireOS...${NC}"

# ── Step 1: Navigate to project root ─────────────────
cd ~/hireos || exit 1

# ── Step 2: Stop existing containers if running ──────
echo -e "${YELLOW}⏹  Stopping existing containers...${NC}"
docker-compose down

# ── Step 3: Build fresh image ────────────────────────
echo -e "${YELLOW}🔨 Building Docker image...${NC}"
docker-compose build --no-cache

# ── Step 4: Start all containers ─────────────────────
echo -e "${YELLOW}▶️  Starting containers...${NC}"
docker-compose up -d

# ── Step 5: Wait for app to be healthy ───────────────
echo -e "${YELLOW}⏳ Waiting for app to be ready...${NC}"
sleep 5

# ── Step 6: Health check ─────────────────────────────
echo -e "${YELLOW}🔍 Running health check...${NC}"
HEALTH=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/health)

if [ "$HEALTH" == "200" ]; then
    echo -e "${GREEN}✅ HireOS is live! Health check passed.${NC}"
    echo -e "${GREEN}🌐 Access it at: http://54.215.104.250${NC}"
else
    echo -e "${RED}❌ Health check failed (HTTP $HEALTH). Check logs:${NC}"
    echo -e "${RED}   docker-compose logs${NC}"
    exit 1
fi

# ── Step 7: Show running containers ──────────────────
echo ""
echo -e "${YELLOW}📦 Running containers:${NC}"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
