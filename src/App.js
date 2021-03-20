import React from 'react';
import './App.css';

import Bill from "./components/Bill";
import BillClass from "./components/BillClass";
import Form from "./pages/Form";
import HookForm from "./pages/HookForm";

function App() {
    return (
        <>
            <Bill/>
            <BillClass/>
            <Form/>
            <HookForm/>
        </>
    );
}

export default App;
