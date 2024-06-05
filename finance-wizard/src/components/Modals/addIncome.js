import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import React from "react";

function AddIncomeModal({
  isIncomeModalVisible,
  handleIncomeCancle,
  onFinish,
}) {
  const [form] = Form.useForm();
  return (
    <Modal
      style={{ fontWeight: "500" }}
      title="Add Income"
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancle}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "income"); // Pass 'income' as type
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input name of transition" },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "please input amount" }]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "please input date" }]}
        >
          <DatePicker
            type="date"
            format={"YYYY-MM-DD"}
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          label="tag"
          name="tag"
          rules={[{ required: true, message: "please input tag" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="amazon">amazon</Select.Option>
            <Select.Option value="freelance">freelance</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add Income</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncomeModal;
