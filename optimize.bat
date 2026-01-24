@echo off
echo Optimizing Next.js development environment...

REM Clear Next.js cache
if exist ".next" (
    echo Clearing .next cache...
    rmdir /s /q ".next"
)

REM Clear node_modules cache
if exist "node_modules\.cache" (
    echo Clearing node_modules cache...
    rmdir /s /q "node_modules\.cache"
)

REM Clear npm cache
echo Clearing npm cache...
npm cache clean --force

REM Clear TypeScript build info
if exist "tsconfig.tsbuildinfo" (
    del "tsconfig.tsbuildinfo"
)

echo Optimization complete!
echo Run "npm run dev" to start the optimized development server.
pause