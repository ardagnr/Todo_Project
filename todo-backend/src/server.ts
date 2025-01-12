import express from 'express';
import authRoutes from './routes/userRoutes';
import sequelize from './db';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todoRoutes';
import AuthMiddleware from './middleware/auth';

dotenv.config();

const app = express();

// CORS Middleware
app.use(cors());

// JSON Middleware
app.use(express.json());

app.use("/api/todos", (req, res, next) => {
  AuthMiddleware.authenticate(req, res, next);  
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
