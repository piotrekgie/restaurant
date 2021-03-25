import React, {useState, useRef} from 'react';

import {Select, Input} from '../Form';
import {tipValues, vatValues} from "../../data";

function useInput(initialValue = 0) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const setElemValue = (value) => {
        setValue(value);
    }

    return [value, handleChange, setElemValue];
}

function Bill() {
    const [bill, setBill] = useState(0),
        [amount, handleAmountChange, setAmountValue] = useInput(''),
        [tip, handleTipChange, setTipValue] = useInput(tipValues[0].value),
        [vat, handleVatChange, setVatValue] = useInput(vatValues[0].value),
        amountElem = useRef(),
        tipElem = useRef(),
        vatElem = useRef(),
        billForm = useRef(),
        billWrapper = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount) {
            alert('Amount cannot be empty!');
            return;
        }

        let valueWithVat = parseFloat(amount) + parseFloat(vat) * parseFloat(amount) / 100,
            tipValue = parseFloat(tip) * valueWithVat / 100;

        setBill((tipValue + valueWithVat).toFixed(2));
        billForm.current.style.display = 'none';
        billWrapper.current.style.display = 'block';
    }

    const recalculate = () => {
        setAmountValue('');
        setTipValue(tipValues[0].value);
        setVatValue(vatValues[0].value);
        billForm.current.style.display = 'block';
        billWrapper.current.style.display = 'none';
    }

    return (
        <>
            <h2>1. Calculate bill (function)</h2>
            <form ref={billForm} onSubmit={handleSubmit}>
                <Input  name="amount" ref={amountElem} value={amount} type="number" placeholder="Amount excl. tax" step="0.01" min="0" onChange={handleAmountChange}/>
                <Select name="tip" ref={tipElem} options={tipValues} selectedValue={tip} label="Tip (from amount with tax)" onChange={handleTipChange}/>
                <Select name="vat" ref={vatElem} options={vatValues} selectedValue={vat} label="Tax" onChange={handleVatChange}/>
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