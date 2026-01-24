# Code Quality Setup Instructions

## 🚀 Quick Setup

1. **Install dependencies:**
   ```bash
   # Run the installation script
   ./install-deps.bat
   
   # Or manually install:
   npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import husky lint-staged @commitlint/cli @commitlint/config-conventional
   ```

2. **Initialize Husky:**
   ```bash
   npx husky install
   npm run prepare
   ```

3. **Test the setup:**
   ```bash
   npm run quality
   ```

## 📋 Available Scripts

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run lint:strict` - Strict linting with zero warnings
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting
- `npm run type-check` - TypeScript type checking
- `npm run quality` - Run all quality checks
- `npm run quality:fix` - Fix all quality issues

## 🔧 What's Configured

### ESLint Rules:
- ✅ No unused variables (with underscore exception)
- ✅ No `any` types
- ✅ No console logs (warn only)
- ✅ React hooks rules
- ✅ Import ordering
- ✅ TypeScript strict rules

### Prettier Rules:
- ✅ Single quotes
- ✅ 100 character line width
- ✅ Trailing commas
- ✅ 2-space indentation

### Pre-commit Hooks:
- ✅ Automatic linting
- ✅ Automatic formatting
- ✅ Type checking
- ✅ Conventional commit validation

### TypeScript Strict Mode:
- ✅ No unused locals/parameters
- ✅ Exact optional properties
- ✅ No implicit returns
- ✅ No unchecked indexed access

## 🎯 Commit Message Format

Use conventional commits:
```
feat: add user authentication
fix: resolve cart calculation bug
docs: update API documentation
style: format code with prettier
refactor: simplify user service
test: add unit tests for cart
chore: update dependencies
```

## 🔍 SonarQube Integration

1. Install SonarQube Scanner
2. Configure your SonarQube server URL
3. Run: `sonar-scanner`

## 🚫 What Gets Blocked

- Code with ESLint errors
- Unformatted code
- TypeScript errors
- Invalid commit messages
- Console.log statements (warnings)
- Unused variables
- `any` types

## ✅ Benefits

- **Consistent Code Style** - Prettier ensures uniform formatting
- **Early Bug Detection** - ESLint catches issues before runtime
- **Type Safety** - Strict TypeScript prevents type-related bugs
- **Clean Git History** - Conventional commits improve readability
- **Automated Quality** - Pre-commit hooks prevent bad code from entering repo
- **Production Ready** - Configuration matches enterprise standards