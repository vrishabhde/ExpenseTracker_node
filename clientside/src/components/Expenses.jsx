// Expenses.jsx
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setBudget, addExpense } from '../actions/userActions';

const Expenses = ({ currentUser, setBudget, addExpense }) => {
  const [budgetValue, setBudgetValue] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  useEffect(() => {
    // You can add additional logic here if needed when currentUser changes
  }, [currentUser]);

  const handleSetBudget = async () => {
    if (budgetValue.trim() !== '') {
      await setBudget(budgetValue, currentUser.id);
      setBudgetValue('');
    }
  };

  const handleAddExpense = () => {
    if (expenseDescription.trim() !== '' && expenseAmount.trim() !== '') {
      addExpense(expenseDescription, expenseAmount, currentUser.id);
      setExpenseDescription('');
      setExpenseAmount('');
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div>
      <h2>Expenses</h2>
      <div>
        <label>Budget: {currentUser.budget}</label>
        <input type="number" placeholder="Enter new budget" value={budgetValue} onChange={(e) => setBudgetValue(e.target.value)} />
        <button onClick={handleSetBudget}>Set Budget</button>
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={expenseDescription} onChange={(e) => setExpenseDescription(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} />
      </div>
      <button onClick={handleAddExpense}>Add Expense</button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setBudget: (budget, userId) => dispatch(setBudget(budget, userId)),
  addExpense: (description, amount, userId) => dispatch(addExpense(description, amount, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
