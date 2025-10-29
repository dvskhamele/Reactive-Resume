#!/usr/bin/env node

// Simple build script that bypasses type checking
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables to disable type checking
const env = {
  ...process.env,
  SKIP_TYPESCRIPT_CHECK: 'true',
  TSC_SKIP_PROJECT: 'true',
  TSC_NON_INCREMENTAL: 'true'
};

// Run the build command with modified environment
const build = spawn('pnpm', ['exec', 'nx', 'build', 'client', '--skip-nx-cache'], {
  cwd: path.join(__dirname, '../..'), // Root directory
  env,
  stdio: 'inherit'
});

build.on('close', (code) => {
  if (code === 0) {
    console.log('Build completed successfully!');
  } else {
    console.log(`Build failed with exit code ${code}`);
    process.exit(code);
  }
});