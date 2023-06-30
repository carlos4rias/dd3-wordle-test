# WORDLE DD3 Test

This test try to recreate the popular game named wordle, although this is not completed yet here are the instructions to run it locally, it was built using node 18 and npm 9.x.x.

1- at the path `/src/utils` there is a script to get the spanish dictionary used the output is the `rawWords.json` file. run it by writing the next command.
```bash
  node downloadAndCleanWords.js 
```
bearing in mind that node > 17 should be use.

2- Join at the root folder by using the cmd/terminal and write
```bash
npm install
```


3- For run the project just write at the cmd/terminal and write
```bash
npm run dev
```

## Used tools
- Tailwind
- Typescript
- Vite
- React
- Zustand

## Improvements
- Validate the game logic.
- Add tests.
- Add 5 minutes counter.
- Add validation in order to dont repeat words.
- Add missed Styles.
