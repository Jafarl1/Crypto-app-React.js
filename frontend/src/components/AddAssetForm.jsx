import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Input,
  Checkbox,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useState, useRef } from "react";
import { useCrypto } from "../context/CryptoContext";
import CoinInfo from "./CoinInfo";

function AddAssetForm({ onClose }) {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const assetRef = useRef();
  const { crypto, assets, addNewAsset } = useCrypto();

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not valid number.",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setIsSubmitted(true);
    addNewAsset(newAsset);
  };

  const handleAmountChange = (value) => {
    const price = form.getFieldValue("price");

    form.setFieldsValue({
      total: value && price ? (value * price).toFixed(2) : "",
    });
  };

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue("amount");
    if (value && amount) {
      form.setFieldsValue({
        total: value && amount ? (value * amount).toFixed(2) : "",
      });
    }
  };

  if (isSubmitted) {
    return (
      <Result
        status="success"
        title="New asset added successfully!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        placeholder="Select coin"
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
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
    );
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          style={{ width: "100%" }}
          onChange={handleAmountChange}
          autoFocus
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          placeholder="Enter coin price"
          style={{ width: "100%" }}
          onChange={handlePriceChange}
        />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
