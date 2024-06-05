// import { Radio, Select, Table } from "antd";
// import { Option } from "antd/es/mentions";
// import React, { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import "./style.css";
// import { parse, unparse } from "papaparse";
// import { toast } from "react-toastify";

// function TransactionsTable({ transactions, addTransaction, fetchTransation }) {
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Tag",
//       dataIndex: "tag",
//       key: "tag",
//     },
//     {
//       title: "Type",
//       dataIndex: "type",
//       key: "type",
//     },
//   ];

//   let searchFilter = transactions.filter(
//     (item) =>
//       item.name?.toLowerCase().includes(search.toLowerCase()) &&
//       item.type?.includes(typeFilter)
//   );

//   let sortedResult = searchFilter.sort((a, b) => {
//     if (sortKey === "date") {
//       return new Date(a.date) - new Date(b.date);
//     } else if (sortKey === "amount") {
//       return a.amount - b.amount;
//     } else return 0;
//   });

//   function exportToCsv() {
//     var csv = unparse({
//       fields: ["name", "tag", "date", "type", "amount"],
//       data: transactions,
//     });
//     var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     var csvURL = window.URL.createObjectURL(data);
//     var tempLink = document.createElement("a");
//     tempLink.href = csvURL;
//     tempLink.download = "transactions.csv";
//     document.body.appendChild(tempLink);
//     tempLink.click();
//     document.body.removeChild(tempLink);
//   }

//   function importFromCsv(event) {
//     event.preventDefault();
//     try {
//       parse(event.target.files[0], {
//         header: true,
//         complete: async function (results) {
//           for (const transaction of results.data) {
//             const newTransaction = {
//               ...transaction,
//               amount: parseInt(transaction.amount),
//             };
//             await addTransaction(newTransaction, true);
//           }
//         },
//       });
//       toast.success("All Transcation are Added");
//       fetchTransation();
//       event.target.value = null;
//     } catch (e) {
//       toast.error(e.message);
//     }
//   }
//   return (
//     <div style={{ width: "94vw", padding: "0rem 2rem" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           gap: "1rem",
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <div className="input-flex">
//           <AiOutlineSearch />
//           <input
//             value={search}
//             style={{ borderRadius: "10px", width: "100%" }}
//             placeholder="Search Item By Name"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         <Select
//           className="select-input"
//           onChange={(value) => setTypeFilter(value)}
//           value={typeFilter}
//           placeholder="filter"
//           allowClear
//         >
//           <Option value="">All</Option>
//           <Option value="income"> Income </Option>
//           <Option value="expense"> Expense </Option>
//         </Select>
//       </div>
//       <div className="my-table">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             width: "100%",
//             marginBottom: "1rem",
//           }}
//         >
//           <h2>My Transactions</h2>
//           <Radio.Group
//             className="input-radio"
//             onChange={(e) => setSortKey(e.target.value)}
//           >
//             <Radio.Button value={""}>No Sort</Radio.Button>
//             <Radio.Button value={"date"}>Sort By Date</Radio.Button>
//             <Radio.Button value={"amount"}>Sort By Amount</Radio.Button>
//           </Radio.Group>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "1rem",
//               width: "400px",
//             }}
//           >
//             <button className="btn" onClick={exportToCsv}>
//               {" "}
//               Export To CSV
//             </button>
//             <label htmlFor="file-csv" className="btn btn-blue">
//               {" "}
//               Import From CSV
//             </label>
//             <input
//               onChange={importFromCsv}
//               id="file-csv"
//               type="file"
//               accept=".csv"
//               required
//               style={{ display: "none" }}
//             />
//           </div>
//         </div>
//         <Table dataSource={searchFilter} columns={columns} />
//       </div>
//     </div>
//   );
// }

// export default TransactionsTable;
import { Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.css";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

function TransactionsTable({ transactions, addTransaction, fetchTransation }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  const searchFilter = transactions.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) &&
      item.type?.includes(typeFilter)
  );

  const sortedResult = searchFilter.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else return 0;
  });

  function exportToCsv() {
    const csv = unparse({
      fields: ["name", "tag", "date", "type", "amount"],
      data: transactions,
    });
    const data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = window.URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }

  function importFromCsv(event) {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) {
      toast.error("No file selected");
      return;
    }

    parse(file, {
      header: true,
      complete: async function (results) {
        try {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
          toast.success("All transactions are added");
          fetchTransation();
        } catch (e) {
          toast.error(e.message);
        }
      },
      error: function (error) {
        toast.error(error.message);
      },
    });
  }

  return (
    <div style={{ width: "94vw", padding: "0rem 2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          <AiOutlineSearch />
          <input
            value={search}
            style={{ borderRadius: "10px", width: "100%" }}
            placeholder="Search Item By Name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2>My Transactions</h2>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="amount">Sort By Amount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "400px",
            }}
          >
            <button className="btn" onClick={exportToCsv}>
              Export To CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue">
              Import From CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            />
          </div>
        </div>
        <Table dataSource={sortedResult} columns={columns} />
      </div>
    </div>
  );
}

export default TransactionsTable;
