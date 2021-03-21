import React, {useState, useRef} from 'react';
import {useForm} from "react-hook-form";

import {Input, Select} from "../components/Form";
import {calculatorCategories} from "../data/calculatorCategories";
// import {revenues} from "../data/revenues";
// import {expenses} from "../data/expenses";

function ExpenseCalculator() {
    const {register, handleSubmit, errors} = useForm();
    const revenuesList = useRef();
    const expensesList = useRef();
    const form = useRef();
    const removeItem = (event) => {event.target.parentNode.parentNode.remove();}
    const removeButton = <button title="Remove" onClick={removeItem}>Remove</button>;
    let revenues = [
        ['XYZ - mockups', 2000, 'Development', removeButton],
        ['ABC - blog', 1500, 'Development', removeButton],
        ['Home1', 1000, 'Rent', removeButton],
        ['Home2', 1300, 'Rent', removeButton]
    ];
    let expenses = [
        ['Pizza', 100, 'Food', removeButton],
        ['Fuel', 200, 'Car', removeButton],
        ['Hosting', 200, 'Business', removeButton]
    ];

    let totalRevenues = 0;
    revenues.forEach(item => {totalRevenues += item[1]});

    let totalExpenses = 0;
    expenses.forEach(item => {totalExpenses += item[1]});

    // Podczas zaimportowania tych tablic (linie 5 i 6) i użycia poniższego kodu przycisk do usuwania pojawia się dwa razy, czemu?
    // revenues.map((elem) => {
    //     elem.push(removeButton);
    // })
    // expenses.map((elem) => {
    //     elem.push(removeButton);
    // })

    const [revenueRows, setRevenueRows] = useState(revenues);
    const [expenseRows, setExpenseRows] = useState(expenses);
    const [total, setTotal] = useState(totalRevenues - totalExpenses);

    const onSubmit = data => {
        const rowData = [data.name, data.amount, data.category, removeButton];
        let amount = data.amount;

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
                                <tr key={index}>
                                    {row.map((value, indexValue) => (
                                        <td key={indexValue}>{value}</td>
                                    ))}
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
                                <tr key={index}>
                                    {row.map((value, indexValue) => (
                                        <td key={indexValue}>{value}</td>
                                    ))}
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