import  { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTodo = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/todos', values, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      message.success('Todo başarıyla eklendi!');
      navigate('/todos'); 
    } catch (error) {
      message.error('Todo eklenirken hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Yeni Todo Ekle</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Başlık" name="title" rules={[{ required: true, message: 'Başlık gereklidir!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Teslim Tarihi" name="dueDate" rules={[{ required: true, message: 'Tarih gereklidir!' }]}>
          <Input type="date" />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Todo Ekle
        </Button>
      </Form>
    </div>
  );
};

export default AddTodo;
