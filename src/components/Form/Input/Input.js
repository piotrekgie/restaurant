import React from 'react';

const Input = React.forwardRef((props, ref) => {
    const {type, name, placeholder, ...other} = props;

    return (
        <input type={type} name={name} ref={ref} placeholder={placeholder} {...other}/>
    );
});

Input.defaultProps = {
    type: 'text'
}

export default Input;