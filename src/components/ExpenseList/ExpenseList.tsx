import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";

import "../ExpenseList/ExpenseList.css";
import EditExpenseForm from "../EditExpenseForm/EditExpenseForm";
const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, updateExpense } = useExpense();
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
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
              onClick={() => setEditingExpenseId(id)}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                if (id) deleteExpense(id);
              }}
            >
              Delete
            </button>
          </div>
          {editingExpenseId === id && (
            <EditExpenseForm
              expense={{ id, title, amount, date, category }}
              onClose={() => setEditingExpenseId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
