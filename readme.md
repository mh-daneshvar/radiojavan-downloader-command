# RadioJavan Downloader

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

[Radio Javan][radiojavan] is the most famous website for iranian musics. This website has
removed download button, but sometimes we don't have internet connection to stream musics.
So respectfully to radiojavan, I created this package to extract the address of downloadable file 
for the given url of your favorite music.

If you have any ethical issue, please contact me. 

## How to use (for consumers)
- install the package
```console
npm i radiojavandownloader
```
- copy the url of your favorite music, then run this command
```console
rj
```
## How to use (for contributors)

I assume that you are familiar with npm, if not, this package is not suitable for you!
- clone the package in your local machine
- install dependencies
```console
npm i
```
- build the package
```console
npm run build
```
- make the runner file executable 
```console
chmod +x ./dist/index.js
```
- link the command  
```console
npm link
```
- copy the url of your favorite music, then run this command   
```console
rj
```

[radiojavan]: https://www.radiojavan.com
