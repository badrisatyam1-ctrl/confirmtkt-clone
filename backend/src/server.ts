import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    // Database connection verification could go here
    
    // Redis connection verification could go here
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Rejection:', err.message);
  // Graceful shutdown could be implemented here
});

bootstrap();
