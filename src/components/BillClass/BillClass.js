import React, {createRef} from 'react';

import {Select, Input} from '../Form';
import {tipValues, vatValues} from "../../data";

class BillClass extends React.Component {
    constructor(props) {
        super(props);
        this.billForm = createRef();
        this.billWrapper = createRef();
    }

    state = {
        bill: 0,
        amount: '',
        tip: tipValues[0].value,
        vat: vatValues[0].value
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const amountValue = parseFloat(this.state.amount);

        if (!amountValue) {
            alert('Wprowadż Kwotę!');
            return;
        }

        let valueWithVat = amountValue + parseFloat(this.state.vat) * amountValue / 100,
            tipValue = parseFloat(this.state.tip) * valueWithVat / 100;

        this.setState({
            bill: (tipValue + valueWithVat).toFixed(2)
        });
        this.billForm.current.style.display = 'none';
        this.billWrapper.current.style.display = 'block';
    }

    recalculate = () => {
        this.setState({
            amount: '',
            tip: tipValues[0].value,
            vat: vatValues[0].value
        });
        this.billForm.current.style.display = 'block';
        this.billWrapper.current.style.display = 'none';
    }

    render() {
        return (
            <>
                <h2>1a. Calculate bill (class)</h2>
                <form ref={this.billForm} onSubmit={this.handleSubmit}>
                    <Input name="amount" value={this.state.amount} type="number" placeholder="Amount excl. tax" step="0.01" min="0" onChange={this.handleChange}/>
                    <Select name="tip" options={tipValues} label="Tip (from amount with tax)" selectedValue={this.state.tip} onChange={this.handleChange}/>
                    <Select name="vat" options={vatValues} label="Tax" selectedValue={this.state.vat} onChange={this.handleChange}/>
                    <button type="submit">Calculate</button>
                </form>
                <div className="bill-wrapper" ref={this.billWrapper}>
                    <div>Total amount with tax: {this.state.bill}</div>
                    <button onClick={this.recalculate}>Recaluclate</button>
                </div>
            </>
        );
    }
}

export default BillClass;