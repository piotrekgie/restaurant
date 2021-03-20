import React from 'react';

const Textarea = React.forwardRef((props, ref) => {
    const {name, placeholder, label, ...other} = props;

    return (
        <>
            <label>{label}</label>
            <textarea name={name} ref={ref} placeholder={placeholder} {...other}/>
        </>
    );
});

Textarea.defaultProps = {
    label: ''
}

export default Textarea;