# Deployment Script for Star Concord Chatbot
# This script builds the frontend and provides instructions for the backend.

Write-Host "--- Starting Deployment Process ---" -ForegroundColor Cyan

# 1. Build Frontend
Write-Host "`n[1/3] Building Frontend App..." -ForegroundColor Yellow
cd "$PSScriptRoot\teams-chatbot"
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend build successful! Files are in teams-chatbot/dist" -ForegroundColor Green
} else {
    Write-Host "Frontend build failed!" -ForegroundColor Red
    exit
}

# 2. Backend Prep
Write-Host "`n[2/3] Preparing Backend..." -ForegroundColor Yellow
Write-Host "Ensure chatbot-backend/.env is correctly configured with all Agent Keys." -ForegroundColor Gray

# 3. Deployment Instructions
Write-Host "`n[3/3] Deployment Steps:" -ForegroundColor Yellow
Write-Host "1. Frontend: Deploy the contents of 'teams-chatbot/dist' to a Static Hosting service (Netlify, Vercel, or DO App Platform)."
Write-Host "2. Backend: Deploy the 'chatbot-backend' folder to a Node.js hosting service (DO App Platform, Heroku, or a VPS)."
Write-Host "3. URL Update: After deploying the backend, update VITE_BACKEND_URL in your frontend .env and rebuild."

Write-Host "`n--- Process Complete ---" -ForegroundColor Cyan
