import React from "react";
import Transaction from "../../assets/Transaction.svg";

function NoTransaction() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={Transaction} style={{ width: "400px", margin: "4rem" }} />
      <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
        You have No Transaction Currently
      </p>
    </div>
  );
}

export default NoTransaction;
