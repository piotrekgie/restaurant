import React, {useState, useRef} from 'react';
import {useForm} from "react-hook-form";

import {Input, Select} from "../components/Form";
import {calculatorCategories} from "../data/calculatorCategories";
import addToStorage from "../components/Utils/addToStorage";

function ExpenseCalculator() {
    const {register, handleSubmit, errors} = useForm();
    const revenuesList = useRef();
    const expensesList = useRef();
    const form = useRef();

    /* @todo Add removing from local storage add change summary amount*/
    const removeItem = (event) => {event.target.parentNode.parentNode.remove();}

    let revenues = [
        ['XYZ - mockups', 2000, 'Development'],
        ['ABC - blog', 1500, 'Development'],
        ['Home1', 1000, 'Rent'],
        ['Home2', 1300, 'Rent']
    ];

    let expenses = [
        ['Pizza', 100, 'Food'],
        ['Fuel', 200, 'Car'],
        ['Hosting', 200, 'Business']
    ];

    let revenueStorage = localStorage.getItem('revenue');

    if (revenueStorage) {
        let revenueStorageArray = JSON.parse(revenueStorage);
        revenueStorageArray.map((row) => {
            return revenues.push(row);
        })
    }

    let expenseStorage = localStorage.getItem('expense');

    if (expenseStorage) {
        let expenseStorageArray = JSON.parse(expenseStorage);
        expenseStorageArray.map((row) => {
            return expenses.push(row);
        })
    }

    let totalRevenues = 0;
    revenues.forEach(item => {totalRevenues += item[1]});

    let totalExpenses = 0;
    expenses.forEach(item => {totalExpenses += item[1]});

    const [revenueRows, setRevenueRows] = useState(revenues);
    const [expenseRows, setExpenseRows] = useState(expenses);
    const [total, setTotal] = useState(totalRevenues - totalExpenses);

    const onSubmit = data => {
        const rowData = [data.name, data.amount, data.category];
        let amount = data.amount;

        addToStorage(data.type, rowData);

        if (data.type === 'revenue') {
            revenueRows.push(rowData);
            setRevenueRows(revenueRows);
        } else {
            expenseRows.push(rowData);
            setExpenseRows(expenseRows);
            amount = -amount;
        }

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
                            <Input type="number" name="amount" label="Amount" ref={register({required: true})} step="0.01" min="0"/>
                        </div>
                        <div className="radio-wrapper">
                            <h4>Type:</h4>
                            <span className="warning"> {errors.type && 'This is a required field.'}</span>
                            <Input name="type" type="radio" label="Revenue" value="revenue" ref={register({required: true})}/>
                            <Input name="type" type="radio" label="Expense" value="expense" ref={register({required: true})}/>
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
                {revenueRows.length > 0 &&
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
                            {revenueRows.map((row, index) => (
                                <tr id={`revenue-row-${index}`} key={index}>
                                    {row.map((value, indexValue) => (
                                        <td key={indexValue}>{value}</td>
                                    ))}
                                    <td>
                                        <button title="Remove" onClick={removeItem}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
                {expenseRows.length > 0 &&
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
                            {expenseRows.map((row, index) => (
                                <tr id={`expense-row-${index}`} key={index}>
                                    {row.map((value, indexValue) => (
                                        <td key={indexValue}>{value}</td>
                                    ))}
                                    <td>
                                        <button title="Remove" onClick={removeItem}>Remove</button>
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