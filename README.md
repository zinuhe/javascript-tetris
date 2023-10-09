# javascript-tetris

## Create

```shell
npm create vite@latest tetris
```

## Install dependencies

```shell
pnpm install
```

# To Run

```shell
pnpm run dev
```

## Linter

### Install

```shell
pnpm install standard -D
```

### Config

[Documentation](https://eslint.org/docs/latest/use/configure/)

On **`package.json`** add at the end:

```javascript
"eslintConfig": {
  "extends":[
      "standard"
  ],
  "rules": {
    "space-before-function-paren": ["error", "never"]
  }
}
```

## Canvas

Add a canvas to draw on it

# To Know

- const context = canvas.getContext('2d');
