import React from "react";
import { useExpense } from "../../context/ExpenseContext";
import "../ExpenseList/ExpenseList.css";
const ExpenseList: React.FC = () => {
  const { expenses } = useExpense();

  if (expenses.length === 0) {
    return <p>No Expense Added yet</p>;
  }
  return (
    <div className="expense-list">
      {expenses.map(({ id, title, amount, date, category }) => (
        <div key={id} className="expense-card">
          <div className="expense-title">{title}</div>
          <div className="expense-amount">Rs {amount.toFixed(2)} </div>
          <div className="expense-date">
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="expense-category">{category}</div>

          <div className="expense-action">
            <button
              className="edit-btn"
              onClick={() => alert("edit coming son")}
            >
              Edit
            </button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
