#!/usr/bin/bash
rm -rf build/{win,macos}
mv .env .env.backup
cp .env.production .env
yarn build
yarn pkg
mkdir -p build/{win,macos}
mv build/app-win-x64.exe build/win/browse_client.exe
mv build/app-macos-arm64 build/macos/browse_client
cp .env build/win/
cp .env build/macos/
rm -rf .next
mv .env.backup .env

