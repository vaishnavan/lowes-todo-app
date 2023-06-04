## Lowes Todo App

Creating a TODO App using MERN Stack.

ToDo APP :- [https://lowes-todo-app.netlify.app/](https://lowes-todo-app.netlify.app/)\
API EndPoint :- [https://lowes-todo-app.vercel.app/](https://lowes-todo-app.vercel.app/)

**1. Followed code standards using airbnb, eslint, prettier**\
**2. Automated the commits using husky, lintstaged, commitlint, commitizen, conventional-changelog-cli, cz-conventional-changelog**\
**3. Written test case using jest and react testing library**\
**4. For Designing used material UI and Styled components**\
**5. For Continuous Integration used GitHub actions**\
**6. Deployment for client-side ``Netlify`` and for server-side ``Vercel``**


### Screenshot
![image description](/public/images/output-screen.png)

### Steps to commit the code

Step 1: git add .

Step 2: npm run commit 

step 3: git push -u origin main

### Coding Standard and Conventional commits setup guidelines

### Dependencies Required for Eslint and Prettier

### ESLint

`` npm install eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y --save-dev ``

### Prettier

`` npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev ``

### Automate the eslint and prettier checking before committing the code

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

### Dependencies Required for conventional commits

`` npm install commitizen conventional-changelog-cli --save-dev ``

`` npx commitizen init cz-conventional-changelog --save-dev --save-exact ``





