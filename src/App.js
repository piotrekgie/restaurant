import React from 'react';
import './App.css';

import Bill from "./components/Bill";
import BillClass from "./components/BillClass";
import Form from "./pages/Form";
import HookForm from "./pages/HookForm";
import ExpenseCalculator from "./pages/ExpenseCalculator"

function App() {
    return (
        <>
            <ExpenseCalculator/>
            <HookForm/>
            <Form/>
            <BillClass/>
            <Bill/>
        </>
    );
}

export default App;
