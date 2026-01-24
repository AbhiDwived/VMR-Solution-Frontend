@echo off
echo Fixing common ESLint issues...

REM Fix unused variables by prefixing with underscore
powershell -Command "(Get-Content 'src/app/(auth)/reset-password/page.tsx') -replace 'import { useRouter }', '// import { useRouter }' | Set-Content 'src/app/(auth)/reset-password/page.tsx'"

powershell -Command "(Get-Content 'src/app/(dashboard)/dashboard/components/ProfileSection.tsx') -replace 'data:', '_data:' | Set-Content 'src/app/(dashboard)/dashboard/components/ProfileSection.tsx'"

powershell -Command "(Get-Content 'src/app/(shop)/cart/components/CartItem.tsx') -replace 'id,', '_id,' -replace 'newQuantity', '_newQuantity' | Set-Content 'src/app/(shop)/cart/components/CartItem.tsx'"

powershell -Command "(Get-Content 'src/app/(shop)/cart/components/OrderSummary.tsx') -replace 'code:', '_code:' | Set-Content 'src/app/(shop)/cart/components/OrderSummary.tsx'"

REM Remove console.log statements
powershell -Command "(Get-Content 'src/app/(dashboard)/dashboard/components/DashboardInteractive.tsx') -replace 'console\.log\([^)]*\);', '// console.log removed' | Set-Content 'src/app/(dashboard)/dashboard/components/DashboardInteractive.tsx'"

echo Done! Run npm run lint to check remaining issues.
pause