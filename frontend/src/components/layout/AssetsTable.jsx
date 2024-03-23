import { Table } from "antd";
import { useCrypto } from "../../context/CryptoContext";

const tableStyles = {
  width: "100%",
  maxHeight: "100%",
  overflow: "auto",
};

function AssetsTable() {
  const { assets } = useCrypto();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price, $",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    price: asset.price,
    amount: asset.amount,
  }));

  return (
    <section style={tableStyles}>
      <Table pagination={false} columns={columns} dataSource={data} />
    </section>
  );
}

export default AssetsTable;
