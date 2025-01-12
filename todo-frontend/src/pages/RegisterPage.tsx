import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', values);
      message.success('Kullanıcı başarıyla kaydedildi!');
      navigate('/login'); // Kayıt olduktan sonra login sayfasına yönlendirme
    } catch (error: any) {
      message.error('Kayıt sırasında bir hata oluştu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Kayıt Ol</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Kullanıcı Adı" name="name" rules={[{ required: true, message: 'Kullanıcı adı gereklidir!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Soyad" name="surName" rules={[{ required: true, message: 'Soyad gereklidir!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Şifre gereklidir!' }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Kayıt Ol
        </Button>
      </Form>
    </div>
  );
};

export default Register;
