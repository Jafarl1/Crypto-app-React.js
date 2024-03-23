import { Layout, Spin } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import AppHeader from "./AppHeader";
import AppSider from "./AppSider";
import AppContent from "./AppContent";

const layoutStyles = {
  width: "100%",
  height: "100vh",
};

function AppLayout() {
  const { loading } = useCrypto();

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout style={layoutStyles}>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
