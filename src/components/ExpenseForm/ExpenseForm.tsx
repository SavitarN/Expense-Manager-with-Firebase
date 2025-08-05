import React, { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import "../ExpenseForm/ExpenseForm.css";
const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpense();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });
  const validate = () => {
    let isValid = true;
    const newErrors = { title: "", amount: "", date: "", category: "" };

    if (!title.trim()) {
      newErrors.title = "title is required";
      isValid = false;
    }
    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
      isValid = false;
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
      isValid = false;
    }
    if (!date.trim()) {
      newErrors.date = "Date is required";
      isValid = false;
    }
    if (!category.trim()) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addExpense({
      title,
      amount: +amount,
      date,
      category,
    });

    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-field"
      />
      {errors.title && <div className="error-message">{errors.title}</div>}

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "e" || e.key === "+") {
            e.preventDefault();
          }
        }}
        className="input-field"
      />
      {errors.amount && <div className="error-message">{errors.amount}</div>}

      <input
        type="date"
        placeholder="Title"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="input-field"
      />
      {errors.date && <div className="error-message">{errors.date}</div>}
      <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field"
      />
      {errors.category && (
        <div className="error-message">{errors.category}</div>
      )}
      <button type="submit" className="submit-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
