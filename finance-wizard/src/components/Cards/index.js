import React from "react";
import { Row, Card } from "antd";
import Button from "../Button";
import "./styles.css";
function Cards({
  income,
  expense,
  totalBalance,
  showExpenseModal,
  showIncomeModal,
}) {
  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card" title="Current Balance">
          <p>₹{totalBalance}</p>
          <Button text="Reset Button" blue={true} />
        </Card>
        <Card bordered={true} className="my-card" title="Total Income">
          <p>₹{income}</p>
          <Button text="Add Income" blue={true} onclick={showIncomeModal} />
        </Card>
        <Card bordered={true} className="my-card" title="Total Expenses">
          <p>₹{expense}</p>
          <Button text="Add Expensess" blue={true} onclick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
}
export default Cards;
