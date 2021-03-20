import addWarnings from './addWarnings';
import removeWarnings from './removeWarnings';

const validateForm = (form) => {
    let invalidElements = [];

    [...form.current.querySelectorAll('[require="true"]')].map((elem) => {
        if (!elem.value) {
            return invalidElements.push(elem);
        } else if (['radio', 'checkbox'].includes(elem.type) &&
            form.current.querySelector('input[name="' + elem.name + '"]:checked') === null &&
            !invalidElements.includes(form.current.querySelector('input[name="' + elem.name + '"]'))
        ) {
            return invalidElements.push(form.current.querySelector('input[name="' + elem.name + '"]'));
        } else {
            return removeWarnings(elem);
        }
    });

    if (invalidElements.length === 0) {
        removeWarnings(form.current);
        alert('Thank you for submit.');
    } else {
        addWarnings(invalidElements);
    }
}

export default validateForm;