import React, {useState, useRef} from 'react';

import {Select, Input} from '../Form';
import {tipValues, vatValues} from "../../data";

function Bill() {
    const [bill, setBill] = useState(0),
        amount = useRef(),
        tip = useRef(),
        vat = useRef(),
        billForm = useRef(),
        billWrapper = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const amountValue = parseFloat(amount.current.value);

        if (!amountValue) {
            alert('Amount cannot be empty!');
            return;
        }

        let valueWithVat = amountValue + parseFloat(vat.current.value) * amountValue / 100,
            tipValue = parseFloat(tip.current.value) * valueWithVat / 100;

        setBill((tipValue + valueWithVat).toFixed(2));
        billForm.current.style.display = 'none';
        billWrapper.current.style.display = 'block';
    }

    const recalculate = () => {
        amount.current.value = '';
        tip.current.value = tipValues[0].value;
        vat.current.value = vatValues[0].value;
        billForm.current.style.display = 'block';
        billWrapper.current.style.display = 'none';
    }

    return (
        <>
            <h2>1. Calculate bill (function)</h2>
            <form ref={billForm} onSubmit={handleSubmit}>
                <Input ref={amount} type="number" name="amount" placeholder="Amount excl. tax" step="0.01" min="0"/>
                <Select name="tip" options={tipValues} ref={tip} label="Tip (from amount with tax)"/>
                <Select name="vat" options={vatValues} ref={vat} label="Tax"/>
                <button type="submit">Calculate</button>
            </form>
            <div className="bill-wrapper" ref={billWrapper}>
                <div>Total amount with tax: {bill}</div>
                <button onClick={recalculate}>Recalculate</button>
            </div>
        </>
    );
}

export default Bill;