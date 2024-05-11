import "./index.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import logo from "assets/images/logo.png";
import { loginRequest } from 'providers/AuthProvider/slice';
import { useAppDispatch, useAppSelector } from 'store';

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card } from "antd";

const Login = (): JSX.Element => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

    const history = useHistory();

  const onHandleLogin = (values: any): void => {
    const data = {
      username: values.username,
      password: values.password,
    };
    dispatch(loginRequest(data));

  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
    history.push('/forgotPassword');
  };
  const onFinish = (values: any) => {
  };
  const routerToRegister =()=>{
    history.push('/register');

  }
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
          <span className="text-gray-700 font-semibold text-2xl">Login</span>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onHandleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="User name"
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="" onClick={handleForgotPassword}>
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="" onClick={routerToRegister}>register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Login;
