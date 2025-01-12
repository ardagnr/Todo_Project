import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', values);
      localStorage.setItem('token', data.token); // Token'ı local storage'da saklıyoruz
      message.success('Giriş başarılı!');
      navigate('/todos'); // Başarılı giriş sonrası todos sayfasına yönlendirme
    } catch (error: any) {
      message.error('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Giriş Yap</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item label="Kullanıcı Adı" name="name" rules={[{ required: true, message: 'Kullanıcı adı gereklidir!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Şifre gereklidir!' }]}>
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Giriş Yap
        </Button>
        <Button 
          type="link" 
          onClick={() => navigate('/register')} 
          block 
          style={{ marginTop: '10px' }}
        >
          Kayıt Ol
        </Button>
      </Form>
    </div>
  );
};

export default Login;
