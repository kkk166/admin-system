import React from 'react';
import { Row, Col, Card, Statistic, Typography, Progress } from 'antd';
import { 
  ArrowUpOutlined, 
  UserOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const DashboardPage = () => {
  const stats = [
    { title: '总用户数', value: 12890, icon: <UserOutlined />, color: '#1890ff', progress: 78 },
    { title: '订单数量', value: 2456, icon: <ShoppingCartOutlined />, color: '#52c41a', progress: 65 },
    { title: '总收入', value: '¥189,245', icon: <DollarOutlined />, color: '#faad14', progress: 48 },
    { title: '完成率', value: '82%', icon: <BarChartOutlined />, color: '#f5222d', progress: 82 }
  ];

  return (
    <div>
      <Title level={4} style={{ marginBottom: 24 }}>系统概览</Title>
      
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} md={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
              <Progress 
                percent={stat.progress} 
                showInfo={false} 
                strokeColor={stat.color}
                style={{ marginTop: 16 }}
              />
              <div style={{ marginTop: 8, color: '#8c8c8c', fontSize: 12 }}>
                <ArrowUpOutlined style={{ color: '#52c41a' }} /> 12% 较上月
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <Card title="最近活动" style={{ height: '100%' }}>
            <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src="https://weavefox.alipay.com/api/bolt/unsplash_image?keyword=analytics_dashboard&width=600&height=300&random=analytics_dashboard_600_300" 
                alt="数据图表" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="系统状态" style={{ height: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { name: 'CPU使用率', value: 45, color: '#1890ff' },
                { name: '内存使用', value: 68, color: '#52c41a' },
                { name: '磁盘空间', value: 32, color: '#faad14' },
                { name: '网络负载', value: 24, color: '#f5222d' }
              ].map((item, index) => (
                <div key={index}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </div>
                  <Progress percent={item.value} showInfo={false} strokeColor={item.color} />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
