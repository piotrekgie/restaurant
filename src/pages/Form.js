import React, {useRef} from "react";

import {Input, Textarea} from '../components/Form';
import {validateForm, watchRequireField} from "../components/Utils";

function Form() {
    const form = useRef();

    const handleSubmitUserForm = (e) => {
        e.preventDefault();
        validateForm(form);
    }

    const watchField = (e) => {
        watchRequireField(e.target);
    }

    return (
        <>
            <h2>2. Form validation</h2>
            <form className="user-form" onSubmit={handleSubmitUserForm} ref={form}>
                <div>
                    <Input name="name" label="Name" require="true" onChange={watchField}/>
                </div>
                <div>
                    <Input name="email" label="Email" require="true" onChange={watchField}/>
                </div>
                <div>
                    <Textarea name="bio" label="Bio" require="true" onChange={watchField}/>
                </div>
                <div>
                    <div><label>Sex:</label></div>
                    <span>
                        <Input name="sex" type="radio" label="Male" value="M" require="true" onChange={watchField}/>
                        <Input name="sex" type="radio" label="Female" value="F" require="true" onChange={watchField}/>
                        <Input name="sex" type="radio" label="Other" value="O" require="true" onChange={watchField}/>
                    </span>
                </div>
                <div>
                    <span>
                        <Input name="terms"
                               type="checkbox"
                               label="I have read and agree to the Website Terms and Privacy Policy"
                               require="true"
                               onChange={watchField}
                        />
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