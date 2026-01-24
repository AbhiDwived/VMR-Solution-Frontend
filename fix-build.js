const fs = require('fs');
const path = require('path');

// Files with critical errors that need fixing
const fixes = [
  // Remove unused variables and fix escape characters
  {
    file: 'src/app/(auth)/forgot-password/page.tsx',
    replacements: [
      { from: 'const router = useRouter();', to: '// const router = useRouter();' },
      { from: '} catch (error: any) {', to: '} catch (error) {' }
    ]
  },
  {
    file: 'src/app/(auth)/register/page.tsx', 
    replacements: [
      { from: 'const result = await registerMutation(formData).unwrap();', to: 'await registerMutation(formData).unwrap();' },
      { from: '} catch (error: any) {', to: '} catch (error) {' }
    ]
  },
  {
    file: 'src/app/(auth)/reset-password/page.tsx',
    replacements: [
      { from: 'const router = useRouter();', to: '// const router = useRouter();' },
      { from: '} catch (error: any) {', to: '} catch (error) {' }
    ]
  }
];

// Apply fixes
fixes.forEach(({ file, replacements }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
  }
});

console.log('Build fixes applied!');