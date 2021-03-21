import React, {useRef} from "react";
import {useForm} from "react-hook-form";

import {Input, Textarea} from '../components/Form';

function HookForm() {
    const form = useRef();

    const {register, handleSubmit, errors} = useForm();
    const onSubmit = data => {
        alert('Thank you for submit.')
        form.current.reset();
    };

    return (
        <>
            <h2>3. React-Hook-Form validation</h2>
            <form className="user-form" onSubmit={handleSubmit(onSubmit)} ref={form}>
                <div>
                    <span className="warning"> {errors.name && 'This is a required field.'}</span>
                    <Input name="name" label="Name" ref={register({required: true})}/>
                </div>
                <div>
                    <span className="warning"> {errors.email && 'This is a required field.'}</span>
                    <Input name="email" label="Email" ref={register({required: true})}/>
                </div>
                <div>
                    <span className="warning"> {errors.bio && 'This is a required field.'}</span>
                    <Textarea name="bio" label="Bio" ref={register({required: true})}/>
                </div>
                <div>
                    <div>
                        <span className="warning"> {errors.sex && 'This is a required field.'}</span>
                        <label>Sex:</label>
                    </div>
                    <span>
                        <Input name="sex" type="radio" label="Male" value="M"
                               ref={register({required: true})}
                        />
                        <Input name="sex" type="radio" label="Female" value="F" ref={register({required: true})}/>
                        <Input name="sex" type="radio" label="Other" value="O" ref={register({required: true})}/>
                    </span>
                </div>
                <div>
                    <span className="warning"> {errors.terms && 'This is a required field.'}</span>
                    <span>
                        <Input name="terms" type="checkbox"
                               label="I have read and agree to the Website Terms and Privacy Policy"
                               ref={register({required: true})}/>
                    </span>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    )
}

export default HookForm;