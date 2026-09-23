const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('==============================================');
console.log('🌙 Luna-Mini Ultimate Launcher 🌙');
console.log('==============================================\n');

// 1. Install Dependencies if missing
const installDeps = (dir) => {
  if (!fs.existsSync(path.join(__dirname, dir, 'node_modules'))) {
    console.log(`[Setting up] Installing ${dir} dependencies... (this only happens once)`);
    execSync('npm install', { cwd: path.join(__dirname, dir), stdio: 'inherit' });
  } else {
    console.log(`[Ready] ${dir} is already installed.`);
  }
};

installDeps('backend');
installDeps('frontend');

// 2. Start Services
console.log('\n🚀 Starting all services in the background...\n');
console.log('⚠️  DO NOT CLOSE THIS WINDOW if you want to keep using Luna!');
console.log('   (To turn Luna off, simply close this window.)\n');

const startProcess = (name, command, args, cwd) => {
  const proc = spawn(command, args, { cwd: path.join(__dirname, cwd), shell: true });
  
  proc.stdout.on('data', (data) => {
    // Only print frontend browser ready message, hide the rest of the spam
    if (data.toString().includes('Local:')) {
      console.log(`\n✅ Luna is Live! Open your browser to: http://localhost:3000\n`);
    }
  });
  
  proc.on('error', (err) => console.log(`[${name} Error] ${err.message}`));
  return proc;
};

// Start Ollama
const ollama = spawn('ollama', ['serve'], { shell: true });

// Start Backend & Frontend
const backend = startProcess('Backend', 'npm', ['start'], 'backend');
const frontend = startProcess('Frontend', 'npm', ['start'], 'frontend');

// Cleanup when user closes this window
process.on('SIGINT', () => {
  console.log("\nShutting down Luna...");
  backend.kill();
  frontend.kill();
  ollama.kill();
  process.exit();
});
