import React, {forwardRef} from 'react';

const Input = forwardRef((props, ref) => {
    const {type, name, placeholder, label, ...other} = props;

    return (
        <>
            <label>{label}</label>
            <input type={type} name={name} ref={ref} placeholder={placeholder} {...other}/>
        </>
    );
});

Input.defaultProps = {
    type: 'text',
    label: ''
}

export default Input;