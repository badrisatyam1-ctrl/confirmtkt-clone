import express, { type Application, type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/v1/auth.routes';
import busRoutes from './routes/v1/bus.routes';
import bookingRoutes from './routes/v1/booking.routes';
import trainRoutes from './routes/v1/train.routes';
import pnrRoutes from './routes/v1/pnr.routes';
import flightRoutes from './routes/v1/flight.routes';
import adminRoutes from './routes/admin.routes';

// App initialization
const app: Application = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Response compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bus', busRoutes);
app.use('/api/v1/train', trainRoutes);
app.use('/api/v1/flight', flightRoutes);
app.use('/api/v1/booking', bookingRoutes);
app.use('/api/v1/pnr', pnrRoutes);
app.use('/api/v1/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { error: err.message }),
  });
});

export default app;
