import "./index.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import logo from "assets/images/logo.png";

import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card } from "antd";
import { registerRequest } from 'providers/AuthProvider/slice';
import { useAppDispatch, useAppSelector } from 'store';
import { log } from "console";
import { push } from "connected-react-router";

const Register = (): JSX.Element => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleRegister = (values: any): void => {
    const data = {
      email: values.email,
      password: values.password,
    };    
    dispatch(registerRequest(data));

  };

  const routerToLogin = (values: any): void => {
    history.push('/login');
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div
      className="login w-full flex justify-center items-center h-full"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Card bordered={false} style={{ width: 400 }} className="card-login">
        <div className="login-logo-ant">
          <img src={logo} width={150} />
        </div>
        <div className="login-title">
          <span className="text-gray-700 font-semibold text-2xl">Register</span>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleRegister}
        >
          {/* <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              size="large"
            />
          </Form.Item> */}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          {/* <Form.Item
            name="password2"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password again"
              size="large"
            />
          </Form.Item> */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
             Register
            </Button>
            Or <a href="" onClick={routerToLogin}> if you have account, Login now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
