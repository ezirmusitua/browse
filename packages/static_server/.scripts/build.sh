#!/usr/bin/bash
rm -rf build/{win,macos}
npx tsc -b .
npx pkg .
mkdir -p build/{win,macos}
mv build/static_server-win-x64.exe build/win/browse_ss.exe
mv build/static_server-macos-arm64 build/macos/browse_ss
cp .env build/win/
cp .env build/macos/

