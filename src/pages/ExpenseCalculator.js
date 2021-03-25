import React, {useState, useEffect, useRef} from 'react';
import {useForm} from "react-hook-form";

import {revenuesData} from "../data/revenues";
import {expensesData} from "../data/expenses";
import {Input, Select} from "../components/Form";
import {calculatorCategories} from "../data/calculatorCategories";
import addToStorage from "../components/Utils/addToStorage";
import removeFromStorage from "../components/Utils/removeFromStorage";

function ExpenseCalculator() {
    const [revenues, setRevenues] = useState(revenuesData);
    const [expenses, setExpenses] = useState(expensesData);
    const {register, handleSubmit, errors} = useForm();
    const [total, setTotal] = useState(0);
    const [revenueStorage, setRevenueStorage] = useState(localStorage.getItem('revenue'));
    const [expenseStorage, setEDxpenseStorage] = useState(localStorage.getItem('expense'));
    const revenuesList = useRef();
    const expensesList = useRef();
    const form = useRef();

    useEffect(
        () => {
            let totalRevenues = 0;
            revenues.forEach(item => {
                totalRevenues += parseFloat(item.amount);
            });

            let totalExpenses = 0;
            expenses.forEach(item => {
                totalExpenses += parseFloat(item.amount);
            });

            setTotal(totalRevenues - totalExpenses);
        }, [revenues, expenses]
    )

    useEffect(
        () => {
            if (revenueStorage) {
                let revenueStorageArray = JSON.parse(revenueStorage);
                revenueStorageArray.map((row) => {
                    return revenues.push(row);
                })
            }
        }, [revenueStorage]
    )

    useEffect(
        () => {
            if (expenseStorage) {
                let expenseStorageArray = JSON.parse(expenseStorage);
                expenseStorageArray.map((row) => {
                    return expenses.push(row);
                })
            }
        }, [expenseStorage]
    )

    /* @todo Add removing from local storage*/
    const removeItem = (index, type) => {
        if (type === 'expense') {
            removeFromStorage(type, expenses[index]);
            let expensesArray = [...expenses];
            expensesArray.splice(index, 1);
            setExpenses(expensesArray);
        } else if (type === 'revenue') {
            removeFromStorage(type, revenues[index]);
            let revenuesArray = [...revenues];
            revenuesArray.splice(index, 1);
            setRevenues(revenuesArray);
        }
    }

    const onSubmit = data => {
        let amount = data.amount;
        let dataToPush = '';
        let type = data.type;

        if (type === 'revenue') {
            delete data.type;
            dataToPush = {id: revenues.length +1, ...data};
            revenues.push(dataToPush);
            setRevenues(revenues);
        } else {
            delete data.type;
            dataToPush = {id: expenses.length +1, ...data};
            expenses.push(dataToPush);
            setExpenses(expenses);
            amount = -amount;
        }

        addToStorage(type, dataToPush);
        setTotal(total + parseFloat(amount));
        form.current.reset();
    };

    const styles = {
        backgroundColor: total >= 0 ? 'green' : 'red',
        padding: 10
    };

    return (
        <>
            <h2>4. Expense Calculator</h2>

            <div className="form-wrapper">
                <div>
                    <form className="user-form" onSubmit={handleSubmit(onSubmit)} ref={form}>
                        <div>
                            <span className="warning"> {errors.name && 'This is a required field.'}</span>
                            <Input name="name" label="Name" ref={register({required: true})}/>
                        </div>
                        <div>
                            <span className="warning"> {errors.amount && 'This is a required field.'}</span>
                            <Input type="number" name="amount" label="Amount" ref={register({required: true})}
                                   step="0.01" min="0"/>
                        </div>
                        <div className="radio-wrapper">
                            <h4>Type:</h4>
                            <span className="warning"> {errors.type && 'This is a required field.'}</span>
                            <Input name="type" type="radio" label="Revenue" value="revenue"
                                   ref={register({required: true})}/>
                            <Input name="type" type="radio" label="Expense" value="expense"
                                   ref={register({required: true})}/>
                        </div>
                        <div>
                            <Select name="category" label="Category:" options={calculatorCategories} ref={register}/>
                        </div>
                        <div>
                            <button type="submit>">Add</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h2> Summary:</h2>
                    <span style={styles}>{total}</span>
                </div>
            </div>
            <div className="list-wrapper">
                {revenues.length > 0 &&
                <div>
                    <h3>Revenues</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody ref={revenuesList}>
                        {revenues.map((row, index) => (
                            <tr id={`revenue-row-${index}`} key={index}>
                                {Object.keys(row).map((value, indexValue) => (
                                    <td key={indexValue}>{row[value]}</td>
                                ))}
                                <td>
                                    <button title="Remove" onClick={(e) => removeItem(index, 'revenue')}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                }
                {expenses.length > 0 &&
                <div>
                    <h3>Expenses</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody ref={expensesList}>
                        {expenses.map((row, index) => (
                            <tr id={`expense-row-${index}`} key={index}>
                                {Object.keys(row).map((value, indexValue) => (
                                    <td key={indexValue}>{row[value]}</td>
                                ))}
                                <td>
                                    <button title="Remove" onClick={(e) => removeItem(index, 'expense')}>Remove</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        </>
    );
}

export default ExpenseCalculator;