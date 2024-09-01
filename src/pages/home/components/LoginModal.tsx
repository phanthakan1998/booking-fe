// src/components/LoginModal.tsx

import React from "react";
import { Modal, Form, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
};

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (data: LoginFormValues) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onLogin,
}) => {
  const { control, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    onLogin(data);
    onClose();
  };

  return (
    <Modal
      title="Login"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input {...field} type="email" placeholder="Enter your email" />
            )}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter your password" />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
