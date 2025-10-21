import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import "./IncomeInput.css";
const IncomeInput: React.FC = () => {
  const { income, setIncome } = useExpense();
  const [inputvalue, setInputValue] = useState(income.toString());
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputvalue.trim();

    if (!/^[1-9][0-9]*$/.test(trimmed)) {
      setError("Please enter a valid income (greater than 0)");
      return;
    }
    /^[1-9][0-9]*$/;
    const amount = Number(trimmed);

    setIncome(amount);
    setError("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="income-form">
        <label>Total Income:</label>
        <input
          type="number"
          min="0"
          value={inputvalue}
          onChange={(e) => setInputValue(e.target.value)}
          className="income-input"
        />
        <button type="submit" className="submit-income-btn">
          Set Income
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
      <p>Hii ! Please specify your income and start recording your expenses</p>
    </>
  );
};

export default IncomeInput;
