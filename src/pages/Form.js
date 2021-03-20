import React, {useRef} from "react";

import {Input, Textarea} from '../components/Form';
import {validateForm} from "../components/Utils";

function Form() {
    const form = useRef();

    const handleSubmitUserForm = (e) => {
        e.preventDefault();
        validateForm(form);
    }

    return (
        <>
            <h2>2. Form validation</h2>
            <form className="user-form" onSubmit={handleSubmitUserForm} ref={form}>
                <div>
                    <Input name="name" label="Name" require="true"/>
                </div>
                <div>
                    <Input name="email" label="Email" require="true"/>
                </div>
                <div>
                    <Textarea name="bio" label="Bio" require="true"/>
                </div>
                <div>
                    <div><label>Sex:</label></div>
                    <span>
                        <Input name="sex" type="radio" label="Male" value="M" require="true"/>
                        <Input name="sex" type="radio" label="Female" value="F" require="true"/>
                        <Input name="sex" type="radio" label="Other" value="O" require="true"/>
                    </span>
                </div>
                <div>
                    <span>
                        <Input name="terms" type="checkbox" label="I have read and agree to the Website Terms and Privacy Policy" require="true"/>
                    </span>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default Form;