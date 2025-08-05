import { useExpense } from "../../context/ExpenseContext";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import ExpenseList from "../ExpenseList/ExpenseList";
import IncomeInput from "../IncomeInput/IncomeInput";
import "./AppContent.css";

const AppContent: React.FC = () => {
  const { income, balance } = useExpense();

  return (
    <>
      <h1>Expense Tracker</h1>
      {income === 0 ? (
        <IncomeInput />
      ) : (
        <>
          <div className="income-summary">
            <p>
              <strong>Income:</strong> Rs {income}
            </p>
            <p>
              <strong>Balance:</strong> Rs {balance}
            </p>
          </div>
          <div className="form">
            <ExpenseForm />
            <ExpenseList />
          </div>
        </>
      )}
    </>
  );
};

export default AppContent;
