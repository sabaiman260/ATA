const { execSync } = require('child_process');
const os = require('os');

const PORT = process.env.PORT || 5000;

function ensurePortFree(port) {
  try {
    if (os.platform() === 'win32') {
      // Use netstat to find processes listening on the port
      const result = execSync(`netstat -ano | findstr :${port}`).toString();
      const lines = result.split('\n').map(line => line.trim()).filter(Boolean);
      const pids = new Set();
      for (const line of lines) {
        const parts = line.split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0') pids.add(pid);
      }
      for (const pid of pids) {
        try {
          console.log(`Killing process ${pid} on port ${port}`);
          execSync(`taskkill /PID ${pid} /F`);
        } catch (err) {
          // ignore errors
        }
      }
    } else {
      // macOS / Linux
      const result = execSync(`lsof -i :${port} -t || true`).toString();
      const pids = result.split('\n').map(p => p.trim()).filter(Boolean);
      for (const pid of pids) {
        console.log(`Killing process ${pid} on port ${port}`);
        try {
          process.kill(Number(pid), 'SIGKILL');
        } catch (err) {
          // ignore
        }
      }
    }
  } catch (err) {
    // ignore
  }
}

ensurePortFree(PORT);
console.log(`Port ${PORT} cleared (if any processes were using it).`);
