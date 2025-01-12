import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// Business logic for registering a user in the database
export const registerUser = async (name: string, surName: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  // Use Sequelize to save the new user
  const user = await User.create({
    name,
    surName,
    password: hashedPassword,
  });

  return user;
};

// Business logic for user login and token generation
export const loginUser = async (name: string, password: string) => {

  const user = await User.findOne({ where: { name } });

  if (!user) {
    throw new Error('Incorrect username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Incorrect username or password');
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user.id, name: user.name },
    process.env.JWT_SECRET || 'defaultSecretKey', 
    { expiresIn: '1h' }
  );

  return { token };
};
