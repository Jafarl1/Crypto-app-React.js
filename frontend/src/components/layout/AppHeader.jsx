import { useState, useEffect } from "react";
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/CryptoContext";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppHeader() {
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);

    return () => removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value) => {
    console.log(value);
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "25%",
        }}
        value="Press / to open"
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        open={select}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={() => setDrawer(true)}>
        Add asset text
      </Button>

      <Modal title="Basic Modal" open={modal} onOk={handleOk}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
