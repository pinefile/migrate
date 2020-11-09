# Migrate

Experimental migration tool for replacing other task runners with pine.

## npm scripts

To migrate from `npm scripts` to Pine you run this command within this repository.

```
npx github:pinefile/migrate npm [/path/to/package.json] [--output=pinefile.js] [--tasksDir=tasks]
```

It will create a `pinefile.js` at the same path as the `package.json` and create tasks inside `tasks` directory if you have scripts that use colons, e.g `build:prod` will be in `tasks/build.js`

## License

MIT © [Fredrik Forsmo](https://github.com/frozzare)