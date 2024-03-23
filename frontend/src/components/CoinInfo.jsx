import { Flex, Typography } from "antd";

function CoinInfo({ coin }) {
  return (
    <Flex align="center">
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 40, margin: "0 10px" }}
      />
      <Typography.Title level={2} style={{ marginBottom: 8 }}>
        ({coin.symbol}) {coin.name}
      </Typography.Title>
    </Flex>
  );
}

export default CoinInfo;
