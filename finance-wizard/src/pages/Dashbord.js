import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import {
  // transaction,
  addDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../components/TranscationTable";
import NoTransaction from "../components/Modals/NoTransaction";
import Chart from "../components/Charts";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancle = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancle = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      name: values.name,
      amount: parseFloat(values.amount),
      date: values.date.format("YYYY-MM-DD"),
      tag: values.tag,
    };
    addTransaction(newTransaction);
  };
  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log("Document written with ID :", docRef.id);
      if (!many) toast.success("Transaction Added");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr); // Correct way to update state
    } catch (error) {
      console.error("Error Adding Document:", error);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    fetchTransation();
  }, [user]);

  async function fetchTransation() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      console.log(transactionsArray);
      toast.success("Transciation Fetched");
    }
    setLoading(false);
  }
  let sortedTransaction = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  return (
    <div>
      <header />
      {loading ? (
        <p>...Loadingd</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions.length !== 0 ? (
            <Chart sortedTransaction={sortedTransaction} />
          ) : (
            <NoTransaction />
          )}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancle={handleExpenseCancle}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancle={handleIncomeCancle}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransation={fetchTransation}
          />
        </>
      )}
    </div>
  );
}
export default Dashboard;
