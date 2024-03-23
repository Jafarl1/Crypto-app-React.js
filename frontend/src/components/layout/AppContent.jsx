import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const contentStyle = {
  textAlign: "center",
  height: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

const sectionStyle = {
  width: "100%",
  height: "calc(100vh - 140px)",
  display: "flex",
  alignItems: "center",
};

function AppContent() {
  const { assets, crypto } = useCrypto();
  console.log(assets, crypto);

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={2} style={{ height: "40px", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => {
            const coin = crypto.find((c) => c.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <section style={sectionStyle}>
        <PortfolioChart />
        <AssetsTable />
      </section>
    </Layout.Content>
  );
}

export default AppContent;
