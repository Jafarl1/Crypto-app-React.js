import { Layout, Card, Statistic, List, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize } from "../../utils";
import { useCrypto } from "../../context/CryptoContext";

const siderStyle = {
  padding: "1.5rem",
  height: "calc(100vh - 60px)",
  overflow: "auto",
};

function AppSider() {
  const { loading, assets } = useCrypto();

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card key={asset.id} bordered={false} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "#cf1322",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            bordered
            // loading
            size="small"
            dataSource={[
              {
                title: "Total Profit",
                value: `${asset.totalProfit.toFixed(2)}$`,
                withTag: true,
              },
              { title: "Asset Amount", value: asset.amount },
              {
                title: "Difference",
                value: `${asset.growPercent.toFixed(2)}%`,
                withTag: true,
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}:</span>
                {item.withTag ? (
                  <Tag color={asset.grow ? "green" : "red"}>{item.value}</Tag>
                ) : (
                  <Tag>{item.value}</Tag>
                )}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
