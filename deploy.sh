#!/bin/bash
echo "Starting deployment..."
cd ~/game-zone-manager/web-app
git pull origin main
npm install
npm run build
# Copy to Android assets if needed
cp -r dist/* ../android-app/app/src/main/assets/web/
echo "Deployment completed!"
