import React from "react";
import { Layout } from "antd";

const { Header, Content } = Layout;

function MenuComponent({ children }: { children?: React.ReactNode }) {
  return (
    <Layout>
      <Header className="top-0 z-10 w-full flex items-center justify-between bg-blue-900">
        <div className="text-white text-2xl font-bold">Ey booking</div>

        <div className="flex items-center space-x-4">
          <div className="flex align-middle justify-center cursor-pointer"></div>
        </div>
      </Header>
      <Content className="p-10">
        <div className="p-6 h-screen rounded-lg overflow-auto">{children}</div>
      </Content>
    </Layout>
  );
}

export default MenuComponent;
