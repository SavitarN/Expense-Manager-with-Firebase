import React, { createContext, useContext, useEffect, useState } from "react";
import type { Expense } from "../types/Expense";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";

type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  updateExpense: (
    id: string,
    updateExpense: Omit<Expense, "id">
  ) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;

  income: number;
  setIncome: (amount: number) => Promise<void>;
  balance: number;
  resetAll: () => Promise<void>;
};

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncomestate] = useState<number>(0);
  const incomeDocId = "incomeDoc";

  console.log(expenses);

  //references//
  const expenseCollection = collection(db, "expenses");
  const incomeDocRef = doc(db, "meta", incomeDocId);
  //fetching expenses
  useEffect(() => {
    const q = query(expenseCollection);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expenseData: Expense[] = [];
      querySnapshot.forEach((doc) => {
        expenseData.push({
          id: doc.id,
          ...(doc.data() as Omit<Expense, "id">),
        });
      });
      setExpenses(expenseData);
    });
    return () => unsubscribe();
  }, []);
  console.log(incomeDocId);
  //fetch income on mount (first render)
  useEffect(() => {
    const fetchIncome = async () => {
      const docSnap = await getDoc(doc(db, "meta", incomeDocId));

      if (docSnap.exists()) {
        const data = docSnap.data();
        setIncome(data.amount);
      }
    };
    fetchIncome();
  }, []);
  console.log(income);
  const addExpense = async (expenseData: Omit<Expense, "id">) => {
    await addDoc(expenseCollection, expenseData);
  };
  const updateExpense = async (
    id: string,
    updatedExpense: Omit<Expense, "id">
  ) => {
    const expenseDocRef = doc(expenseCollection, id);
    await updateDoc(expenseDocRef, updatedExpense);
  };
  const deleteExpense = async (id: string) => {
    const expenseDocRef = doc(expenseCollection, id);
    await deleteDoc(expenseDocRef);
  };

  const setIncome = async (amount: number) => {
    console.log(amount);
    const incomeDocRef = doc(db, "meta", incomeDocId);
    await updateDoc(incomeDocRef, { amount }).catch(async () => {
      // If doc doesnot exist we create it
      await setDoc(incomeDocRef, { amount });
    });
    setIncomestate(amount);
  };

  const resetAll = async () => {
    //reseting income to 0 user le click garda
    await setIncome(0);

    //and then delete expense
    const querySnapshot = await getDocs(expenseCollection);
    const deletePromise = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromise);
  };
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const balance = income - totalExpenses;
  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        income,
        setIncome,
        balance,
        resetAll,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpense must be used with an ExpenseProvider");
  }
  return context;
};
