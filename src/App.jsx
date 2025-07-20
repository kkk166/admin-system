import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Spin } from 'antd';
import { 
  DashboardOutlined, 
  SettingOutlined, 
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import SettingsPage from './pages/Settings';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isAuthenticated && (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" style={{ 
            height: 64, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold'
          }}>
            {collapsed ? 'AD' : 'Admin System'}
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={[location.pathname.split('/')[1] || 'dashboard']}
            mode="inline"
            items={[
              {
                key: 'dashboard',
                icon: <DashboardOutlined />,
                label: '仪表板',
                onClick: () => window.location.hash = '#/'
              },
              {
                key: 'settings',
                icon: <SettingOutlined />,
                label: '系统设置',
                onClick: () => window.location.hash = '#/settings'
              },
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: handleLogout
              }
            ]}
          />
        </Sider>
      )}
      <Layout>
        {isAuthenticated && (
          <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <div style={{ marginRight: 24, display: 'flex', alignItems: 'center' }}>
              <UserOutlined style={{ marginRight: 8 }} />
              <span>管理员</span>
            </div>
          </Header>
        )}
        <Content style={{ margin: '16px' }}>
          <div style={{ 
            padding: 24, 
            minHeight: 360, 
            background: colorBgContainer,
            borderRadius: 8
          }}>
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
