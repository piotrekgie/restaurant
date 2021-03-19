import React, {useState, useRef} from 'react';

import {Select, Input} from '../Form';

function Bill() {
    const [bill, setBill] = useState(0),
        amount = useRef(),
        tip = useRef(),
        vat = useRef(),
        billForm = useRef(),
        billWrapper = useRef(),
        tipValues = [
            {value: 0, label: '0%'},
            {value: 5, label: '5%'},
            {value: 10, label: '10%'},
            {value: 15, label: '15%'},
            {value: 20, label: '20%'}
        ],
        vatValues = [
            {value: 5, label: '5%'},
            {value: 8, label: '8%'},
            {value: 25, label: '25%'}
        ];

    const handleSubmit = (event) => {
        event.preventDefault();
        const amountValue = parseFloat(amount.current.value);

        if (!amountValue) {
            alert('Wprowadż Kwotę!');
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
            <h2>1. Przeliczanie rachunku w restauracji (funkcyjne)</h2>
            <form ref={billForm} onSubmit={handleSubmit}>
                <Input ref={amount} type="number" name="amount" placeholder="Kwota netto" other='step="0.01" min="0"'/>
                <Select name="tip" options={tipValues} ref={tip} label="Napiwek (z kwoty brutto)"/>
                <Select name="vat" options={vatValues} ref={vat} label="Vat"/>
                <button type="submit">Przelicz</button>
            </form>
            <div className="bill-wrapper" ref={billWrapper}>
                <div>Do zapłaty: {bill} brutto</div>
                <button onClick={recalculate}>Przelicz ponownie</button>
            </div>
        </>
    );
}

export default Bill;