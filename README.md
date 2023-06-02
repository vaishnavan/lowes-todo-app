### Creating a TODO App using MERN Stack

## Steps to commit the code

Step 1: git add .

Step 2: npm run commit 

step 3: git push -u origin main

# Coding Standard and Conventional commits setup guidelines

## Dependencies Required for Eslint and Prettier

### ESLint

`` npm install eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --save-dev ``

### Prettier

`` npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev ``

## Automate the eslint and prettier checking before committing the code

`` npm install husky lint-staged --save-dev ``

```js
    "husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

```js
    "lint-staged": {
  "*.{js,jsx,ts,tsx}": [
    "npm run lint",
    "npm run format",
    "git add"
  ]
}
```

## Dependencies Required for conventional commits

`` npm install commitizen conventional-changelog-cli --save-dev ``

`` npx commitizen init cz-conventional-changelog --save-dev --save-exact ``





