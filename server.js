import app from './src/app.js';
import { config } from './src/config/index.js';

const PORT = config.app.port;

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log('❌ Server failed to start:', error);
  }
}

startServer();
