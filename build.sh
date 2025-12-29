#!/bin/bash
echo "🚀 Building Vue.js app..."
npm run build

echo "📦 Copying to Android assets..."
rm -rf ../android-app/app/src/main/assets/web
mkdir -p ../android-app/app/src/main/assets/web
cp -r dist/* ../android-app/app/src/main/assets/web/

echo "✅ Build completed!"
