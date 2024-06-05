import { Line, Pie } from "@ant-design/charts";
import React from "react";

function Chart({ sortedTransaction }) {
  const data = sortedTransaction.map((item) => ({
    date: item.date,
    amount: item.amount,
  }));

  const spendingData = sortedTransaction
    .filter((transaction) => transaction.type === "expense")
    .map((transaction) => ({
      tag: transaction.tag,
      amount: transaction.amount,
    }));

  let newSpending = [
    { tag: "food", amount: 0 },
    { tag: "education", amount: 0 },
    { tag: "office", amount: 0 },
    { tag: "rent", amount: 0 },
    { tag: "travel", amount: 0 },
    { tag: "shopping", amount: 0 },
    { tag: "utilities", amount: 0 },
  ];

  spendingData.forEach((element) => {
    if (element.tag === "food") {
      newSpending[0].amount += element.amount;
    } else if (element.tag === "travel") {
      newSpending[1].amount += element.amount;
    } else if (element.tag === "clothing") {
      newSpending[2].amount += element.amount;
    } else if (element.tag === "shopping") {
      newSpending[3].amount += element.amount;
    } else if (element.tag === "rent") {
      newSpending[4].amount += element.amount;
    } else if (element.tag === "utilities") {
      newSpending[5].amount += element.amount;
    } else {
      newSpending[6].amount += element.amount;
    }
  });

  const config = {
    width: 950,
    data: data,
    xField: "date",
    yField: "amount",
    smooth: true, // for smooth curves
    lineStyle: {
      stroke: "red", // color of the line
      lineWidth: 2, // width of the line
    },
    point: {
      size: 5, // size of the points
      shape: "circle", // shape of the points
      style: {
        fill: "white", // fill color of the points
        stroke: "red", // stroke color of the points
        lineWidth: 2,
      },
    },
    xAxis: {
      title: {
        text: "Date",
        style: { fill: "#888", fontSize: 14 },
      },
      label: {
        style: { fill: "#555", fontSize: 12 },
      },
    },
    yAxis: {
      title: {
        text: "Amount",
        style: { fill: "#888", fontSize: 14 },
      },
      label: {
        style: { fill: "#555", fontSize: 12 },
      },
    },
    tooltip: {
      title: "Transaction Details",
      formatter: (datum) => ({ name: "Amount", value: datum.amount }),
    },
    legend: {
      position: "top-left",
      text: {
        style: { fill: "#888", fontSize: 12 },
      },
    },
  };

  const spendingConfig = {
    width: 350,
    data: newSpending,
    angleField: "amount",
    colorField: "tag",
  };
  return (
    <div className="charts-wrapper">
      <div>
        <h2>Your Transactions</h2>
        <Line {...config} style={{ color: "red" }} />
      </div>
      <div>
        <h2>Your Spendings</h2>
        <Pie {...spendingConfig} />
      </div>
    </div>
  );
}

export default Chart;
