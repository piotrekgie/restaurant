import React, {forwardRef} from 'react';

const Select = forwardRef((props, ref) => {
    const {name, options, label} = props;

    return (
        <>
            <label>{label}</label>
            <select ref={ref} name={name}>
                {options.map((elem, index) => (
                    <option key={index} value={elem.value}>{elem.label}</option>
                ))}
            </select>
        </>
    );
});

Select.defaultProps = {
    label: ''
};

export default Select;