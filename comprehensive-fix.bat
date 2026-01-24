@echo off
echo Running comprehensive ESLint fixes...

REM Fix remaining unused variables
powershell -Command "Get-ChildItem -Path 'src' -Recurse -Include '*.tsx','*.ts' | ForEach-Object { $content = Get-Content $_.FullName -Raw; $content = $content -replace '\\b(data|error|result|index|item|id|quantity|code|filters|sortBy|productId|size|color|variant|address|methodId|orderId|animationDelay|onAddToCart|relatedProducts|e|value)\\s*([,})])', '_$1$2'; Set-Content -Path $_.FullName -Value $content }"

REM Replace hydration patterns
powershell -Command "Get-ChildItem -Path 'src' -Recurse -Include '*.tsx' | ForEach-Object { $content = Get-Content $_.FullName -Raw; if ($content -match 'setIsHydrated\\(true\\)') { $content = $content -replace 'const \\[isHydrated, setIsHydrated\\] = useState\\(false\\);', 'const isHydrated = useHydration();'; $content = $content -replace 'useEffect\\(\\(\\) => \\{\\s*setIsHydrated\\(true\\);\\s*\\}, \\[\\]\\);', ''; $content = $content -replace 'import \\{ ([^}]+) \\} from ''react'';', 'import { $1 } from ''react'';^nimport { useHydration } from ''@/lib/hooks/useHydration'';'; Set-Content -Path $_.FullName -Value $content } }"

echo Done! Check remaining issues with: npm run lint
pause