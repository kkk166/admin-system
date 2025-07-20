import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    setLoading(true);
    if (values.username === 'admin' && values.password === 'admin123') {
      setTimeout(() => {
        onLogin();
        message.success('登录成功！');
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
        message.error('用户名或密码错误');
      }, 1000);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ marginBottom: 0 }}>系统登录</Title>
          <p style={{ color: '#8c8c8c' }}>请输入您的账号和密码</p>
        </div>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large" 
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', color: '#8c8c8c' }}>
            <p>默认账号: admin 密码: admin123</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
