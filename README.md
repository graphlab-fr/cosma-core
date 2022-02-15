# cosma-core

Shared core functionality of the interfaces [cosma](https://github.com/graphlab-fr/cosma) and [cosma-cli](https://github.com/graphlab-fr/cosma-cli).

Updates to cosma-core must me pulled manually in each repository by running one of these commands:

```
npm run modules
git submodule foreach git pull origin master
```

We use cosma-core to debug the interfaces. Use the these commands to get a test-cosmoscope:

```
npm i
npm start
```