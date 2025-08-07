import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";

import "../ExpenseList/ExpenseList.css";
import EditExpenseForm from "../EditExpenseForm/EditExpenseForm";
const ExpenseList: React.FC = () => {
  const { expenses, deleteExpense, updateExpense } = useExpense();
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExpense = expenses.filter((expense) =>
    expense.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  //finiding the expense id that matches the editing id//
  const editingExpense = expenses.find((e) => e.id === editingExpenseId);
  if (expenses.length === 0) {
    return <p style={{ padding: "0px 20px" }}>No Expense Added</p>;
  }
  return (
    <>
      <div className="expense-list">
        <input
          type="text"
          placeholder="Search Expense.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {filteredExpense.length === 0 ? (
          <p>No Mathcing Expense Found</p>
        ) : (
          filteredExpense.map(({ id, title, amount, date, category }) => (
            <div key={id} className="expense-card">
              <div className="expense-title">{title}</div>
              <div className="expense-amount">Rs {amount.toFixed(2)} </div>
              <div className="expense-date">
                {new Date(date).toLocaleDateString()}
              </div>
              <div className="expense-category">Category : {category}</div>

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
            </div>
          ))
        )}
      </div>
      {editingExpense && (
        <EditExpenseForm
          expense={editingExpense}
          onClose={() => setEditingExpenseId(null)}
        />
      )}
    </>
  );
};

export default ExpenseList;
