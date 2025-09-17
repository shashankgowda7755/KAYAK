#!/usr/bin/env node

// Emergency script to fix Vercel authentication issue
// This script will redeploy your site with public access

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚨 FIXING VERCEL AUTHENTICATION ISSUE...');
console.log('');

// Check if vercel.json exists and is properly configured
const vercelConfigPath = path.join(__dirname, 'vercel.json');
if (fs.existsSync(vercelConfigPath)) {
  const config = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  if (config.public !== true) {
    console.log('❌ vercel.json missing public: true');
    config.public = true;
    fs.writeFileSync(vercelConfigPath, JSON.stringify(config, null, 2));
    console.log('✅ Fixed vercel.json configuration');
  } else {
    console.log('✅ vercel.json already configured correctly');
  }
}

console.log('');
console.log('🔧 CRITICAL STEPS YOU MUST DO MANUALLY:');
console.log('');
console.log('1. Go to https://vercel.com/dashboard');
console.log('2. Select your project: kayak-3zfmnpgfq-shashankgowda7755-5023s-projects');
console.log('3. Go to Settings → Security (or General)');
console.log('4. DISABLE these if enabled:');
console.log('   - Password Protection');
console.log('   - Vercel Authentication');
console.log('   - Team Access Only');
console.log('   - Preview Protection');
console.log('5. Click SAVE');
console.log('6. Go to Deployments tab');
console.log('7. Click REDEPLOY on latest deployment');
console.log('');
console.log('🎯 After these steps, your website will be publicly accessible!');
console.log('');

// Try to install vercel CLI and redeploy if available
try {
  console.log('📦 Checking Vercel CLI...');
  execSync('vercel --version', { stdio: 'pipe' });
  console.log('✅ Vercel CLI found');
  
  console.log('🚀 Attempting to redeploy...');
  execSync('vercel --prod --yes', { stdio: 'inherit' });
  console.log('✅ Redeployment initiated!');
} catch (error) {
  console.log('⚠️  Vercel CLI not found or deployment failed');
  console.log('   Please follow the manual steps above');
}

console.log('');
console.log('🔗 Test your site in incognito mode after making changes!');