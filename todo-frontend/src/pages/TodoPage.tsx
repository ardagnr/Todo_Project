import React, { useEffect, useState } from 'react';
import { Layout, Menu, Table, Button, Space, Tag, Row, Col, Dropdown, Popconfirm, Checkbox, message, Modal, Form, Input, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getTodos, deleteTodo, updateTodo, getCompletedTodos } from '../Services/todoServices';
import { useNavigate } from 'react-router-dom';

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

const { Sider, Content } = Layout;

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed'>('all');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login'); 
  }

  // Todo'ları al
  const fetchTodos = async () => {
    try {
      let response;
      if (filter === 'all') {
        response = await getTodos(token!);
      } else {
        response = await getCompletedTodos(token!);
      }

      // Eğer bir tarih seçildiyse, o tarihe göre filtrele
      if (selectedDate) {
        response.data = response.data.filter((todo: Todo) =>
          dayjs(todo.dueDate).isSame(selectedDate, 'day')
        );
      }

      setTodos(response.data);
    } catch (error) {
      message.error('Todo listesi alınırken bir hata oluştu!');
    }
  };

  // Silme işlemi
  const handleDelete = async (id: number) => {
    try {
      if (token) {
        await deleteTodo(id, token);
        message.success('Todo başarıyla silindi!');
        fetchTodos(); 
      }
    } catch (error) {
      message.error('Todo silinirken hata oluştu!');
    }
  };

  const handleCheckboxChange = async (id: number, completed: boolean) => {
    try {
      if (token) {
        const todoToUpdate = todos.find((todo) => todo.id === id);
        if (todoToUpdate) {
          await updateTodo(id, todoToUpdate.title, completed, todoToUpdate.dueDate, token);
          message.success('Todo durumu başarıyla güncellendi!');
          fetchTodos();
        }
      }
    } catch (error) {
      message.error('Todo durumu güncellenirken hata oluştu!');
    }
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    form.setFieldsValue({
      title: todo.title,
      dueDate: dayjs(todo.dueDate).format('YYYY-MM-DD'),
      completed: todo.completed,
    });
    setIsModalOpen(true);
  };

  const handleEditSubmit = async (values: { title: string; dueDate: string; completed: boolean }) => {
    if (!editingTodo || !token) return;

    try {
      await updateTodo(editingTodo.id, values.title, values.completed, values.dueDate, token);
      message.success('Todo başarıyla güncellendi!');
      setIsModalOpen(false); 
      setEditingTodo(null); 
      fetchTodos(); 
    } catch (error) {
      message.error('Todo güncellenirken bir hata oluştu!');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
    form.resetFields();
  };

  useEffect(() => {
    fetchTodos();
  }, [filter, selectedDate]);

  const menu = (
    <Menu
      onClick={({ key }) => setFilter(key as 'all' | 'completed')}
      items={[
        { key: 'all', label: 'Tüm Todo\'lar' },
        { key: 'completed', label: 'Tamamlanmış Todo\'lar' },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1" onClick={() => navigate('/todos')}>
            Tüm Todo'lar
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/add-todo')}>
            Todo Ekle
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {/* Filtreleme Alanı */}
          <Space style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Dropdown Filtre */}
            <Dropdown overlay={menu}>
              <Button>
                {filter === 'all' ? 'Tüm Todo\'lar' : 'Tamamlanmış Todo\'lar'} <DownOutlined />
              </Button>
            </Dropdown>

            {/* DatePicker'ı, Dropdown Filtrelemesinin Altına Yerleştiriyoruz */}
            <DatePicker
              onChange={(date) => setSelectedDate(date ? dayjs(date) : null)}
              format="YYYY-MM-DD"
              style={{ width: 200 }}
              placeholder="Tarihe Göre Filtrele"
            />
          </Space>

          <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
            <Col span={12}>
              <Tag color="blue" style={{ fontSize: '16px' }}>{todos.length} Toplam</Tag>
            </Col>
            <Col span={12}>
              <Tag color="green" style={{ fontSize: '16px' }}>
                {todos.filter((todo) => todo.completed).length} Tamamlanan
              </Tag>
            </Col>
          </Row>

          <Table
            dataSource={todos}
            columns={[
              { title: 'Başlık', dataIndex: 'title', key: 'title' },
              {
                title: 'Son Tarih',
                dataIndex: 'dueDate',
                key: 'dueDate',
                render: (dueDate: string) => (
                  <Tag color="blue">{dayjs(dueDate).format('DD MMMM YYYY')}</Tag>
                ),
              },
              {
                title: 'Tamamlandı',
                dataIndex: 'completed',
                key: 'completed',
                render: (completed: boolean, record: Todo) => (
                  <Checkbox
                    checked={completed}
                    onChange={(e) => handleCheckboxChange(record.id, e.target.checked)}
                  />
                ),
              },
              {
                title: 'Aksiyon',
                key: 'action',
                render: (record: Todo) => (
                  <Space size="middle">
                    <Button onClick={() => openEditModal(record)}>Düzenle</Button>
                    <Popconfirm
                      title="Bu todo'yu silmek istediğinizden emin misiniz?"
                      onConfirm={() => handleDelete(record.id)}
                      okText="Evet"
                      cancelText="Hayır"
                    >
                      <Button danger>Sil</Button>
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
            rowKey="id"
          />

          <Modal
            title="Todo Düzenle"
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
              <Form.Item
                label="Başlık"
                name="title"
                rules={[{ required: true, message: 'Başlık zorunludur!' }]} >
                <Input />
              </Form.Item>
              <Form.Item
                label="Son Tarih"
                name="dueDate"
                rules={[{ required: true, message: 'Son tarih zorunludur!' }]} >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                label="Tamamlandı"
                name="completed"
                valuePropName="checked">
                <Checkbox />
              </Form.Item>
              <Button type="primary" htmlType="submit" block>
                Değişiklikleri Kaydet
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TodoPage;
