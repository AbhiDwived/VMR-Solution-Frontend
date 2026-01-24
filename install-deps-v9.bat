@echo off
echo Installing code quality dependencies...

npm install --save-dev ^
  prettier ^
  eslint-config-prettier ^
  eslint-plugin-prettier ^
  @eslint/eslintrc ^
  @typescript-eslint/eslint-plugin@^8.29.0 ^
  @typescript-eslint/parser@^8.29.0 ^
  eslint-plugin-react ^
  eslint-plugin-react-hooks ^
  eslint-plugin-jsx-a11y ^
  eslint-plugin-import ^
  husky ^
  lint-staged ^
  @commitlint/cli ^
  @commitlint/config-conventional

echo.
echo Setting up Husky...
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
npx husky add .husky/commit-msg "npx --no -- commitlint --edit $1"

echo.
echo Setup complete!
pause