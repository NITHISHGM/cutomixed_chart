import React from "react";

import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Dashboard from "./Components/Dashboard";
export const ROOT_URL = "https://iimapidemo.azurewebsites.net/api/Inventory/";

const { Header, Sider, Content, Footer } = Layout;
const App = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider className="sider-cls" trigger={null} collapsed={true}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="header-cls">
          <h2 className="pl-4"> Dashboard</h2>
          <Button
            type="text"
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="content-cls"
          style={{
            minHeight: 500,
          }}
        >
          <Dashboard />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
