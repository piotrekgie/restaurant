import addWarnings from './addWarnings';
import removeWarnings from './removeWarnings';

const watchRequireField = (field) => {
    if ((field.value === '') || (field.type === 'checkbox' && !field.checked)) {
        addWarnings([field]);
    } else {
        removeWarnings(field);
    }
}

export default watchRequireField;