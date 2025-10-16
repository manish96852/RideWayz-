# RideWayz Mobile Startup Script
# PowerShell script to run app with mobile access

$env:HOST = "0.0.0.0"
$env:PORT = "3002"

Write-Host "🚀 Starting RideWayz for Mobile Access..." -ForegroundColor Green
Write-Host "📱 Your phone URL will be: http://192.168.0.104:3002" -ForegroundColor Yellow
Write-Host "📲 Make sure phone and PC are on same WiFi!" -ForegroundColor Cyan

Set-Location "c:\Users\batman\Downloads\RideWayz\ridewayz-app"
npm start