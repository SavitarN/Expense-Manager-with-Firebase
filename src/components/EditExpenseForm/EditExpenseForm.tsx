import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import type { Expense } from "../../types/Expense";
import "./EditExpense.css";

type EditExpenseFormProps = {
  expense: Expense;
  onClose: () => void;
};
const EditExpenseForm: React.FC<EditExpenseFormProps> = ({
  expense,
  onClose,
}) => {
  const { updateExpense } = useExpense();

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(
    new Date(expense.date).toISOString().slice(0, 10)
  );
  const [category, setCategory] = useState(expense.category);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateExpense(expense.id, {
        title,
        amount,
        date: new Date(date).toISOString(),
        category,
      });
      onClose();
    } catch (error) {
      alert("Failed to update expense");
    }
    setLoading(false);
  };
  return (
    <div className="edit-expense-form-overlay">
      <form className="edit-expense-form" onSubmit={handleSubmit}>
        <h3>Edit Expense</h3>

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          min={0}
          step="0.01"
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          required
        />

        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <div className="form-buttons">
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExpenseForm;
