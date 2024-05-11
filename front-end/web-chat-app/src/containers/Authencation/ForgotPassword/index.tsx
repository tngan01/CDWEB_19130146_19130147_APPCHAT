import "./index.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import logo from "assets/images/logo.png";

import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card } from "antd";

const Register = (): JSX.Element => {
  const [form] = Form.useForm();

  //   const history = useHistory();

  const onHandleLogin = (values: any): void => {
    const data = {
      username: values.username.toLowerCase(),
      password: values.password,
    };
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleForgotPassword = (e: any) => {
    e.preventDefault();
  };
  const onFinish = (values: any) => {
  };
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
          <span className="text-gray-700 font-semibold text-2xl">Forgot Password</span>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
             Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default Register;
