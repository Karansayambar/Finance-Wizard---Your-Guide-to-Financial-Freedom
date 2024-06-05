import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React from "react";

function AddExpenseModal({
  isExpenseModalVisible,
  handleExpenseCancle,
  onFinish,
}) {
  const [form] = Form.useForm();

  return (
    <Modal
      style={{ fontWeight: "500" }}
      title="Add Expense"
      visible={isExpenseModalVisible}
      onCancel={handleExpenseCancle}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input name of the transition" },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, input: "please input a expense amount!" }]}
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
          rules={[{ required: true, input: "please select the tag" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="education">education</Select.Option>
            <Select.Option value="food">food</Select.Option>
            <Select.Option value="rent">rent</Select.Option>
            <Select.Option value="travel">travel</Select.Option>
            <Select.Option value="shopping">shopping</Select.Option>
            <Select.Option value="clothing">clothing</Select.Option>
            <Select.Option value="clothing">utilities</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Add Expense</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
