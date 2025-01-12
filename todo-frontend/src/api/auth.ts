import axios from 'axios';
import { notification } from 'antd';

interface UserData {
  id: number;
  name: string;
  surName: string;
}

export const fetchUserData = async (): Promise<UserData | null> => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    notification.error({
      message: 'Authentication failed',
      description: 'You must log in first.',
    });
    return null;
  }

  try {
    const response = await axios.get<UserData>('http://localhost:5000/protected', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data;
  } catch (error: any) {
    notification.error({
      message: 'Error fetching data',
      description: error.response?.data?.message || 'Something went wrong',
    });
    throw error;
  }
};
