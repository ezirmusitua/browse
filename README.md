# browse

the system image viewer(like `preview` in MacOS) dose not animated webp image. use `browse` to view this images in your system browser.

## Feature

1. view images in nested directory with browser

2. open directory with Automator workflow

## HOW TO

prepare build environment

1. install Node.js 14;

2. install dependencies: `yarn` or `npm install`;

3. build executable: `yarn build` or `npm run build`;

4. make system link: `ln -sf /path/to/project/build/browse /usr/local/bin/browse`;

5. add preset workflow with `.scripts`;

6. open directory in Terminal.app: `browse /absolute/path/to/directory` or;

7. open directory in finder context menu.
