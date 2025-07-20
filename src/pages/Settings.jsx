import React, { useState } from 'react';
import { Tabs, Form, Input, Button, Switch, Select, message } from 'antd';
import { 
  UserOutlined, 
  SafetyOutlined,
  CloudOutlined
} from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

const SettingsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('设置已保存');
    }, 1000);
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><UserOutlined /> 账户设置</span>} key="1">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="admin" />
            </Form.Item>
            
            <Form.Item
              label="邮箱"
              name="email"
              rules={[{ type: 'email', message: '请输入有效的邮箱' }]}
            >
              <Input placeholder="admin@example.com" />
            </Form.Item>
            
            <Form.Item
              label="通知设置"
              name="notifications"
              valuePropName="checked"
            >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                保存设置
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab={<span><SafetyOutlined /> 安全设置</span>} key="2">
          <Form
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="当前密码"
              name="currentPassword"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password />
            </Form.Item>
            
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[{ required: true, message: '请输入新密码' }]}
            >
              <Input.Password />
            </Form.Item>
            
            <Form.Item
              label="确认新密码"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary">更新密码</Button>
            </Form.Item>
          </Form>
        </TabPane>
        
        <TabPane tab={<span><CloudOutlined /> 系统配置</span>} key="3">
          <Form
            layout="vertical"
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="系统语言"
              name="language"
              initialValue="zh-CN"
            >
              <Select>
                <Option value="zh-CN">简体中文</Option>
                <Option value="en-US">English</Option>
                <Option value="ja-JP">日本語</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label="时区设置"
              name="timezone"
              initialValue="Asia/Shanghai"
            >
              <Select>
                <Option value="Asia/Shanghai">上海 (UTC+8)</Option>
                <Option value="America/New_York">纽约 (UTC-5)</Option>
                <Option value="Europe/London">伦敦 (UTC+0)</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              label="数据备份"
              name="backup"
              valuePropName="checked"
            >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary">保存配置</Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
