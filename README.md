# browse

the system image viewer(like `preview` in MacOS) dose not animated webp image. use `browse` to view this images in your system browser.

## HOW TO

prepare build environment

1. install Node.js 14

2. install dependencies: `yarn` or `npm install`

3. build executable: `yarn build` or `npm run build`

4. make system link: `ln -sf /path/to/project/build/browse /usr/local/bin`

5. open directory contains images: `browse /absolute/path/to/directory`
