import React, {createRef} from 'react';

import {Select, Input} from '../Form';
import {tipValues, vatValues} from "../../data";

class BillClass extends React.Component {
    constructor(props) {
        super(props);

        this.amount = createRef();
        this.tip = createRef();
        this.vat = createRef();
        this.billForm = createRef();
        this.billWrapper = createRef();
    }

    state = {
        bill: 0
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const amountValue = parseFloat(this.amount.current.value);

        if (!amountValue) {
            alert('Wprowadż Kwotę!');
            return;
        }

        let valueWithVat = amountValue + parseFloat(this.vat.current.value) * amountValue / 100,
            tipValue = parseFloat(this.tip.current.value) * valueWithVat / 100;

        this.setState({bill: (tipValue + valueWithVat).toFixed(2)});
        this.billForm.current.style.display = 'none';
        this.billWrapper.current.style.display = 'block';
    }

    recalculate = () => {
        this.amount.current.value = '';
        this.tip.current.value = tipValues[0].value;
        this.vat.current.value = vatValues[0].value;
        this.billForm.current.style.display = 'block';
        this.billWrapper.current.style.display = 'none';
    }

    render() {
        return (
            <>
                <h2>1a. Przeliczanie rachunku w restauracji (klasowe)</h2>
                <form ref={this.billForm} onSubmit={this.handleSubmit}>
                    <Input ref={this.amount} type="number" name="amount" placeholder="Kwota netto" step="0.01" min="0"/>
                    <Select name="tip" options={tipValues} ref={this.tip} label="Napiwek (z kwoty brutto)"/>
                    <Select name="vat" options={vatValues} ref={this.vat} label="Vat"/>
                    <button type="submit">Przelicz</button>
                </form>
                <div className="bill-wrapper" ref={this.billWrapper}>
                    <div>Do zapłaty: {this.state.bill} brutto</div>
                    <button onClick={this.recalculate}>Przelicz ponownie</button>
                </div>
            </>
        );
    }
}

export default BillClass;