import React from 'react';
import './App.css';

import Bill from "./components/Bill";
import BillClass from "./components/BillClass";
import Form from "./pages/Form";

function App() {
    return (
        <>
            <Bill/>
            <BillClass/>
            <Form/>
        </>
    );
}

export default App;
